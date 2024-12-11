import React, { useState } from "react";

const GuestSelector = ({ label, value, onChange }) => {
  const increment = () => {
    onChange(value + 1); // Call onChange to update the parent component's state
  };

  const decrement = () => {
    if (value > 1) {
      onChange(value - 1); // Call onChange to update the parent component's state
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={decrement}
          className={`bg-red-500 text-white px-3 py-1 rounded ${value === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={value === 1}
        >
          -
        </button>
        <span className="text-lg font-bold">{value}</span>
        <button
          type="button"
          onClick={increment}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default GuestSelector;
