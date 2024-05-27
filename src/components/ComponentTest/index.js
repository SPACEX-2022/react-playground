import {Component, useEffect, useRef, useState} from "react";
import {Button} from "antd";


export function loadJS(url,defaultUrl) {
    return new Promise(function (resolve, reject) {
        const script = document.createElement("script");
        script.type = "text/javascript";

        // @ts-ignore
        if (script.readyState) {
            //IE
            // @ts-ignore
            script.onreadystatechange = function () {
                // @ts-ignore
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    // @ts-ignore
                    script.onreadystatechange = null;
                    resolve("success: " + url);
                }
            };
        } else {
            //Others
            script.onload = function () {
                resolve("success: " + url);
            };
        }

        script.onerror = function () {
            defaultUrl&&loadJS(defaultUrl).then(()=>{
                resolve('success: ' + defaultUrl);
            }).catch(()=>{
                reject(Error(defaultUrl + 'load error!'));
            })
        };

        script.src = url;
        document.body.appendChild(script);
    });
}

export function loadCss(url,defaultUrl) {
    return new Promise(function (resolve, reject) {
        const node = document.createElement("link"),
            supportOnload = "onload" in node;

        node.rel = "stylesheet";
        node.type = "text/css";
        node.href = url;

        document.getElementsByTagName("head")[0].appendChild(node);

        if (supportOnload) {
            node.onload = function () {
                resolve();
            };
            node.onerror = function () {
                defaultUrl&&loadCss(defaultUrl).then(()=>{
                    resolve();
                }).catch(()=>{
                    reject();
                })
            }
        } else {
            // @ts-ignore
            node.onreadystatechange = function () {
                // @ts-ignore
                if (/loaded|complete/.test(node.readyState)) {
                    resolve();
                }
            };
        }
    });
}

const ComponentTest = () => {

    const [loading, setLoading] = useState(true);
    const componentRef = useRef(null);
    const component = useRef(null);
    const componentProps = useRef({});

    useEffect(() => {
        Promise.all([
            // loadJS('https://magictest.dinglitec.com/components/index.js'),
            // loadCss('https://magictest.dinglitec.com/components/index.css'),
            loadJS('http://127.0.0.1:8080/js/index.js'),
            loadCss('http://127.0.0.1:8080/css/index.css'),
        ]).then(() => {
            console.log(111, window['@datav/news-components'])
            const Component  = window['@datav/news-components'];
            const TreeThemeLibrary = Component.TreeThemeLibrary;
            console.log(222, TreeThemeLibrary)
            // setComponent(TreeThemeLibrary);
            component.current = TreeThemeLibrary;
            componentProps.current = TreeThemeLibrary.defaultProps;
            setLoading(false);
        })
    }, [])

    const Comp = component.current;

    const [playing, setPlaying] = useState(false);

    const togglePlay = () => {
        setPlaying(!playing);
    }

    return (
        <div>
            <div style={{width: '540px', height: '960px', background: '#ccc'}}>
                {!loading ?
                    <Comp ref={componentRef} {...componentProps.current} playing={playing} width={"540px"} height={"960px"} timestamp={0}
                          /> : null}
            </div>
            <Button onClick={togglePlay}>play</Button>
        </div>
    )
}

export default ComponentTest;