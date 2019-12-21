import {AssetGlobals} from "../assetsGlobals";
import {SceneDescription} from "../sceneDescription";
import {SceneHelper} from "./sceneHelper";
import {DialogBox} from "../dialogBox";
import {ConversationNode} from "../conversationNode";
import LoaderPlugin = Phaser.Loader.LoaderPlugin;
import {SceneLoadingData} from "./sceneLoadingData";

export class SteeringWheelScene extends Phaser.Scene {
    private dbox: DialogBox;
    private _sceneData: SceneLoadingData;
    private cursor: CursorKeys;
    private steeringWheel: Phaser.GameObjects.Sprite;
    private cactuses: Array<Phaser.GameObjects.Sprite>;

    readonly fpsInterpolation = 59; // how many interpolation point
    readonly fpsSkip = 1; // after how many frames show the next interp step

    readonly MIN_ANGLE = -90; // Max angle for wheel left
    readonly MAX_ANGLE = 90; // max angle for wheel turn right
    readonly INIT_OFFSET = this.MAX_ANGLE; // Init camera offset
    readonly STEP = 1; // How many degree rotate per step

    // Interpolation table
    private interpolationX: Array<number> = [];
    private interpolationY: Array<number> = [];
    private interpolationZ: Array<number> = [];

    // support vars
    initFps0 = Math.floor(this.fpsInterpolation * 0.75);
    initFps1 = Math.floor(this.fpsInterpolation / 3);
    initFps2 = 0;
    currentFps = 0;

    constructor() {
        super({
            key: "SteeringWheelScene"
        });
    }

    init(data): void {
        console.log('init steering', data);
        this._sceneData = data;
        if (!this._sceneData.key) {
            this._sceneData.key = "sceneSteering"
        }
    }

    preload(): void {

        this.load.json('scene', './assets/sceneDescriptions/' + this._sceneData.key + '.json');
        this.load.image(AssetGlobals.BG_ROAD, "./assets/backgrounds/" + AssetGlobals.BG_ROAD + ".jpg");
        this.load.image(AssetGlobals.SPRITE_STEERING, "./assets/sprites/" + AssetGlobals.SPRITE_STEERING + ".png");
        this.load.image(AssetGlobals.SPRITE_CACTUS, "./assets/sprites/" + AssetGlobals.SPRITE_CACTUS + ".png");
    }

    create(): void {
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, AssetGlobals.BG_ROAD);
        this.steeringWheel = this.add.sprite(this.game.renderer.width * 0.5, this.game.renderer.height * 0.75, AssetGlobals.SPRITE_STEERING);
        this.steeringWheel.setScale(0.4, 0.4);
        this.cactuses = [
            this.add.sprite(0, 0, AssetGlobals.SPRITE_CACTUS),
            this.add.sprite(0, 0, AssetGlobals.SPRITE_CACTUS),
            this.add.sprite(0, 0, AssetGlobals.SPRITE_CACTUS),
        ];
        this.cameras.main.x -= this.INIT_OFFSET;
        this.cursor = this.input.keyboard.createCursorKeys();

