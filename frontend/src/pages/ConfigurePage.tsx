// src/pages/ConfigurePage.tsx
import type { JSX } from "react";
import { useState, useEffect } from "react";
import LiquidSelector from "../components/LiquidSelector";
import { getLiquidOptions, sendConfiguration } from "../api/configuration";





const placeholderImage = "https://www.etivera.co.uk/images/thumbs/600x600/viv200gpi-600x600.jpg"; // Placeholder image URL

function ConfigurePage(): JSX.Element {
  const [selectedLiquids, setSelectedLiquids] = useState<string[]>(
    Array(8).fill("")
  );
  const [liquidOptions, setLiquidOptions] = useState<string[]>([]);

  useEffect(() => {
    getLiquidOptions()
      .then(setLiquidOptions)
      .catch((err: any) => {
        console.error("Failed to load liquids:", err);
        alert("Could not load liquid options.");
      });
  }, []);

  const handleSelectorChange = (slot: number, newValue: string) => {
    const updated = [...selectedLiquids];
    updated[slot] = newValue;
    setSelectedLiquids(updated);
  };

  const handleSubmit = async () => {
    console.log("Submitting configuration:", selectedLiquids);
    try {
      await sendConfiguration(selectedLiquids);
      alert("Configuration submitted!");
    } catch (err) {
      alert("Error submitting configuration");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Configure Liquids</h1>
      <div className="row g-3">
        {selectedLiquids.map((value, index) => (
          <div className="col-md-3" key={index}>
            <LiquidSelector
              slotNumber={index}
              imageSrc={placeholderImage}
              options={liquidOptions}
              selectedValue={value}
              onChange={handleSelectorChange}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit Configuration
        </button>
      </div>
    </div>
  );
}

export default ConfigurePage;
