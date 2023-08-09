import React, { useEffect, useState } from "react";
import { NewItemForm } from "./NewItemForm";
import Logo from "./img/mogu_logo.png"
import "./styles.css";
import { ItemList } from "./ItemList";

export default function App() {
  const [items, setItems] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  const addItem = (title, description, time) => {
    setItems((currentItems) => [
      ...currentItems,
      { id: currentItems.length, title, description, time, completed: false },
    ]);
  };

  const toggleItem = (index, completed) => {
    setItems((currentItems) =>
      currentItems.map((item, i) =>
        i === index ? { ...item, completed } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((currentItems) => {
      const updatedItems = currentItems.filter((item) => item.id !== id);
      return updatedItemss.map((item, index) => ({ ...item, id: index }));
    });
  };

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(items));
  }, [items]);

  return (
    <>
     <img src={Logo} alt="Logo" id="logo-image" />
     <p className="logo-description">RecipeTracker</p>
    <h1 className="header"></h1>
      <NewItemForm onSubmit={addItem} />
      <h2 className="header">Recipe Items</h2>
      <ItemList
        items={items}
        setItems={setItems} 
        toggleItem={toggleItem}
        deleteItem={deleteItem}
      />
    </>
  );
}