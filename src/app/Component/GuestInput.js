import { useState } from "react";

const GuestInput = ({maxGuests }) => {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const maxNumGuests = 15;

  const toggleOptions = () => setIsGuestInputOpen(!isGuestInputOpen);

  const updateCount = (type, action) => {
    if (type === "adults") {
      setAdultsCount((prev) =>
        action === "add"
          ? Math.min(prev + 1, maxGuests  - childrenCount)
          : Math.max(prev - 1, 1)
      );
    } else if (type === "children") {
      setChildrenCount((prev) =>
        action === "add"
          ? Math.min(prev + 1, maxGuests  - adultsCount)
          : Math.max(prev - 1, 0)
      );
    }
  };

  const totalGuests = adultsCount + childrenCount;

  return (
    <div className="relative w-100 mx-auto mt-2">
      <button
        className="w-full p-2 border rounded text-left bg-white text-gray-800 relative"
        onClick={toggleOptions}
      >
        {adultsCount} Adults{childrenCount > 0 && `, ${childrenCount} Children`}
        <span
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 ${
            isGuestInputOpen ? "rotate-45" : "-rotate-45"
          } border-t-2 border-l-2 border-gray-800`}
        ></span>
      </button>

      {isGuestInputOpen && (
        <div className="absolute w-full bg-white shadow-lg border rounded mt-2 p-4 z-10">
          <div className="flex justify-between items-center py-2">
            <button
              className={`px-2 py-1 border ${
                adultsCount === 1 ? "border-gray-300 text-gray-300" : "text-black"
              }`}
              disabled={adultsCount === 1}
              onClick={() => updateCount("adults", "subtract")}
            >
              -
            </button>
            <span>{adultsCount} Adults</span>
            <button
              className={`px-2 py-1 border ${
                totalGuests === maxGuests
                  ? "border-gray-300 text-gray-300"
                  : "text-black"
              }`}
              disabled={totalGuests === maxGuests}
              onClick={() => updateCount("adults", "add")}
            >
              +
            </button>
          </div>

          <div className="flex justify-between items-center py-2">
            <button
              className={`px-2 py-1 border ${
                childrenCount === 0 ? "border-gray-300 text-gray-300" : "text-black"
              }`}
              disabled={childrenCount === 0}
              onClick={() => updateCount("children", "subtract")}
            >
              -
            </button>
            <span>{childrenCount} Children</span>
            <button
              className={`px-2 py-1 border ${
                totalGuests === maxGuests
                  ? "border-gray-300 text-gray-300"
                  : "text-black"
              }`}
              disabled={totalGuests === maxGuests}
              onClick={() => updateCount("children", "add")}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestInput;
