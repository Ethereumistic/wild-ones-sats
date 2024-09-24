import React, { useEffect } from 'react';
import GameConfig from './GameConfig';
import CustomGame from './CustomGame'; // Import the custom game class

const PhaserGame = ({ selectedAnimal, selectedMap }: { selectedAnimal: string; selectedMap: string }) => { // Accept selectedMap as a prop
    useEffect(() => {
        const game = new CustomGame(GameConfig); // Use CustomGame instead of Phaser.Game

        // Store the selected animal and map in the game data
        game.data.selectedAnimal = selectedAnimal; // Store selectedAnimal in game data
        game.data.selectedMap = selectedMap; // Store selectedMap in game data

        // Pass the selected animal and map to the SingleplayerScene
        game.events.on('startSingleplayerScene', () => {
            game.scene.start('SingleplayerScene', { selectedAnimal, selectedMap }); // Pass both selectedAnimal and selectedMap
        });

        return () => {
            game.destroy(true); // Clean up the game instance on component unmount
        };
    }, [selectedAnimal, selectedMap]); // Re-run effect if selectedAnimal or selectedMap changes

    return <div id="phaser-game" className="w-full h-full " />;
};

export default PhaserGame;