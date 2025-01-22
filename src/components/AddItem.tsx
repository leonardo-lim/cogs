'use client';

import { useState } from 'react';
import {
    Button,
    Divider,
    FormControl,
    Modal,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';

interface AddItemProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getItemFromLocalStorage: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ open, setOpen, getItemFromLocalStorage }) => {
    const [item, setItem] = useState({
        name: '',
        quantity: 0,
        unitOfMeasurement: '',
        pricePerQty: 0
    });

    const [isError, setIsError] = useState({
        name: false,
        quantity: false,
        unitOfMeasurement: false,
        pricePerQty: false
    });

    const handleChangeItem = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        property: string
    ) => {
        const { value } = e.target;

        setItem((current) => ({
            ...current,
            [property]: value
        }));

        setIsError((current) => ({
            ...current,
            name: property === 'name' ? value.length === 0 : current.name,
            quantity: property === 'quantity' ? Number(value) <= 0 : current.quantity,
            unitOfMeasurement:
                property === 'unitOfMeasurement' ? value.length === 0 : current.unitOfMeasurement,
            pricePerQty: property === 'pricePerQty' ? Number(value) <= 0 : current.pricePerQty
        }));
    };

    const addItemToLocalStorage = () => {
        const inventory = localStorage.getItem('inventory');
        const inventoryData = inventory ? JSON.parse(inventory) : [];

        inventoryData.push({
            id: inventoryData.length + 1,
            name: item.name,
            quantity: item.quantity,
            unitOfMeasurement: item.unitOfMeasurement,
            pricePerQty: item.pricePerQty
        });

        localStorage.setItem('inventory', JSON.stringify(inventoryData));

        setItem({
            name: '',
            quantity: 0,
            unitOfMeasurement: '',
            pricePerQty: 0
        });

        setOpen(false);
        getItemFromLocalStorage();
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Stack
                width={{
                    xs: '100%',
                    sm: 400,
                    md: 450,
                    lg: 500,
                    xl: 600
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
                    Add Item
                </Typography>
                <Typography
                    variant="subtitle1"
                    lineHeight={1.5}
                >
                    Add item to your inventory
                </Typography>
                <Divider
                    sx={{
                        my: 3
                    }}
                />
                <FormControl sx={{ gap: 2 }}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        size="small"
                        placeholder="Enter your item name"
                        value={item.name}
                        error={isError.name}
                        helperText={isError.name ? 'Name is required' : ''}
                        onChange={(e) => handleChangeItem(e, 'name')}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3
                            }
                        }}
                    />
                    <TextField
                        id="quantity"
                        type="number"
                        label="Quantity"
                        variant="outlined"
                        size="small"
                        placeholder="Enter your item quantity"
                        value={item.quantity}
                        error={isError.quantity}
                        helperText={isError.quantity ? 'Quantity must be at least 1' : ''}
                        onChange={(e) => handleChangeItem(e, 'quantity')}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3
                            }
                        }}
                    />
                    <TextField
                        id="unitOfMeasurement"
                        label="Unit of Measurement"
                        variant="outlined"
                        size="small"
                        placeholder="Enter your item unit of measurement"
                        value={item.unitOfMeasurement}
                        error={isError.unitOfMeasurement}
                        helperText={
                            isError.unitOfMeasurement ?
                                'Unit of measurement is required' :
                                ''
                        }
                        onChange={(e) => handleChangeItem(e, 'unitOfMeasurement')}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3
                            }
                        }}
                    />
                    <TextField
                        id="pricePerQty"
                        type="number"
                        label="Price per Quantity"
                        variant="outlined"
                        size="small"
                        placeholder="Enter your item price per quantity"
                        value={item.pricePerQty}
                        error={isError.pricePerQty}
                        helperText={
                            isError.pricePerQty ?
                                'Price per quantity must be at least 1' :
                                ''
                        }
                        onChange={(e) => handleChangeItem(e, 'pricePerQty')}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={addItemToLocalStorage}
                        disabled={
                            isError.name ||
                            !item.name ||
                            isError.quantity ||
                            isError.unitOfMeasurement ||
                            !item.unitOfMeasurement ||
                            isError.pricePerQty
                        }
                        sx={{
                            width: '100%',
                            marginTop: 1,
                            background: grey[800],
                            fontSize: 16,
                            textTransform: 'initial',
                            borderRadius: 3,
                            '&:hover': {
                                background: grey[900]
                            }
                        }}
                    >
                        Add
                    </Button>
                </FormControl>
            </Stack>
        </Modal>
    );
};

export default AddItem;