import BaseSound = Phaser.Sound.BaseSound;
import BaseSoundManager = Phaser.Sound.BaseSoundManager;

export class SoundController {
    set sound(value: Phaser.Sound.BaseSoundManager) {
        this._sound = value;
    }

    private musicArray:Array<BaseSound>;
    private soundArray:Array<BaseSound>;
    static  sc:SoundController;
    private state:RadioState = RadioState.Playing;
    private timePassedInState:integer = 0;
    private radioStateTime: integer = 0;
    private _sound:BaseSoundManager;


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
        for (let musicArrayElement of this.musicArray) {
            musicArrayElement.stop();
        }
    }

    stopAllAudio(){
        this.stopAllMusic();
        this.stopAllSounds();
    }



    playSound(name: string){
        this.soundArray.push(this._sound.add(name));
        this._sound.play(name);
    }


    public initRadioSong(){
        this.stopAllMusic();
        this.playRadioStatic(1000+this.getRandomInt(1000));
    }


    update(delta:integer){
        this.timePassedInState+=delta;
        if(this.state == RadioState.Static){
                if(this.timePassedInState >= this.radioStateTime){
                    console.log("Switch State to Playing");
                    this.state = RadioState.Playing;
                    this.timePassedInState = 0;
                    this.stopAllMusic();
                    this.playNextRadioSong();
                }
        }
        if(this.state == RadioState.Playing){
            if(this.timePassedInState >= this.radioStateTime){
                console.log("Switch State to Playing");
                this.state = RadioState.Playing;
                this.timePassedInState = 0;
                this.stopAllMusic();
                this.playNextRadioSong();
            }
        }
    }

    private playNextRadioSong() {
        this.playMusic("radio0"+this.getRandomInt(2),false);
        this.radioStateTime = 3000; //TODO: Check how to get song length And maybe add random input time
        this.state = RadioState.Playing;
    }


    playMusic(musicName: string, looping:boolean){
        this.stopAllMusic();
        let bs:BaseSound = this._sound.add(musicName);
        this.musicArray.push(bs);
        bs.play({loop:looping});
    }

    static getInstance() {
        if (SoundController.sc==null){
            SoundController.sc = new SoundController();
        }
        return SoundController.sc;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));

    }


    private playRadioStatic(randomInt: number) {
        this.playMusic("radio_static",true);
        this.radioStateTime = randomInt;
        this.state = RadioState.Static;

    }
}
enum RadioState {
    Playing = 1,
    Static,
    Mute
}