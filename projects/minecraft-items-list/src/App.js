import React, { useState, useEffect } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

const STORAGE_KEY = "minecraft_items_list";

const App = () => {
  const [items, setItems] = useState([]);

  // Load items from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const markCollected = (idx) => {
    const updated = items.map((item, i) =>
      i === idx ? { ...item, collected: !item.collected } : item
    );
    setItems(updated);
  };

  const deleteItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const clearList = () => {
    const response = window.confirm(
      "WARN: Clearing the list is permanent and irreversable\n\nAre you sure you want to continue?"
    );
    if (response) {
      localStorage.setItem(STORAGE_KEY, "{}");
      setItems([]);
    } else {
      console.log(response, "User cancelled clearing list.");
    }
  };

  return (
    <div>
      <h1>Minecraft Items List</h1>
      <ItemForm addItem={addItem} />
      <ItemList
        items={items}
        markCollected={markCollected}
        deleteItem={deleteItem}
        clearList={clearList}
      />
    </div>
  );
};

export default App;
