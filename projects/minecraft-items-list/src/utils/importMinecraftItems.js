export const parseMinecraftItems = (data) => {
  if (!data || !Array.isArray(data.items)) {
    throw new Error("The JSON must contain an items array.");
  }

  return data.items.map((item, index) => {
    if (
      !item ||
      typeof item.id !== "string" ||
      !Number.isInteger(item.count) ||
      item.count <= 0
    ) {
      throw new Error(`Item ${index + 1} must have an id and a positive integer count.`);
    }

    const itemId = item.id.split(":").pop();
    const name = itemId
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

    return { name, quantity: item.count, collected: false };
  });
};
