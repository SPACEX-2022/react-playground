import styles from "./index.module.css";
import {useEffect, useRef, useState} from "react";
import {Col, Row, Slider} from "antd";
import {Application, Filter, Text, Geometry} from "pixi.js";

const TextTest = () => {
    const pixiRef = useRef(null);
    const pixiEl = useRef({});

    const [timestamp, setTimestamp] = useState(0);

    useEffect(() => {
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

        pixiRef.current.appendChild(app.view);

        let geometry = new Geometry();

        geometry.addAttribute('positions', [0, 0, 100, 0, 100, 100, 0, 100], 2);
        geometry.addAttribute('uvs', [0,0,1,0,1,1,0,1],2)
        geometry.addIndex([0,1,2,1,3,2])


        const frag = `
precision mediump float;
varying highp vec2 uv0;

uniform sampler2D _MainTex;
uniform vec3 param;


void main(void)
{
    vec4 color = texture2D(_MainTex, uv0);
    gl_FragColor = color;
}

                    `

        const vert = `
attribute vec4 position;
attribute vec2 texcoord0;
varying vec2 uv0;
uniform mat4 u_MVP;

void main()
{
    gl_Position = u_MVP * position;
    uv0 = texcoord0;
    uv0.y = 1.0 - uv0.y;
}

        `

        const filter = new Filter(null, frag, {
            scale: 1.0,
            horzIntensity: 0.5,
            vertIntensity: 0.5,
        });

        pixiEl.current.filter = filter;


        // 创建文本
        const text = new Text("前端西瓜哥");
        text.x = 100;
        text.y = 50;

        text.filters = [filter];
        app.stage.addChild(text);

    })

    useEffect(() => {
        pixiEl.current.filter.uniforms.scale = timestamp / 1000;
    }, [timestamp]);

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

export default TextTest;