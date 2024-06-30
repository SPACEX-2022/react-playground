import styles from './index.module.css';
import {Col, Row, Slider} from "antd";
import Zhangxinxu from "./feature/zhangxinxu";
import GlTransition from "./feature/gl-transition";

const PixiPlayground = () => {


    return (
        <div className={styles.container}>
            {/*<Zhangxinxu />*/}
            <GlTransition />
        </div>
    )
}

export default PixiPlayground;