import styles from './index.module.css';
import {Col, Row, Slider} from "antd";
import Zhangxinxu from "./feature/zhangxinxu";
import GlTransition from "./feature/gl-transition";
import TextTest from "./feature/Text";

const PixiPlayground = () => {


    return (
        <div className={styles.container}>
            {/*<Zhangxinxu />*/}
            {/*<GlTransition />*/}
            <TextTest />
        </div>
    )
}

export default PixiPlayground;