'use client';

import type { NextPage } from 'next';
import type { GridColDef } from '@mui/x-data-grid';
import type { ItemType } from '@/types/item-type';
import { useEffect, useState } from 'react';
import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { useRecipeStore } from '@/stores/recipe-store';
import InputQuantity from '@/components/InputQuantity';

const Recipe: NextPage = () => {
    const { setItemIds } = useRecipeStore();

    const [items, setItems] = useState<ItemType[]>([]);
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const [isItemsChosen, setIsItemsChosen] = useState(false);

    const paginationModel = { page: 0, pageSize: 5 };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', flex: 1 },
        { field: 'unitOfMeasurement', headerName: 'Unit of Measurement', flex: 1 },
        { field: 'pricePerQty', headerName: 'Price per Quantity', flex: 1 }
    ];

    const handleSelectionChange = (newSelectionModel: any) => {
        setSelectedRowIds(newSelectionModel);
    };

    const selectItems = () => {
        setItemIds(selectedRowIds);
        setIsItemsChosen(true);
    };

    const getItemFromLocalStorage = () => {
        const inventory = localStorage.getItem('inventory');
        const inventoryData = inventory ? JSON.parse(inventory) : [];
        setItems(inventoryData);
    };

    useEffect(() => {
        getItemFromLocalStorage();
    }, []);

    return (
        <Stack
            width={{
                xs: '100%',
                sm: 500,
                md: 600,
                lg: 800,
                xl: 1000
            }}
            p={4}
            bgcolor={grey[50]}
            position="absolute"
            top="50%"
            left="50%"
            borderRadius={4}
            boxShadow="0 0 5px 5px rgba(0, 0, 0, 0.1)"
            sx={{
                transform: 'translate(-50%, -50%)'
            }}
        >
            <Typography
                variant="h5"
                mb={1}
                fontWeight="bold"
            >
                Add Recipe
            </Typography>
            <Typography
                variant="subtitle1"
                lineHeight={1.5}
            >
                Add recipe from your inventory
            </Typography>
            <Divider
                sx={{
                    my: 3
                }}
            />
            {!isItemsChosen ? (
                <>
                    <Paper
                        sx={{
                            width: '100%'
                        }}
                    >
                        <DataGrid
                            rows={items}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            onRowSelectionModelChange={handleSelectionChange}
                            sx={{
                                border: 0
                            }}
                        />
                    </Paper>
                    <Button
                        variant="contained"
                        onClick={selectItems}
                        disabled={selectedRowIds.length === 0}
                        sx={{
                            width: '100%',
                            marginTop: 2,
                            background: grey[800],
                            fontSize: 16,
                            textTransform: 'initial',
                            borderRadius: 3,
                            '&:hover': {
                                background: grey[900]
                            }
                        }}
                    >
                        Select
                    </Button>
                </>
            ) : (
                <InputQuantity items={items} />
            )}
        </Stack>
    );
};

export default Recipe;