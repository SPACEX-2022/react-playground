import * as PIXI from 'pixi.js';
import { Filter } from '@pixi/filter';

// 自定义顶点着色器
const vertexShader = `
    precision highp float;
    attribute vec4 position;
    attribute vec2 texcoord0;
    varying vec2 uv0;
    uniform mat4 u_VP;
    void main() 
    { 
        gl_Position = u_VP * position;
        uv0 = texcoord0;
        uv0.y = 1.0 - uv0.y;
    }
`;

// 自定义片段着色器
const fragmentShader = `
    precision highp float;
    varying vec2 uv0;
    #define texCoord uv0
    #define BLUR_MOTION 0x1
    #define BLUR_SCALE  0x2
    uniform float inputHeight;
    uniform float inputWidth;
    uniform float blurStep;
    uniform mat4 u_InvModel;
    uniform vec2 blurDirection;
    uniform sampler2D _MainTex;
    #if BLUR_TYPE == BLUR_SCALE
    #define num 25
    #else
    #define num 7
    #endif
    const float PI = 3.141592653589793;
    // ... 其他GLSL代码 ...
`;

// 定义自定义滤镜
class CustomFilter extends Filter {
    constructor() {
        super(vertexShader, fragmentShader);
        this.uniforms.inputHeight = 0;
        this.uniforms.inputWidth = 0;
        this.uniforms.blurStep = 0;
        this.uniforms.u_InvModel = new PIXI.mat4();
        this.uniforms.blurDirection = new PIXI.Point(0, 0);
    }
}

// 初始化PixiJS应用
let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
    antialias: true,
});

document.body.appendChild(app.view);

// 加载图片
PIXI.loader.add('image', 'path/to/your/image.png').load(setup);

function setup() {
    let sprite = PIXI.Sprite.from('image');
    sprite.anchor.set(0.5);
    sprite.position.set(app.screen.width / 2, app.screen.height / 2);

    // 创建滤镜实例
    let filter = new CustomFilter();
    filter.uniforms.inputHeight = app.screen.height;
    filter.uniforms.inputWidth = app.screen.width;
    filter.uniforms.blurStep = 0.1;
    // 设置其他uniforms...

    sprite.filters = [filter];
    app.stage.addChild(sprite);
}
