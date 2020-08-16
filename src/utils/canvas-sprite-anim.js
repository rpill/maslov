import debounce from 'lodash/debounce';
import getStyle from './dom/get-style';
import {startAnimationFrame} from './start-animation-frame';

export default class CanvasSpriteAnim {
    constructor(canvas, {frameRate = 24, baseWidth = 500} = {}) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.frameRate = frameRate;
        this.baseWidth = baseWidth;
        this.started = false;
        this.registeredSprite = [];
        this.scale = 1;
        this.previousRequestTime = 0;
        this.currentFrame = 0;
        this.cancelAnimation = null;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.canvasTop = 0;

        window.addEventListener('resize', this.handleResize);
        this.resize();
    }

    handleResize = debounce(() => {
        this.resize();
    }, 300);

    resize() {
        this.canvasWidth = Math.floor(getStyle(this.canvas, 'width'));
        this.canvasHeight = Math.floor(getStyle(this.canvas, 'height'));
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.scale = Math.min(this.canvasWidth / this.baseWidth, 1);
        this.canvasTop =
            this.canvas.getBoundingClientRect().top +
            document.documentElement.scrollTop;
    }

    register(sprite, callback) {
        this.registeredSprite.push({
            ...sprite,
            interval: sprite.interval ? sprite.interval * this.frameRate : 0
        });
    }

    start() {
        if (this.started) {
            return;
        }

        this.started = true;
        this.cancelAnimation = startAnimationFrame(time => this.render(time));
    }

    pause() {
        this.started = false;
        this.cancelAnimation();
    }

    render(time) {
        // inview
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        const inView =
            (this.canvasTop + this.canvasHeight - scrollTop > 0 &&
                this.canvasTop < scrollTop + window.innerHeight) ||
            time === 0;
        if (!inView) {
            return;
        }

        // fps check
        const deltaTime = time - this.previousRequestTime;
        if (deltaTime > 1000 / this.frameRate) {
            this.currentFrame += 1;
            this.previousRequestTime = time;
        } else {
            return;
        }

        // draw
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        for (const {image, frames, interval} of this.registeredSprite) {
            let currentFrame = this.currentFrame % frames.length;
            if (interval) {
                currentFrame = Math.min(
                    frames.length - 1,
                    this.currentFrame % (frames.length + interval),
                );
            }
            const {
                frame: {x, y, w, h},
                spriteSourceSize: {x: dx, y: dy, w: dw, h: dh},
            } = frames[currentFrame];

            this.ctx.drawImage(
                image,
                x,
                y,
                w,
                h,
                dx * this.scale,
                dy * this.scale,
                dw * this.scale,
                dh * this.scale,
            );
        }
    }

    dispose() {
        window.removeEventListener('resize', this.handleResize);
        this.cancelAnimation();
        this.cancelAnimation = null;

        if (this.canvas) {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.canvas = null;
        }

        this.registeredSprite = [];
    }
}
