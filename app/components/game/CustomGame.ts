import Phaser from 'phaser';

export default class CustomGame extends Phaser.Game {
    data: { [key: string]: any }; // Define the data property

    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
        this.data = {}; // Initialize the data property
    }
}