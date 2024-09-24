import React, { useState } from "react";

const maps = [
    { name: "Jungle", image: "/map/jungle.png" },
    { name: "Lab", image: "/map/lab.png", new: true },

];

const MapSelector = ({ onSelect }: { onSelect: (mapName: string) => void }) => {
    const [selectedMap, setSelectedMap] = useState("");

    const handleMapSelect = (mapName: string) => {
        setSelectedMap(mapName);
        onSelect(mapName); // Call the onSelect function passed as a prop
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {maps.map((map) => (
                <div
                    key={map.name}
                    className={`relative border rounded-lg overflow-hidden cursor-pointer ${selectedMap === map.name ? "border-blue-500" : "border-gray-300"}`}
                    onClick={() => handleMapSelect(map.name)}
                >
                    <img src={map.image} alt={map.name} className="w-full h-32 object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2">
                        <span>{map.name}</span>
                    </div>
                    {map.new && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 rounded">NEW</span>}
                </div>
            ))}
        </div>
    );
};

export default MapSelector;