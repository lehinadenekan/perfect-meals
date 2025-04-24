'use client';

import React, { useState } from 'react';
import { ShoppingListItem } from '@/lib/shoppingListUtils'; // Assuming path is correct
import { Checkbox } from '@/components/ui/checkbox'; // Assuming Shadcn Checkbox
import { Label } from '@/components/ui/label'; // Assuming Shadcn Label

interface ShoppingListDisplayProps {
    items: ShoppingListItem[];
}

const ShoppingListDisplay: React.FC<ShoppingListDisplayProps> = ({ items }) => {
    // State to track checked items (using index as key for simplicity)
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const handleCheckboxChange = (index: number) => {
        setCheckedItems(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    if (!items || items.length === 0) {
        return <p className="text-gray-500 italic text-center">Shopping list is empty.</p>;
    }

    return (
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li 
                    key={`${item.name}-${item.unit}-${index}`} 
                    className={`flex items-center space-x-3 p-2 rounded transition-colors ${checkedItems[index] ? 'bg-gray-100' : ''}`}
                >
                    <Checkbox 
                        id={`item-${index}`}
                        checked={!!checkedItems[index]}
                        onCheckedChange={() => handleCheckboxChange(index)}
                    />
                    <Label 
                        htmlFor={`item-${index}`} 
                        className={`flex-grow text-sm cursor-pointer ${checkedItems[index] ? 'line-through text-gray-500' : 'text-gray-800'}`}
                    >
                        <span className="font-medium">{item.amount} {item.unit}</span> {item.name}
                    </Label>
                </li>
            ))}
        </ul>
    );
};

export default ShoppingListDisplay; 