import React, { useState } from 'react';
import { convertToStacks, convertToItems } from '../utils/converter';

const StackConverter = ({ itemQuantity, onConvert }) => {
  const [quantity, setQuantity] = useState(itemQuantity || 0);
  const [result, setResult] = useState(null);

  const handleConvertToStacks = () => {
    const stacks = convertToStacks(quantity);
    setResult(`Stacks: ${stacks}`);
    onConvert(stacks);
  };

  const handleConvertToItems = () => {
    const items = convertToItems(quantity);
    setResult(`Items: ${items}`);
    onConvert(items);
  };

  return (
    <div className="stack-converter">
      <h2>Stack Converter</h2>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter quantity"
      />
      <button onClick={handleConvertToStacks}>Convert to Stacks</button>
      <button onClick={handleConvertToItems}>Convert to Items</button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default StackConverter;