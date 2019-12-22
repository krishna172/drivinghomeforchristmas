import BaseSound = Phaser.Sound.BaseSound;
import BaseSoundManager = Phaser.Sound.BaseSoundManager;

export class SoundController {
    set sound(value: Phaser.Sound.BaseSoundManager) {
        this._sound = value;
    }

    private musicArray:Array<BaseSound>;
    private soundArray:Array<BaseSound>;
    static  sc:SoundController;
    private state:RadioState = RadioState.Mute;
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
        this.playRadioStatic(250+this.getRandomInt(1000));
    }


    update(delta:integer){
        this.timePassedInState+=delta;
        if(this.state == RadioState.Static){
                if(this.timePassedInState >= this.radioStateTime){
                    console.log("Switch State to Playing");
                    this.playNextRadioSong(true);
                }
        }
        else if(this.state == RadioState.Playing){
            if(this.timePassedInState >= this.radioStateTime){
                console.log("Switch State to Playing");
                this.playNextRadioSong(false);
            }
        }
    }

    private playNextRadioSong(intermediate:boolean) {
        this.stopAllMusic();

        let x = "radio0"+this.getRandomInt(3);
        let y = this.playMusic(x,false, intermediate);
        this.switchState(RadioState.Playing, y*1000);
        console.log(x);
    }


    playMusic(musicName: string, looping:boolean, intermediate:boolean):number{
        this.stopAllMusic();
        let bs:BaseSound = this._sound.add(musicName);
        this.musicArray.push(bs);

        let x = 0;
        if(intermediate){
            x = this.getRandomInt(bs.duration);
        }
        bs.play({
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: x,
            loop: false,
            delay: 0
        });
        return bs.duration-x;
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
        this.playMusic("radio_static",true,true);
        this.switchState(RadioState.Static, randomInt);
        console.log("Radio State Time" + this.radioStateTime)

    }

    private switchState(state:RadioState, time:number){
        this.timePassedInState = 0;
        this.radioStateTime = time;
        this.state = state;

    }
}




enum RadioState {
    Playing = 1,
    Static,
    Mute
}