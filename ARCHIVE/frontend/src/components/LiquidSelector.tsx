// src/components/LiquidSelector.tsx
import type { JSX } from "react";

type LiquidSelectorProps = {
  slotNumber: number;
  imageSrc: string;
  options: string[];
  selectedValue: string;
  onChange: (slot: number, newValue: string) => void;
};

function LiquidSelector({
  slotNumber,
  imageSrc,
  options,
  selectedValue,
  onChange,
}: LiquidSelectorProps): JSX.Element {
  return (
    <div className="card text-center p-2">
      <img
        src={imageSrc}
        className="card-img-top mx-auto"
        alt={`Slot ${slotNumber}`}
        style={{ width: "80px", height: "80px", objectFit: "contain" }}
      />
      <div className="card-body">
        <select
          className="form-select"
          value={selectedValue}
          onChange={(e) => onChange(slotNumber, e.target.value)}
        >
          <option value="">Select liquid</option>
          {options.map((liquid) => (
            <option key={liquid} value={liquid}>
              {liquid}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default LiquidSelector;
