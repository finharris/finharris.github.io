import React, { useState, useRef } from "react";

const ItemForm = ({ addItem }) => {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const nameInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim() === "") return;

    addItem({ name: itemName, quantity: parseInt(itemQuantity), collected: false });
    setItemName("");
    setItemQuantity(1);
    // Focus the item name input after adding
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Item Name'
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        required
        ref={nameInputRef}
        className='input'
      />
      <input
        type='number'
        min='1'
        value={itemQuantity}
        onChange={(e) => setItemQuantity(e.target.value)}
        className='input'
      />
      <button type='submit' className='button add-item-button'>
        Add Item
      </button>
    </form>
  );
};

export default ItemForm;
