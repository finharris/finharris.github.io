import React from "react";

export function sortList(items, mode) {
  let sorted;

  const qhtl = (items) => {
    // Sort: uncollected by quantity desc, collected at bottom
    return [...items].sort((a, b) => {
      if (a.collected === b.collected) {
        return b.quantity - a.quantity;
      }
      return a.collected ? 1 : -1;
    });
  };

  const qlth = (items) => {
    // Sort: uncollected by quantity dsc, collected at bottom
    return [...items].sort((a, b) => {
      if (a.collected === b.collected) {
        return a.quantity - b.quantity;
      }
      return a.collected ? 1 : -1;
    });
  };

  const natz = (items) => {
    // Sort: uncollected by name a to z, collected at bottom
    return [...items].sort((a, b) => {
      if (a.collected === b.collected) {
        return a.name.localeCompare(b.name);
      }
      return a.collected ? 1 : -1;
    });
  };

  const nzta = (items) => {
    // Sort: uncollected by name z to a, collected at bottom
    return [...items].sort((a, b) => {
      if (a.collected === b.collected) {
        return b.name.localeCompare(a.name);
      }
      return a.collected ? 1 : -1;
    });
  };

  switch (mode) {
    case "quantity-htl":
      sorted = qhtl(items);
      break;
    case "quantity-lth":
      sorted = qlth(items);
      break;
    case "name-atz":
      sorted = natz(items);
      break;
    case "name-zta":
      sorted = nzta(items);
      break;
    default:
      sorted = qhtl(items);
      break;
  }

  return sorted;
}
