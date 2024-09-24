import React, { useState } from "react";

const SelectBots = ({ onSelect }: { onSelect: (count: number) => void }) => {
    const [selectedBots, setSelectedBots] = useState(0);

    const handleBotSelect = (count: number) => {
        setSelectedBots(count);
        onSelect(count); // Call the onSelect function passed as a prop
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Select Number of Bots:</h3>
            <div className="flex space-x-4">
                {[0, 1, 2, 3].map((count) => (
                    <button
                        key={count}
                        className={`w-12 h-12 rounded-full text-white font-bold transition duration-200 
                            ${selectedBots === count ? "bg-blue-500" : "bg-gray-400 hover:bg-gray-500"}`}
                        onClick={() => handleBotSelect(count)}
                    >
                        {count}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SelectBots;