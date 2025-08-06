import React from "react";
import { convertToStacks } from "../utils/converter";

const ItemList = ({ items, markCollected, deleteItem, clearList }) => {
  // Sort: uncollected by quantity desc, collected at bottom
  const sorted = [...items].sort((a, b) => {
    if (a.collected === b.collected) {
      return b.quantity - a.quantity;
    }
    return a.collected ? 1 : -1;
  });

  // Calculate percentage of collected items
  const total = items.length;
  const collected = items.filter((item) => item.collected).length;
  const percentCollected = total === 0 ? 0 : Math.round((collected / total) * 100);

  return (
    <div className='item-list-container'>
      <h2>Required items - {total}</h2>
      <ul className='item-list'>
        {sorted.map((item, idx) => {
          const { stacks, remainder } = convertToStacks(item.quantity);
          return (
            <li
              key={idx}
              className={item.collected ? "collected" : ""}
              onClick={() => markCollected(items.indexOf(item))}
              style={{ cursor: "pointer", position: "relative" }}>
              <b>{item.name}</b>:<> </>
              {stacks > 0 && (
                <>
                  {stacks} {stacks === 1 ? "Stack" : "Stacks"}
                </>
              )}
              {remainder > 0 && (
                <>
                  {remainder} {remainder === 1 ? "Item" : "Items"}
                </>
              )}
              <> </>({item.quantity})
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(items.indexOf(item));
                }}
                aria-label='Delete'>
                ×
              </button>
            </li>
          );
        })}
      </ul>
      <progress
        name='collected-progress-bar'
        className='collected-progress-bar'
        value={percentCollected}
        max={100}
        data-percent={percentCollected}></progress>
      <button className='button clear-list-button' onClick={clearList}>
        Clear list
      </button>
    </div>
  );
};

export default ItemList;
