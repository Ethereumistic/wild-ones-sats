"use client";
import React, { useState } from "react";
import MapSelector from "../components/map/MapSelector";
import SelectBots from "../components/single/SelectBots";
import SelectAnimal from "../components/single/SelectAnimal";
import PhaserGame from "../components/game/PhaserGame"; // Import the PhaserGame component

const Singleplayer = () => {
    const [selectedAnimal, setSelectedAnimal] = useState("");
    const [selectedMap, setSelectedMap] = useState("");
    const [botCount, setBotCount] = useState(0);
    const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started

    const handleStartGame = () => {
        console.log("Starting game with:", { selectedAnimal, selectedMap, botCount });
        if (selectedAnimal) {
            setGameStarted(true); // Set game started to true
        } else {
            console.error("No animal selected!"); // Log an error if no animal is selected
        }
    };

    return (
        <div className="flex flex-col w-full">
            {gameStarted ? (
                <PhaserGame selectedAnimal={selectedAnimal} selectedMap={selectedMap} /> // Render the Phaser game when started
            ) : (
                <>
                    <h2 className="text-lg font-bold">Singleplayer Setup</h2>
                    <div className="flex justify-center items-center h-[30vh]">
                        <SelectAnimal onSelect={setSelectedAnimal} />
                    </div>
                    <div className="flex flex-col items-center mt-24">
                        <h3>Select Map:</h3>
                        <MapSelector onSelect={setSelectedMap} />
                    </div>
                    <div className="flex flex-col items-center mt-24">
                        <h3>Select Number of Bots:</h3>
                        <SelectBots onSelect={setBotCount} />
                    </div>
                    <button onClick={handleStartGame} className="mt-4 bg-blue-500 text-white p-2 rounded">
                        Start Game
                    </button>
                </>
            )}
        </div>
    );
};

export default Singleplayer;