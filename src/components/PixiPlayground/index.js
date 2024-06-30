import {useEffect, useRef, useState} from "react";
import styles from './index.module.css';
import {Application, Assets, Sprite, Filter, GlProgram, Shader, UniformGroup, Container} from 'pixiV8';
import testImg from '../../assets/test.png';
import {Col, Row, Slider} from "antd";
import scaleFrag from './assets/scale.frag';
console.log(111, scaleFrag)
const PixiPlayground = () => {

    const pixiRef = useRef(null);

    const pixiEl = useRef({});

    useEffect( () => {
        const { offsetWidth, offsetHeight } = pixiRef.current;

        const app = new Application();

        // @ts-ignore
        window.__PIXI_APP__ = app;
        app.init({
            width: offsetWidth,
            height: offsetHeight,
            // backgroundColor: 'transparent',
            backgroundAlpha: 0,
            antialias: true,
            preference: 'webgl',
            resolution: window.devicePixelRatio || 1,
        }).then(async () => {
            console.log('app init success');

            pixiRef.current.appendChild(app.canvas);

            // const res = await Assets.load([
            //     scaleFrag
            // ])

            // const frag = await fetch(scaleFrag)
            //     .then((res) => res.text())
            // console.log(333, frag)

            const frag = `
precision highp float;

varying highp vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float scale;
uniform float horzIntensity;
uniform float vertIntensity;

void main() {
    vec2 newTextureCoordinate = vec2((scale - 1.0) * 0.5 + vTextureCoord.x / scale,
    (scale - 1.0) * 0.5 + vTextureCoord.y / scale);
    vec4 textureColor = texture2D(uSampler, newTextureCoordinate);

    // shift color
    vec4 shiftColor1 = texture2D(uSampler, newTextureCoordinate + vec2(-0.05 * (scale - 1.0) * horzIntensity * 2., -0.05 * (scale - 1.0) * vertIntensity * 2.));
    vec4 shiftColor2 = texture2D(uSampler, newTextureCoordinate + vec2(-0.1 * (scale - 1.0) * horzIntensity * 2., -0.1 * (scale - 1.0) * vertIntensity * 2.));

    // 3d blend color
    vec3 blendFirstColor = vec3(textureColor.r, textureColor.g, shiftColor1.b);
    vec3 blend3DColor = vec3(shiftColor2.r, blendFirstColor.g, blendFirstColor.b);
    gl_FragColor = vec4(blend3DColor, textureColor.a);
}
                    `

            const vert = `
attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

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
}
                    `

            const filter = new Filter({
                glProgram: new GlProgram({
                    fragment: frag,
                    vertex: vert,
                }),
                resources: {
                    timeUniforms: {
                        scale: { value: 1.0, type: 'f32' },
                        horzIntensity: { value: 0.5, type: 'f32' },
                        vertIntensity: { value: 0.5, type: 'f32' },
                    }
                },
            });

            const uniformGroup = new UniformGroup({
                scale: { value: 1.0, type: 'f32' },
                horzIntensity: { value: 0.5, type: 'f32' },
                vertIntensity: { value: 0.5, type: 'f32' },
            });
            pixiEl.current.uniformGroup = uniformGroup;
            // const shader = Shader.from({
            //     gl: {
            //         vertex: vert,
            //         fragment: frag,
            //     },
            //     resources: {
            //         uniformGroup
            //     }, // resource used from above including uniform groups
            // });

            pixiEl.current.filter = filter;

            // load the texture we need
            const texture = await Assets.load(testImg);

            const imgContainer = new Container();
            app.stage.addChild(imgContainer);
            // This creates a texture from a 'bunny.png' image
            const bunny = new Sprite(texture);

            // Setup the position of the bunny
            bunny.x = app.renderer.width / 2;
            bunny.y = app.renderer.height / 2;

            // Rotate around the center
            bunny.anchor.x = 0.5;
            bunny.anchor.y = 0.5;
            imgContainer.addChild(bunny);
            // bunny.filters = [filter];
            imgContainer.filters = [filter];

            // Add the bunny to the scene we are building
            // app.stage.addChild(bunny);

            pixiEl.current.bunny = bunny;

            let start = 0;
            const scale = [1.0,1.07,1.1,1.13,1.17,1.2,1.2,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0];

            app.ticker.add(() => {
                // 每帧更新滤镜的uniform变量
                filter.resources.timeUniforms.uniforms.scale = scale[start++ % scale.length];
            });
            // Listen for frame updates
            // app.ticker.add(() => {
            //     // each frame we spin the bunny around a bit
            //     bunny.rotation += 0.01;
            // });
        })

        // return () => {
        //     app.destroy();
        // }
    }, [])

    const [timestamp, setTimestamp] = useState(0);

    useEffect(() => {
        const scale = [1.0,1.07,1.1,1.13,1.17,1.2,1.2,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0];
        if (pixiEl.current.filter) {
            // pixiEl.current.bunny.rotation = timestamp / 100;
            pixiEl.current.filter.resources.timeUniforms.uniforms.scale = scale[timestamp % scale.length];
            pixiEl.current.uniformGroup.uniforms.scale = scale[timestamp % scale.length];
            console.log(222, pixiEl.current, pixiEl.current.filter.resources.timeUniforms.uniforms.scale)
        }
    }, [timestamp])

    return (
        <div className={styles.container}>
            <div className={styles.pixiContainer} ref={pixiRef}></div>

            <Row className={styles.control}>
                <Col span={24}>
                    <Slider min={0} max={1000} value={timestamp} onChange={val => setTimestamp(val)} />
                </Col>
            </Row>
        </div>
    )
}

export default PixiPlayground;