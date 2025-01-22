'use client';

import type { ItemType } from '@/types/item-type';
import { TextField } from '@mui/material';

interface SearchBarProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    items: ItemType[];
    setFilteredItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ name, setName, items, setFilteredItems }) => {
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setName(value);

        const filtered = items.filter((item) => (
            item.name.toLowerCase().includes(value.toLowerCase())
        ));

        setFilteredItems(filtered);
    };

    return (
        <TextField
            id="name"
            label="Name"
            variant="outlined"
            size="small"
            placeholder="Search item name"
            value={name}
            onChange={handleChangeName}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 3
                }
            }}
        />
    );
};

export default SearchBar;