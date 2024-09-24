import Phaser from 'phaser';
import spawnPoints from '../map/spawnPoints'; // Import the spawn points
import animals from '@/app/components/shop/animals';

class SingleplayerScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite; // Declare player variable
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd!: { up: Phaser.Input.Keyboard.Key; down: Phaser.Input.Keyboard.Key; left: Phaser.Input.Keyboard.Key; right: Phaser.Input.Keyboard.Key };
    private colliders!: Phaser.Physics.Matter.World	; // Declare a static group for colliders

    constructor() {
        super({ key: 'SingleplayerScene' });
    }

    create(data: { selectedAnimal: string; selectedMap: string }) {
        const { selectedAnimal, selectedMap } = data;
    
        // Add the selected map to the scene
        const mapImage = this.add.image(0, 0, selectedMap);
        mapImage.setOrigin(0, 0);
        mapImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    
        // Create the colliders using the physics data
        this.createColliders(selectedMap);    
        // Spawn the animal at a random predefined position
        this.spawnAnimal(selectedAnimal, selectedMap);
    
        // Set up collision between the player and the colliders
        // this.physics.add.collider(this.player, this.colliders);
    }
    
    // createColliders() {
    //     // Create a static group for colliders
    //     this.colliders = this.physics.add.staticGroup();
    
    //     // Create the physics bodies from the loaded physics data
    //     const labData = this.cache.json.get('ground'); // Load lab data
    //     if (!labData) {
    //         console.error("Lab data is undefined");
    //         return; // Exit if lab data is not available
    //     }
    
    //     // Assuming the lab data has a structure that allows you to create colliders
    //     labData.lab.fixtures.forEach((fixture: any) => {
    //         fixture.vertices.forEach((vertexSet: any) => {
    //             const shape = vertexSet.map((vertex: any) => new Phaser.Math.Vector2(vertex.x, vertex.y));
    //             this.colliders.create(shape); // Create colliders based on the lab data
    //         });
    //     });
    // }

    createColliders(selectedMap: string) {
        // Create a static group for colliders
        this.colliders = this.matter.world; // Use Matter.World for colliders
    
        const groundData = this.cache.json.get(selectedMap); // Load ground data based on selectedMap
        if (!groundData) {
            console.error("Ground data is undefined");
            return; // Exit if ground data is not available
        }
    
        // Create the physics bodies from the loaded physics data
        groundData.fixtures.forEach((fixture: any) => {
            const vertices = fixture.vertices.map((vertexSet: any) => 
                vertexSet.map((vertex: any) => ({ x: vertex.x, y: vertex.y }))
            );
            this.matter.add.fromVertices(0, 0, vertices, { isStatic: true }); // Create colliders based on the ground data
        });
    }
    
    spawnAnimal(animal: string, selectedMap: string) {
        const points = spawnPoints[selectedMap as keyof typeof spawnPoints];
        const randomIndex = Phaser.Math.Between(0, points.length - 1);
        const spawnPosition = points[randomIndex];
    
        // Adjust spawn position to be above the ground
        spawnPosition.y -= 32; // Adjust this value based on your tile size
    
        // Create the player sprite with physics
        this.player = this.physics.add.sprite(spawnPosition.x, spawnPosition.y, animal);
        console.log(`Spawning ${animal} at (${spawnPosition.x}, ${spawnPosition.y})`);
    
        // Scale down the animal image
        const scaleFactor = 0.18;
        this.player.setDisplaySize(this.player.width * scaleFactor, this.player.height * scaleFactor);
    
        // Set collision bounds for the player
        this.player.setCollideWorldBounds(true);
    }
        

        
        // this.player.setCollideWorldBounds(true); // Prevent the player from going out of bounds

              // Apply physics to the player
    //   this.player.setVelocity(0, 0);
    //   this.player.setMaxVelocity(animalData.stats.speed, animalData.stats.jump);
    //   this.player.setBounce(0.2, 0.2);
    //   this.player.setCollideWorldBounds(true);

    update() {
        // if (this.player) {
        //   // Handle player movement
        //   const speed = this.player.body!.velocity.x;
        //   const jumpSpeed = this.player.body!.velocity.y;
    
        //   if (this.cursors.left.isDown || this.wasd.left.isDown) {
        //     this.player.setVelocityX(-speed);
        //   } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
        //     this.player.setVelocityX(speed);
        //   } else {
        //     this.player.setVelocityX(0);
        //   }
    
        //   if ((this.cursors.up.isDown || this.wasd.up.isDown) && this.player.body!.blocked.down) {
        //     this.player.setVelocityY(-jumpSpeed);
        //   }
        // }
      }
    }

export default SingleplayerScene;