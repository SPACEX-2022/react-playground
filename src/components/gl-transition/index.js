import styles from './index.module.css';
import { LinearCopy, NearestCopy } from "gl-react";
import { Surface } from "gl-react-dom";
import GLTransition from "react-gl-transition";
import GLTransitions from "gl-transitions";
import {Button, Col, Row, Slider} from "antd";
import {useState} from "react";

const images = "wxqlQkh,G2Whuq3,0bUSEBX,giP58XN,iKdXwVm,IvpoR40,zJIxPEo,CKlmtPs,fnMylHI,vGXYiYy,MnOB9Le,YqsZKgc,0BJobQo,Otbz312"
    .split(",")
    .map((id) => `https://i.imgur.com/${id}.jpg`);

// const Slideshow = timeLoop(({ slides, delay, duration, time }) => {
//     const index = Math.floor(time / (delay + duration));
//     const from = slides[index % slides.length];
//     const to = slides[(index + 1) % slides.length];
//     const transition = GLTransitions[index % GLTransitions.length];
//     const total = delay + duration;
//     const progress = (time - index * total - delay) / duration;
//     return progress > 0
//         ? <GLTransition
//             from={from}
//             to={to}
//             progress={progress}
//             transition={transition}
//         />
//         : <LinearCopy>{from}</LinearCopy>;
// });

const Slideshow = ({ slides, progress }) => {
    const index = 0;
    const from = slides[index % slides.length];
    const to = slides[(index + 1) % slides.length];
    const transition = GLTransitions[index % GLTransitions.length];
    return progress > 0
        ? <GLTransition
            from={from}
            to={to}
            progress={progress}
            transition={transition}
        />
        : <NearestCopy>{from}</NearestCopy>;
};


const GlTransition = () => {

    const [timestamp, setTimestamp] = useState(0);

    // const onTransition = () => {
    //
    // }

    return (
        <div className={styles.container}>

            <div>
                <Surface width={1000} height={400}>
                    <Slideshow slides={images} progress={timestamp / 1000} />
                </Surface>
            </div>

            <Row className={styles.control}>
                <Col span={24}>
                    {/*<Button id="transition" onClick={onTransition}>transition</Button>*/}
                    <Slider min={0} max={1000} value={timestamp} onChange={val => setTimestamp(val)} />
                </Col>
            </Row>
        </div>
    )
}

export default GlTransition;