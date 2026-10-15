import React, { useState } from "react";
import { convertToStacks } from "../utils/converter";
import { sortList } from "../utils/SortList";

const ItemList = ({ items, markCollected, deleteItem, clearList, uncollectAll }) => {
  const [sortMode, setSortMode] = useState("quantity-htl");

  const sorted = sortList(items, sortMode);

  // Calculate percentage of collected items
  const total = items.length;
  const collected = items.filter((item) => item.collected).length;
  const percentCollected = total === 0 ? 0 : Math.round((collected / total) * 100);

  return (
    <div className='item-list-container'>
      <span className='list-header'>
        <h2>Required items - {total}</h2>

        <select
          name='sort-mode'
          id='sort-more'
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value)}>
          <option value='quantity-htl'>Quantity (High to Low)</option>
          <option value='quantity-lth'>Quantity (Low to High)</option>

          <option value='name-atz'>Name (A to Z)</option>
          <option value='name-zta'>Name (Z to A)</option>
        </select>
      </span>
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
                  {" "}
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

      <div className='action-buttons'>
        <button className='button clear-list-button' onClick={clearList}>
          Clear list
        </button>
        <button className='button uncollect-all-button' onClick={uncollectAll}>
          Mark all uncollected
        </button>
      </div>
    </div>
  );
};

export default ItemList;
