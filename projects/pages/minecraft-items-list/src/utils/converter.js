export function convertToStacks(itemCount, stackSize = 64) {
  const stacks = Math.floor(itemCount / stackSize);
  const remainder = itemCount % stackSize;
  return { stacks, remainder };
}

export function convertToItems(stacks, stackSize = 64) {
  return stacks * stackSize;
}