export class SceneLoadingData {
    item: string;
    constructor(key: string, item?: string) {
        this.key = key;
        this.item = item;
    }

    private key: string;

    getKey() {
        if(this.key == "scene2"){
            return "scene2_"+ this.item.trim();
        }
        return this.key;
    }
}