import BaseSound = Phaser.Sound.BaseSound;
import BaseSoundManager = Phaser.Sound.BaseSoundManager;

export class SoundController {

    private musicArray:Array<BaseSound>;
    private soundArray:Array<BaseSound>;
    static  sc:SoundController;


    private constructor() {
        this.musicArray = new Array<BaseSound>();
        this.soundArray = new Array<BaseSound>();
    }

    stopAllSounds(){
        for (let soundArrayElement of this.soundArray) {
            soundArrayElement.stop();
        }
    }

    stopAllMusic(){
        console.log(this.musicArray.length +  " in stop all music")
        for (let musicArrayElement of this.musicArray) {
            console.log("in for")
            musicArrayElement.stop();
        }
    }

    stopAllAudio(){
        this.stopAllMusic();
        this.stopAllSounds();
    }



    playSound(sound: BaseSoundManager,name: string){
        this.soundArray.push(sound.add(name));
        sound.play(name);
    }

    playMusic(sound: BaseSoundManager, musicName: string, looping:boolean){
        this.stopAllMusic();
        let bs:BaseSound = sound.add(musicName);
        console.log(this.musicArray.length + " before");
        this.musicArray.push(bs);
        console.log(this.musicArray.length + " after");

        bs.play(null,{loop:looping});
        //sound.play(musicName,{loop:looping});
    }

    static getInstance() {
        if (SoundController.sc==null){
            SoundController.sc = new SoundController();
        }
        return SoundController.sc;
    }
}