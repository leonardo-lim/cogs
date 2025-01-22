'use client';

import type { NextPage } from 'next';
import type { GridColDef } from '@mui/x-data-grid';
import type { ItemType } from '@/types/item-type';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { grey, red } from '@mui/material/colors';
import AddItem from '@/components/AddItem';
import SearchBar from '@/components/SearchBar';

const Home: NextPage = () => {
    const [items, setItems] = useState<ItemType[]>([]);
    const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const [name, setName] = useState('');

    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const paginationModel = { page: 0, pageSize: 5 };

    const selectedRow = items.find((item) => item.id === selectedRowId);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', editable: true, flex: 1 },
        { field: 'quantity', headerName: 'Quantity', editable: true, flex: 1 },
        { field: 'unitOfMeasurement', headerName: 'Unit of Measurement', editable: true, flex: 1 },
        { field: 'pricePerQty', headerName: 'Price per Quantity', editable: true, flex: 1 }
    ];

    const handleSelectionChange = (newSelectionModel: any) => {
        setSelectedRowId(newSelectionModel.length > 0 ? newSelectionModel[0] : null);
    };

    const handleEditItem = (newItem: ItemType) => {
        const updatedItems = items.map((item) =>
            item.id === newItem.id ? { ...item, ...newItem } : item
        );

        setItems(updatedItems);

        return newItem;
    };

    const handleDeleteItem = () => {
        const updatedItems = items.filter((item) => item.id !== selectedRowId);

        const reorderedItems = updatedItems.map((item, index) => ({
            ...item,
            id: index + 1
        }));

        setItems(reorderedItems);
        setDeleteOpen(false);
    };

    const getItemFromLocalStorage = () => {
        const inventory = localStorage.getItem('inventory');
        const inventoryData = inventory ? JSON.parse(inventory) : [];
        setItems(inventoryData);
    };

    const saveItemToLocalStorage = () => {
        localStorage.setItem('inventory', JSON.stringify(items));
    };

    useEffect(() => {
        getItemFromLocalStorage();
    }, []);

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    useEffect(() => {
        saveItemToLocalStorage();
    }, [filteredItems]);

    return (
        <Stack
            gap={3}
            minHeight="100vh"
            p={4}
        >
            <Stack direction="row" justifyContent="space-between">
                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    Inventory Management
                </Typography>
                <Stack gap={1} direction="row">
                    <Link href="/recipe">
                        <Button
                            variant="contained"
                            sx={{
                                background: grey[700],
                                fontSize: 16,
                                textTransform: 'initial',
                                borderRadius: 3,
                                '&:hover': {
                                    background: grey[800]
                                }
                            }}
                        >
                            Add Recipe
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        onClick={() => setAddOpen(true)}
                        sx={{
                            background: grey[800],
                            fontSize: 16,
                            textTransform: 'initial',
                            borderRadius: 3,
                            '&:hover': {
                                background: grey[900]
                            }
                        }}
                    >
                        Add Item
                    </Button>
                </Stack>
                <AddItem
                    open={addOpen}
                    setOpen={setAddOpen}
                    getItemFromLocalStorage={getItemFromLocalStorage}
                />
            </Stack>
            <SearchBar
                name={name}
                setName={setName}
                items={items}
                setFilteredItems={setFilteredItems}
            />
            <Paper
                sx={{
                    width: '100%'
                }}
            >
                <DataGrid
                    rows={filteredItems}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    processRowUpdate={handleEditItem}
                    onRowSelectionModelChange={handleSelectionChange}
                    onProcessRowUpdateError={((error) => console.error(error))}
                    sx={{
                        border: 0
                    }}
                />
            </Paper>
            <Stack gap={1} direction="row" alignItems="start" justifyContent="space-between">
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                >
                    * Double click to edit
                </Typography>
                {selectedRow && (
                    <>
                        <Button
                            variant="contained"
                            onClick={() => setDeleteOpen(true)}
                            sx={{
                                background: red[800],
                                fontSize: 16,
                                textTransform: 'initial',
                                borderRadius: 3,
                                '&:hover': {
                                    background: red[900]
                                }
                            }}
                        >
                            Delete
                        </Button>
                        <Dialog
                            open={deleteOpen}
                            onClose={() => setDeleteOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            sx={{
                                '& .MuiPaper-root': {
                                    paddingTop: 1,
                                    paddingRight: 3,
                                    paddingBottom: 2,
                                    paddingLeft: 1,
                                    borderRadius: 3
                                }
                            }}
                        >
                            <DialogTitle id="alert-dialog-title">
                                Delete Item
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure want to delete {selectedRow.name}?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    onClick={() => setDeleteOpen(false)}
                                    sx={{
                                        background: grey[800],
                                        fontSize: 16,
                                        textTransform: 'initial',
                                        borderRadius: 3,
                                        '&:hover': {
                                            background: grey[900]
                                        }
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleDeleteItem}
                                    sx={{
                                        background: red[800],
                                        fontSize: 16,
                                        textTransform: 'initial',
                                        borderRadius: 3,
                                        '&:hover': {
                                            background: red[900]
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
            </Stack>
        </Stack>
    );
};

export default Home;