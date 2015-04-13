/**
 * Created by shuyi.wu on 2015/4/13.
 */
import '../polyfill/animation_frame.js';
import _ from '../../libs/lodash-3.6.0-es/lodash.js';
import $ from '../../libs/jquery/1.11.2/jquery.js';
import CanvasBuff from '../util/canvasBuff.js';

class Sketch {
    constructor(width ,height, options){
        let self = this;
        let defOptions = {
            uid: 1,
            lineWidth: 1,
            r: 0,
            g: 0,
            b: 0,
            a: 1
        };

        self.options = $.extend({}, defOptions, options);

        self._moved = false;
        self._started = false;
        self._mOut = false;
        self.canbuff = new CanvasBuff(width, height);
        self.$canvas = $(self.canbuff.canvas);
        self.lines = [];

    }

    init(){
        let self = this;

        if (!this.canbuff.context) {
            alert('Your browser does not support Canvas 2D drawing.');
            return false;
        }

        self.$canvas.on('touchstart', function(e){
            self.onTouchStart(e);
        });
        self.$canvas.on('touchmove', function(e){
            self.onTouchMove(e);
        });
        self.$canvas.on('touchend', function(e){
            self.onTouchEnd(e);
        });
        self.$canvas.on('touchcancel', function(e){
            self.onTouchCancel(e);
        });
        self.$canvas.on('mousedown', function(e){
            self.onMouseDown(e);
        });
        self.$canvas.on('mousemove', function(e){
            self.onMouseMove(e);
        });
        $('html').on('mouseup', function(e){
            if(self._started){
                self.onMouseUp(e);
            }
        });
        self.$canvas.on('mouseleave', function(e){
            if(self._started){
                self.onMouseLeave(e);
            }
        });
        self.$canvas.on('mouseenter', function(e){
            if(self._started){
                self.onMouseEnter(e);
            }
        });
    }

    onTouchStart(e){
        e.preventDefault();

        let self = this;
        let opt = self.options;
        let thisId = '' + opt.uid + 'T';

        _.forEach(e.originalEvent.touches, function(touch){
            let id = thisId + touch.identifier;
            self.lines[id] = {
                x: touch.clientX,
                y: touch.clientY
            };
        });

        self._moved = false;
        self._started = true;
    }

    onTouchMove(e){
        e.preventDefault();

        let self = this;
        let opt = self.options;
        let thisId = '' + opt.uid + 'T';

        if(self._started){
            _.forEach(e.originalEvent.touches, function(touch){
                let id = thisId + touch.identifier;
                let moveX = touch.clientX - self.lines[id].x;
                let moveY = touch.clientY - self.lines[id].y;
                let newPos = self.drawMulti(id, moveX, moveY);

                self.lines[id].x = newPos.x;
                self.lines[id].y = newPos.y;
            })
        }

        self._moved = true;
    }

    onTouchEnd(e){
        e.preventDefault();

        let self = this;

        if (e.originalEvent.touches.length === 0) {
            self._moved = false;
            self._started = false;
        }
    }

    onTouchCancel(e){
        e.preventDefault();

        let self = this;

        if (e.originalEvent.touches.length === 0) {
            self._moved = false;
            self._started = false;
        }
    }

    onMouseDown(e){
        e.preventDefault();

        let self = this;
        let opt = self.options;
        let id = '' + opt.uid + 'M';

        self.lines[id] = {
            x: e.clientX,
            y: e.clientY
        };

        self._moved = false;
        self._started = true;
    }

    onMouseMove(e){
        e.preventDefault();

        let self = this;
        let opt = self.options;

        if(self._started && !self._mOut){
            let id = '' + opt.uid + 'M';

            let moveX = e.clientX - self.lines[id].x;
            let moveY = e.clientY - self.lines[id].y;
            let newPos = self.drawMulti(id, moveX, moveY);

            self.lines[id].x = newPos.x;
            self.lines[id].y = newPos.y;

            self._moved = true;
        }
    }

    onMouseUp(e){
        let self = this;
        let opt = self.options;

        if(self._started){
            let id = '' + opt.uid + 'M';

            self._moved = false;
            self._started = false;
            self._mOut = false;
        }
    }

    onMouseLeave(e){
        let self = this;
        let opt = self.options;

        if(self._started){

            self._mOut = true;
        }
    }

    onMouseEnter(e){
        let self = this;
        let opt = self.options;

        if(self._started){
            let id = '' + opt.uid + 'M';

            self.lines[id] = {
                x: e.clientX,
                y: e.clientY
            };

            self._mOut = false;
        }
    }

    drawMulti(id, moveX, moveY) {
        let self = this;
        let ctx = self.canbuff.context;
        let opt = self.options;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = opt.lineWidth;
        //let grad1 = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
        //grad1.addColorStop(0,    'yellow');
        //grad1.addColorStop(0.25, 'red');
        //grad1.addColorStop(0.50, 'blue');
        //grad1.addColorStop(0.75, 'limegreen');
        //ctx.strokeStyle = grad1;
        ctx.strokeStyle = 'rgba(' + opt.r + ',' + opt.g + ',' + opt.b + ',' + opt.a + ')';
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.moveTo(self.lines[id].x, self.lines[id].y);
        ctx.lineTo(self.lines[id].x + moveX, self.lines[id].y + moveY);
        ctx.stroke();
        ctx.closePath();

        return { x: self.lines[id].x + moveX, y: self.lines[id].y + moveY };
    }

}

export default Sketch;