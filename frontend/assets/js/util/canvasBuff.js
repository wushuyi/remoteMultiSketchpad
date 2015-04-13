/**
 * Created by shuyi.wu on 2015/4/13.
 */
class CanvasBuffer {
    constructor (width, height){
        this.width = width;
        this.height = height;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
    }
    clear(){
        this.context.clearRect(0, 0, this.width, this.height);
    }
    resize(width, height){
        this.width = this.canvas.width = width;
        this.height = this.canvas.height = height;
    }
}

export default CanvasBuffer;