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
// import { SplitText } from "gsap/SplitText";


gsap.registerPlugin(useGSAP,Flip,Observer,MotionPathPlugin,EaselPlugin,PixiPlugin,TextPlugin,RoughEase,ExpoScaleEase,SlowMo,CustomEase, window.SplitText);

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
                <Tag />
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
