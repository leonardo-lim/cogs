'use client';

import type { ItemType } from '@/types/item-type';
import { useState } from 'react';
import { Button, Divider, FormControl, Stack, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRecipeStore } from '@/stores/recipe-store';

interface InputQuantityProps {
    items: ItemType[];
}

const InputQuantity: React.FC<InputQuantityProps> = ({ items }) => {
    const { itemIds } = useRecipeStore();

    const [itemQuantities, setItemQuantities] = useState<Record<number, string>>();
    const [numberOfCups, setNumberOfCups] = useState(1);
    const [COGS, setCOGS] = useState(0);

    const handleChangeQuantity = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        id: number
    ) => {
        const { value } = e.target;

        setItemQuantities((current) => ({
            ...current,
            [id]: value
        }));
    };

    const handleChangeNumberOfCups = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNumberOfCups(parseInt(value));
    };

    const calculateCOGS = () => {
        let cost = 0.00;

        for (const item of items) {
            if (itemQuantities?.[item.id]) {
                cost += (item.pricePerQty / item.quantity) * parseFloat(itemQuantities[item.id]);
            }
        }

        setCOGS(cost * numberOfCups);
    };

    const filteredItems = items.filter((item) => itemIds.includes(item.id));

    return (
        <FormControl
            sx={{
                gap: 2
            }}
        >
            {filteredItems.map((item) => {
                return (
                    <Stack key={item.id} gap={1} direction="row" alignItems="center">
                        <TextField
                            id={`${item.name}Quantity`}
                            type="number"
                            label={`${item.name} Quantity`}
                            variant="outlined"
                            size="small"
                            placeholder={`Enter your ${item.name.toLowerCase()} quantity`}
                            value={
                                (itemQuantities?.[item.id] &&
                                    parseFloat(itemQuantities[item.id]) >= 0.0001) ?
                                    !itemQuantities[item.id].includes('.') ?
                                        itemQuantities[item.id].replace(/^0+/, '') :
                                        itemQuantities[item.id] :
                                    0
                            }
                            onChange={(e) => handleChangeQuantity(e, item.id)}
                            sx={{
                                flex: 1,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3
                                }
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                        >
                            {item.unitOfMeasurement}
                        </Typography>
                    </Stack>
                );
            })}
            <TextField
                id="numberOfCups"
                type="number"
                label="Number of Cups"
                variant="outlined"
                size="small"
                placeholder="Enter your number of cups"
                value={numberOfCups >= 1 ? numberOfCups : 1}
                onChange={handleChangeNumberOfCups}
                sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 3
                    }
                }}
            />
            <Button
                variant="contained"
                onClick={calculateCOGS}
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
                Calculate Cost of Goods Sold
            </Button>
            <Divider
                sx={{
                    my: 2
                }}
            />
            <Stack>
                <Typography
                    variant="h6"
                    fontWeight="semibold"
                    textAlign="center"
                >
                    Cost of Goods Sold
                </Typography>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    textAlign="center"
                    lineHeight={1.5}
                >
                    Rp{Math.round(COGS).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},-
                </Typography>
            </Stack>
        </FormControl>
    );
};

export default InputQuantity;