import logo from './logo.svg';
import './App.css';
import GSAPDemo from "./components/gsap";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from "gsap/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import {useLocalStorageState} from "ahooks";
import {Button, Layout, List} from "antd";
import ComponentTest from "./components/ComponentTest";
import {Component} from "react";
// import { SplitText } from "gsap/SplitText";


gsap.registerPlugin(useGSAP,Flip,Observer,MotionPathPlugin,EaselPlugin,PixiPlugin,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase, window.SplitText);

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 你同样可以将错误日志上报给服务器
        console.error(error, errorInfo);
    }

    render() {
        const {
            state: {
                hasError
            },
            props: {
                height
            }
        } = this;

        if (hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return <div style={{
                color: 'red',
                fontSize: '42px',
                textAlign: 'center',
                width: '100%',
                height,
                border: '2px solid red',
                lineHeight: height
            }}>组件发生错误</div>;
        }

        return this.props.children;
    }
}

function App() {

    const ComponentMap = {
        GSAPDemo,
        ComponentTest
    }

    const [displayComponent, setDisplayComponent] = useLocalStorageState ("displayComponent", {
        defaultValue: 'GSAPDemo'
    });

    const selectComponent = (comp) => {
        setDisplayComponent(comp);
    }

    const Tag = ComponentMap[displayComponent];

  return (
    <div className="App">
        <Layout style={{ height: '100%' }}>
            <Layout.Sider>
                <List>
                    <List.Item>
                        <Button onClick={() => selectComponent('GSAPDemo')}>GSAPDemo</Button>
                    </List.Item>
                    <List.Item>
                        <Button onClick={() => selectComponent('ComponentTest')}>ComponentTest</Button>
                    </List.Item>
                </List>
            </Layout.Sider>
            <Layout.Content>
                <ErrorBoundary>
                    <Tag />
                </ErrorBoundary>
            </Layout.Content>
        </Layout>
      {/*<GSAPDemo />*/}
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
