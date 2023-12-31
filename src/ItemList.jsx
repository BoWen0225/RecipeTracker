import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Item } from "./Item";
export function ItemList({ items, setItems, toggleItem, deleteItem,index }) {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems); 
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="item-list">
        {(provided) => (
          <ul
            className="list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.length === 0 && <div>No Items</div>}
            {items.map((item, index) => (
  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
    {(provided) => (
      <li
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Item
          {...item}
          toggleItem={() => toggleItem(index, !item.completed)}
          deleteItem={() => deleteItem(index)} 
          index={index} 
        />
      </li>
    )}
  </Draggable>

            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}