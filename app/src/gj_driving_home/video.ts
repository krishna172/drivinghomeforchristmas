
class Webcam {
    public htmlVideo: HTMLVideoElement;
    public stream: MediaStream;


    public async init() {
        this.htmlVideo = <HTMLVideoElement> document.getElementById("video");
        this.stream = await this.loadVideo();
    }

    public isLoaded() {
        return this.stream != null;
    }

    async loadVideo() {
        let self = this;
        self.htmlVideo = document.createElement('video');
        // @ts-ignore
        self.htmlVideo.playsinline = true;
        self.htmlVideo.width = 200;
        self.htmlVideo.height = 125;
        self.htmlVideo.autoplay = true;
        return  await navigator.mediaDevices.getUserMedia({video: true, audio: false})
            .then(function (stream) {
                console.log(stream);
                self.htmlVideo.srcObject = stream;
                self.htmlVideo.play();
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