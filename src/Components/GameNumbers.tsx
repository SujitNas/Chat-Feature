// GameNumbers.tsx
import React from 'react';
import { ButtonNames } from "../Engine/GlobalDefinitions";
import Button from "./Button";
import "./KeyPad.css";

// Define the interface for the component's props
interface GameNumbersProps {
  numbers: number[]; // Array of numbers
  target: number;    // Target number
  onNumberOrOperationSelect: (value: string) => void;
  onCommandButtonClick: (text: string) => void;
}

const GameNumbers: React.FC<GameNumbersProps> = ({ numbers, target, onNumberOrOperationSelect, onCommandButtonClick }) => {
  const operations = ['+', '-', '*', '/', '(', ')'];

  return (
    <div className="gameNumbersContainer">
      <div className="numbers">
        {numbers.map((num, index) => (
          <button key={index} className="number" onClick={() => onNumberOrOperationSelect(num.toString())}>
            {num}
          </button>
        ))}
      </div>
      <div className="operations">
        {operations.map((op, index) => (
          <button key={index} className="operation" onClick={() => onNumberOrOperationSelect(op)}>
            {op}
          </button>
        ))}
      </div>

      <div className="commands">
      <Button
          text={ButtonNames.allClear}
          isDigit={true}
          onClick={() => onCommandButtonClick(ButtonNames.allClear)}
          className="button-game"
          dataTestId="all-clear-button"
        />

        <Button
          text={ButtonNames.clear}
          isDigit={false}
          onClick={() => onCommandButtonClick(ButtonNames.clear)}
          className="button-game"
          dataTestId="clear-button"
        />
      </div>

      <div className="target">Target: {target}</div>
    </div>
  );
};



export default GameNumbers;
