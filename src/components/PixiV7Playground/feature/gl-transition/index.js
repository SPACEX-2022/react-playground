import {useEffect, useRef, useState} from "react";
import styles from './index.module.css';
import {Application, Assets, Sprite, Filter, Container, Graphics} from 'pixi.js';
import testImg from '../../assets/test.png';
import img from '../../assets/img.png';
import {Button, Col, Row, Slider} from "antd";

const vertextShader = `
attribute vec2 aVertexPosition;
varying vec2 _uv;                          // gl-transition
uniform mat3 projectionMatrix;
uniform vec4 inputSize;
uniform vec4 outputFrame;
varying vec2 vTextureCoord;

vec4 filterVertexPosition( void )
{
vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
gl_Position = filterVertexPosition();
vTextureCoord = filterTextureCoord();
_uv = vec2(0.5, 0.5) * (aVertexPosition +vec2(1.0, 1.0));    // gl-transition
}`

const fragmentShader = `
precision highp float;
varying vec2 vTextureCoord;
varying vec2 _uv;
uniform sampler2D uSampler, to;
uniform float progress, ratio, _fromR, _toR;


uniform float customUniform;


vec4 getFromColor(vec2 uv){
    return texture2D(uSampler, .5+(uv-.5)*vec2(min(ratio/_fromR,1.), min(_fromR/ratio,1.)));
}
vec4 getToColor(vec2 uv){
    return texture2D(to, .5+(uv-.5)*vec2(min(ratio/_toR,1.), min(_toR/ratio,1.)));
}

// gl-transition code here 
// pinwheel
uniform float speed; // = 2.0;
vec4 transition(vec2 uv) {
    vec2 p = uv.xy / vec2(1.0).xy;
    float circPos = atan(p.y - 0.5, p.x - 0.5) + progress * speed;
    float modPos = mod(circPos, 3.1415 / 4.);
    float signed = sign(progress - modPos);
    return mix(getToColor(p), getFromColor(p), step(signed, 0.5));
}
// gl-transition code end

void main(){
    vec2 uv = vTextureCoord.xy;
    gl_FragColor = transition(vTextureCoord);
}`
const PixiPlayground = () => {

    const pixiRef = useRef(null);

    const pixiEl = useRef({});

    useEffect( () => {
        const { offsetWidth, offsetHeight } = pixiRef.current;

        const app = new Application({
            width: offsetWidth,
            height: offsetHeight,
            // backgroundColor: 'transparent',
            backgroundAlpha: 0,
            antialias: true,
            preference: 'webgl',
            resolution: window.devicePixelRatio || 1,
        });

        // @ts-ignore
        window.__PIXI_APP__ = app;
        pixiEl.current.app = app;
        Promise.resolve().then(async () => {

            pixiRef.current.appendChild(app.view);

            // const res = await Assets.load([
            //     scaleFrag
            // ])

            // const frag = await fetch(scaleFrag)
            //     .then((res) => res.text())
            // console.log(333, frag)

            // const filter = new Filter(null, frag, {
            //     scale: 1.0,
            //     horzIntensity: 0.5,
            //     vertIntensity: 0.5,
            // });
            //
            //
            // pixiEl.current.filter = filter;

            // load the texture we need
            const texture = await Assets.load(testImg);

            let graphics = new Graphics()
            graphics.beginFill(0x000000);
            graphics.drawRect(0, 0, app.renderer.width, 500);
            // graphics.alpha = 0;
            // Add it to the stage to render
            app.stage.addChild(graphics);

            pixiEl.current.graphics = graphics;

            // const imgContainer = new Container();
            // imgContainer.x = app.renderer.width / 2;
            // imgContainer.y = app.renderer.height / 2;
            // imgContainer.width = 100;
            // imgContainer.height = 100;
            // app.stage.addChild(imgContainer);
            // pixiEl.current.imgContainer = imgContainer;

            // This creates a texture from a 'bunny.png' image
            const bunny = new Sprite(texture);

            // Setup the position of the bunny
            bunny.x = app.renderer.width / 2;
            bunny.y = app.renderer.height / 2;

            // Rotate around the center
            bunny.anchor.x = 0.5;
            bunny.anchor.y = 0.5;

            // bunny.alpha = 0.1;
            // imgContainer.addChild(bunny);
            // bunny.filters = [filter];
            // imgContainer.filters = [filter];

            // Add the bunny to the scene we are building
            // app.stage.addChild(bunny);

            pixiEl.current.bunny = bunny;
            // app.stop();

            // Listen for frame updates
            // app.ticker.add(() => {
            //     // each frame we spin the bunny around a bit
            //     bunny.rotation += 0.01;
            // });
            // 动画
            // let start = 0;
            // const scale = [1.0,1.07,1.1,1.13,1.17,1.2,1.2,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0];
            //
            // app.ticker.add(() => {
            //     // 每帧更新滤镜的uniform变量
            //     filter.uniforms.scale = scale[start++ % scale.length];
            // });

            // setInterval(() => {
            //     filter.uniforms.scale = scale[start++ % scale.length];
            // }, 100);
        })

        // return () => {
        //     app.destroy();
        // }
    }, [])

    // const [timestamp, setTimestamp] = useState(0);
    //
    // useEffect(() => {
    //     const scale = [1.0,1.07,1.1,1.13,1.17,1.2,1.2,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0];
    //     if (pixiEl.current.filter) {
    //         // pixiEl.current.bunny.rotation = timestamp / 100;
    //         pixiEl.current.filter.uniforms.scale = scale[timestamp % scale.length];
    //         pixiEl.current.app.render();
    //         console.log(222, pixiEl.current.filter.uniforms.scale)
    //     }
    // }, [timestamp])

    const onTransition = () => {
        Assets.load(img).then((texture) => {
            // pixiEl.current.bunny.texture = texture;
            const background = pixiEl.current.graphics;
            console.log(111, texture, background)
            let filter = new Filter(vertextShader, fragmentShader, {
                customUniform: 0,
                ratio: background.width / background.height,
                progress: 0,
                to: texture,
                _fromR:  background.width / background.height,
                _toR:  background.width / background.height,
            });
            background.filters = [filter];
            pixiEl.current.app.ticker.add((delta) => {
                filter.uniforms.customUniform += 0.005 * delta;
                filter.uniforms.progress = filter.uniforms.customUniform % 1000
                filter.uniforms.progress = filter.uniforms.progress - Math.trunc(filter.uniforms.progress)
            });
            pixiEl.current.app.start();
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.pixiContainer} ref={pixiRef}></div>

            <Row className={styles.control}>
                <Col span={24}>
                    <Button id="transition" onClick={onTransition}>transition</Button>
                    {/*<Slider min={0} max={1000} value={timestamp} onChange={val => setTimestamp(val)} />*/}
                </Col>
            </Row>
        </div>
    )
}

export default PixiPlayground;