
class Webcam {
    public htmlVideo: HTMLVideoElement;
    public htmlVideoDOM: HTMLVideoElement;
    public stream: MediaStream;

    public constructor() {
        this.htmlVideoDOM = <HTMLVideoElement> document.getElementById('video');
        this.htmlVideo = document.createElement('video');;
        // @ts-ignore
        this.htmlVideo.playsinline = true;
        this.htmlVideo.width = 200;
        this.htmlVideo.height = 125;
        this.htmlVideo.autoplay = true;
    }

    public async init() {
        this.stream = await this.loadVideo();
    }

    public isLoaded() {
        return this.stream != null;
    }

    async loadVideo() {
        let self = this;

        return  await navigator.mediaDevices.getUserMedia({video: true, audio: false})
            .then(function (stream) {
                console.log(stream);
                //https://phaser.io/examples/v3/view/game-objects/dom-element/video-element#
                self.htmlVideoDOM.srcObject = stream;
                self.htmlVideoDOM.play();
                self.stream = stream;

                console.log("Loaded video", self)
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
                return null;
            });
    }

}



export default Webcam;