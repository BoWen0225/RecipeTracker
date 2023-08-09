import React, { useState } from "react";
import AddTime from "./img/Add_Time.svg"
import AddItem from "./img/Add_Item.svg"

export function NewItemForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showTimeFields, setShowTimeFields] = useState(false);
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "" && newDescription === "") return;

    const time = showTimeFields
      ? {
          minutes: parseInt(minutes) || 0,
          seconds: parseInt(seconds) || 0,
        }
      : undefined;

    onSubmit(newItem, newDescription, time);

    setNewItem("");
    setNewDescription("");
    setMinutes("");
    setSeconds("");
    setShowTimeFields(false); // Reset time field visibility
  }

  function handleSecondsChange(e) {
    const value = e.target.value;
    if (value === '' || (value >= 0 && value <= 59)) {
      setSeconds(value);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <div className="form-row">
        <label htmlFor="description">Description</label>
        <input
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          type="text"
          id="description"
        />
      </div>
      {showTimeFields && (
        <div className="form-row time-fields">
          <div>
            <label htmlFor="minutes">Minutes</label>
            <input
              type="number"
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="seconds">Seconds</label>
            <input
              type="number"
              id="seconds"
              value={seconds}
              onChange={handleSecondsChange}
            />
          </div>
        </div>
      )}
      {!showTimeFields && (
         <img
         src={AddTime}
         alt="Clickable Image"
         className="btn btn-add-time" // Apply both classes
         id="add-time-button"
         onClick={() => setShowTimeFields(true)}
       />
      )}
      {showTimeFields && (
        <button
          className="btn"
          type="button"
          onClick={() => setShowTimeFields(false)}
        >
          Remove Time
        </button>
      )}
      
      <button className="btn" > <img
         src={AddItem}
         alt="Clickable Image"
         className="btn btn-add-item" // Apply both classes
         id="add-item-button"
       
       /></button>
    </form>
  );
}