import Scene = Phaser.Scene;
import BaseSound = Phaser.Sound.BaseSound;

export class SoundController {

    private _scene: Scene;
    private musicArray:BaseSound[];
    private soundArray:BaseSound[];


    constructor(scene: Scene) {
        this._scene = scene;
    }

    stopAllSounds(){
        for (let i = 0; i < this.soundArray.length; i++) {
            this.soundArray[i].stop();
        }
    }

    stopAllMusic(){
        for (let i = 0; i < this.musicArray.length; i++) {
            this.musicArray[i].stop();
        }
    }

    stopAllAudio(){
        this.stopAllMusic();
        this.stopAllSounds();
    }



    playSound(name: string){
        this.soundArray.push(this.scene.sound.add(name));
        this._scene.sound.play(name);
    }

    playMusic(musicName: string, looping:boolean){
        this.stopAllMusic();
      this.musicArray.push(this.scene.sound.add(musicName));
      this._scene.sound.play(musicName,{loop:looping});
    }





    get scene(): Phaser.Scene {
        return this._scene;
    }

    set scene(value: Phaser.Scene) {
        this._scene = value;
    }
}