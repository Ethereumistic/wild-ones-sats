import Phaser from 'phaser';

class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Preloader' });
    }

    preload() {
        // Load your map images
        this.load.image('Jungle', '/map/jungle.png');
        this.load.image('Lab', '/map/lab.png');
        // Load animal images (update with actual paths)
        this.load.image('Dog', '/animals/dog.png'); // Example animal
        this.load.image('Cat', '/animals/cat.png'); // Example animal
        this.load.image('Rabbit', '/animals/rabbit.png'); // Example animal
        this.load.image('Dragon', '/animals/dragon.png'); // Example animal
        this.load.image('Platypus', '/animals/platypus.png'); // Example animal
        this.load.image('Bat', '/animals/bat.png'); // Example animal
        this.load.image('Panda', '/animals/panda.png'); // Example animal

        // Load the physics data for the ground
        this.load.json('ground', '/map/ground.json');
        this.load.json('lab', '/map/lab.json');
        console.log("Preloading images...");
    }

    create() {
        // Get the selected animal and map from the game data
        const { selectedAnimal, selectedMap } = this.game.data; // Access the game data
        console.log("Selected animal:", selectedAnimal); // Log the selected animal
        console.log("Selected map:", selectedMap); // Log the selected map
    
        // Attach the ground data to the selected map
        const groundDataKey = selectedMap.toLowerCase(); // Convert selectedMap to lowercase for consistency
        this.load.json(groundDataKey, `/map/${groundDataKey}.json`); // Load the corresponding ground data
    
        // Start the main game scene with the selected animal and map
        this.scene.start('SingleplayerScene', { selectedAnimal, selectedMap });
    }
}

export default Preloader;