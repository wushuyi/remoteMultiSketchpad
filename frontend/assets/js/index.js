/**
 * Created by shuyi.wu on 2015/4/13.
 */
import $ from '../libs/jquery/1.11.2/jquery.js';

import './polyfill/animation_frame.js';
import Sketch from './util/sketch.js';
import Shake from './util/shake.js';

var $el = {};
$el.win = $(window);
$el.wrapper = $('.wrapper');

var sketch = new Sketch($el.win.width(), $el.win.height(), {
    lineWidth: 2
});

$el.wrapper.append(sketch.canbuff.canvas);
sketch.init();


var ShakeEvent = new Shake();

$el.win.on('shake', function (e) {
    sketch.canbuff.clear();
});

$el.win.on('resize', function(e){
    sketch.canbuff.resize($el.win.width(), $el.win.height());
});

ShakeEvent.start();

