import styles from './index.module.css';
import { LinearCopy } from "gl-react";
import { Surface } from "gl-react-dom";
import GLTransition from "react-gl-transition";
import GLTransitions from "gl-transitions";

const Slideshow = timeLoop(({ slides, delay, duration, time }) => {
    const index = Math.floor(time / (delay + duration));
    const from = slides[index % slides.length];
    const to = slides[(index + 1) % slides.length];
    const transition = GLTransitions[index % GLTransitions.length];
    const total = delay + duration;
    const progress = (time - index * total - delay) / duration;
    return progress > 0
        ? <GLTransition
            from={from}
            to={to}
            progress={progress}
            transition={transition}
        />
        : <LinearCopy>{from}</LinearCopy>;
});


const GlTransition = () => {



    return (
        <div className={styles.container}>

        </div>
    )
}

export default GlTransition;