        this.initCactusPosition();
        let game = this;
        this.renderActionText("Debug for steering! Press left and right to steer")

    }

    initCactusPosition() {
        this.cactuses[0].setOrigin(0, 1);
        this.cactuses[1].setOrigin(0, 1);
        this.cactuses[2].setOrigin(0, 1);

        // compute interpolation table
        var startX = 800;
        var startY = 450;
        var startZ = 0.01;

        var endX = 100;
        var endY = 500;
        var endZ = 0.2;

        var i = 0;
        var vX = (endX - startX) / this.fpsInterpolation;
        var vY = (endY - startY) / this.fpsInterpolation;
        var vZ = (endZ - startZ) / this.fpsInterpolation;
        for (i = 0; i < this.fpsInterpolation; i++) {
            this.interpolationX.push(vX * i + startX);
            this.interpolationY.push(vY * i + startY);
            this.interpolationZ.push(vZ * i + startZ);
        }
        this.interpolationX.push(endX);
        this.interpolationY.push(endY);
        this.interpolationZ.push(endZ);

        //console.log(this.interpolationX);
        //console.log(this.interpolationY);
        //console.log(this.interpolationZ);


        this.cactuses[0].setScale(this.interpolationZ[this.initFps0], this.interpolationZ[this.initFps0]);
        this.cactuses[1].setScale(this.interpolationZ[this.initFps1], this.interpolationZ[this.initFps1]);
        this.cactuses[2].setScale(this.interpolationZ[this.initFps2], this.interpolationZ[this.initFps2]);

        this.cactuses[0].x = this.interpolationX[this.initFps0];
        this.cactuses[0].y = this.interpolationY[this.initFps0];

        this.cactuses[1].x = this.interpolationX[this.initFps1];
        this.cactuses[1].y = this.interpolationY[this.initFps1];

        this.cactuses[2].x = this.interpolationX[this.initFps2];
        this.cactuses[2].y = this.interpolationY[this.initFps2];

    }

    update(time: number, delta: number): void {
        this.updateSteeringWheelAndCamera();
        this.currentFps++;
        if(this.currentFps % this.fpsSkip == 0)
            this.linearInterpolation();
    }



    linearInterpolation() {
        this.initFps0 = (this.initFps0+1) % this.fpsInterpolation;
        this.cactuses[0].x = this.interpolationX[this.initFps0];
        this.cactuses[0].y = this.interpolationY[this.initFps0];
        this.cactuses[0].setScale(this.interpolationZ[this.initFps0], this.interpolationZ[this.initFps0]);

        this.initFps1 = (this.initFps1+1) % this.fpsInterpolation;
        this.cactuses[1].x = this.game.renderer.width - this.interpolationX[this.initFps1];
        this.cactuses[1].y = this.interpolationY[this.initFps1];
        this.cactuses[1].setScale(this.interpolationZ[this.initFps1], this.interpolationZ[this.initFps1]);

        this.initFps2 = (this.initFps2+1) % this.fpsInterpolation;
        this.cactuses[2].x = this.interpolationX[this.initFps2];
        this.cactuses[2].y = this.interpolationY[this.initFps2];
        this.cactuses[2].setScale(this.interpolationZ[this.initFps2], this.interpolationZ[this.initFps2]);

    }

    updateSteeringWheelAndCamera() {
        var camera = this.cameras.main;
        var limit = false;
        //console.log(this.steeringWheel.angle, this.MIN_ANGLE, this.MAX_ANGLE);
        //left is pressed and we are in the bounds
        if (this.cursor.left.isDown) {
            if (camera.x < this.MAX_ANGLE - this.INIT_OFFSET) {
                this.cameras.main.x += this.STEP;
                this.steeringWheel.x -= this.STEP;
                // enable animation steering wheel if it ain't turned too much
                if (this.steeringWheel.angle > this.MIN_ANGLE) {
                    this.steeringWheel.angle -= this.STEP;
                }
            } else {
                // we reach the limit
                limit = true;
            }
        } else
            //right is pressed and we are in the bounds
        if (this.cursor.right.isDown) {
            if (camera.x > this.MIN_ANGLE - this.INIT_OFFSET) {
                this.cameras.main.x -= this.STEP;
                this.steeringWheel.x += this.STEP;
                if (this.steeringWheel.angle < this.MAX_ANGLE) {
                    this.steeringWheel.angle += this.STEP;
                }
            } else {
                limit = true;
            }
        }

        // automatically recenter steering wheel if no input or we reach the limit
        if (limit || (this.cursor.left.isUp && this.cursor.right.isUp)) {
            // no input -> recenter. Add 0.1 error to avoid floating point aprox
            if (this.steeringWheel.angle < -1) {
                this.steeringWheel.angle += this.STEP * 2;
            } else if (this.steeringWheel.angle > 1) {
                this.steeringWheel.angle -= this.STEP * 2;
            }
        }
    }

    renderActionText(text: string) {
        if (this.dbox) {
            this.dbox.toggleWindow();
        }
        this.dbox = new DialogBox(this);
        this.dbox._createWindow();
        this.dbox.setText(text, false);
    }


}


