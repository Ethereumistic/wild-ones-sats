// app/@types/phaser.d.ts
import 'phaser';

declare module 'phaser' {
    interface Game {
        data: { [key: string]: any }; // Extend the Game interface to include the data property
    }
}