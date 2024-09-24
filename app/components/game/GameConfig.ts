import Phaser from 'phaser';
import Preloader from './Preloader';
import SingleplayerScene from './SingleplayerScene';

const GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth, // Set to maximum screen width
    height: window.innerHeight, // Set to maximum screen height
    scene: [Preloader, SingleplayerScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 100 },
            debug: false,
        },
    },
    scale: {
        mode: Phaser.Scale.RESIZE, // Allows the game to resize dynamically
        autoCenter: Phaser.Scale.CENTER_BOTH, // Centers the game
    },
};

export default GameConfig;

