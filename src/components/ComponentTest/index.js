import {Component, useEffect, useRef, useState} from "react";
import {Button, Col, Layout, Row, Slider} from "antd";
import {CaretRightFilled, PauseOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";


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
    const [duration, setDuration] = useState(0);
    const [timestamp, setTimestamp] = useState(0);

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
            componentProps.current.data.value.animationData = {
                "level": 1,
                "parentId": "0",
                "children": [
                    {
                        "level": 2,
                        "parentId": "1001",
                        "children": [
                            {
                                "level": 3,
                                "parentId": "1163728981296039756",
                                "name": "纯电车",
                                "bizId": "1163728981296039757",
                                "effectResult": "利空",
                                "effectReason": "海外补贴限制"
                            }
                        ],
                        "name": "下游\n整车",
                        "bizId": "1163728981296039756",
                        "tts": {
                            "ttsText": "贸易壁垒的出现，首先对下游纯电车市场带来利空影响。海外市场补贴限制，将直接影响出口量和利润空间。",
                            "duration": 7488
                        }
                    },
                    {
                        "level": 2,
                        "parentId": "1001",
                        "children": [
                            {
                                "level": 3,
                                "parentId": "1163728981296039760",
                                "name": "电解液",
                                "bizId": "1163728981296039768",
                                "effectResult": "利空",
                                "effectReason": "重点限制对象"
                            },
                            {
                                "level": 3,
                                "parentId": "1163728981296039760",
                                "name": "稀土",
                                "bizId": "1163728981296039762",
                                "effectResult": "利空",
                                "effectReason": "关键原材料"
                            },
                            {
                                "level": 3,
                                "parentId": "1163728981296039760",
                                "name": "盐湖/锂矿石",
                                "bizId": "1163728981296039761",
                                "effectResult": "利空",
                                "effectReason": "关键原材料"
                            },
                            {
                                "level": 3,
                                "parentId": "1163728981296039760",
                                "name": "正负极",
                                "bizId": "1163728981296039767",
                                "effectResult": "利空",
                                "effectReason": "重点限制对象"
                            }
                        ],
                        "name": "上游\n原材料",
                        "bizId": "1163728981296039760",
                        "tts": {
                            "ttsText": "上游原材料市场同样面临利空。盐湖/锂矿石和稀土作为关键原材料，受到贸易限制影响，供应可能受限。正负极材料和电解液作为重点限制对象，其生产和出口也将受到冲击。",
                            "duration": 13068
                        }
                    },
                    {
                        "level": 2,
                        "parentId": "1001",
                        "children": [
                            {
                                "level": 3,
                                "parentId": "1163728981050672971",
                                "name": "电池",
                                "bizId": "1163728981296039750",
                                "effectResult": "利空",
                                "effectReason": "重点限制对象"
                            }
                        ],
                        "name": "中游\n零部件制造",
                        "bizId": "1163728981050672971",
                        "tts": {
                            "ttsText": "中游电池制造环节，作为新能源汽车的核心部件，同样成为贸易限制的重点对象。电池技术和产能受限，将对整个产业链产生连锁反应。",
                            "duration": 9504
                        }
                    }
                ],
                "name": "贸易壁垒的出现",
                "bizId": "1001",
                "tts": {
                    "ttsText": "新能源汽车产业链包括上游原材料、中游零部件制造和下游整车。",
                    "duration": 3108
                },
                "summary": {
                    "ttsText": "贸易壁垒的出现，对新能源汽车产业链的上中下游均带来利空影响，从原材料供应到整车出口，整个产业链面临严峻挑战。",
                    "duration": 8027
                }
            };
            setDuration(
                componentProps.current.data.value.animationData.tts.duration
                + componentProps.current.data.value.animationData.children.reduce((t, c) => t + c.tts.duration, 0)
                + componentProps.current.data.value.animationData.summary.duration
            )
            setLoading(false);
        })
    }, [])

    const Comp = component.current;

    const [playing, setPlaying] = useState(false);

    // const togglePlay = () => {
    //     setPlaying(!playing);
    // }

    const onSeek = (t) => {
        setTimestamp(t * 1000)
    }

    const onPlay = () => {
        if (playing) {
            setPlaying(false);
        } else {
            setPlaying(true);
        }
    }

    return (
        <div>
            <Layout>
                <Content style={{ display: 'flex', justifyContent: 'center'}}>
                    <div style={{width: '540px', height: '960px', background: '#ccc'}}>
                        {!loading ?
                            <Comp ref={componentRef} {...componentProps.current} playing={playing} width={"540px"}
                                  height={"960px"} timestamp={timestamp}
                            /> : null}
                    </div>
                </Content>
                <Layout.Footer>
                    <Row>
                        <Col span={24}>
                            <Slider step={0.1} min={0} max={duration / 1000} value={timestamp / 1000} onChange={onSeek}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Button icon={playing ? <PauseOutlined /> : <CaretRightFilled />} type="text" size="large" onClick={onPlay}></Button>
                        </Col>
                    </Row>
                </Layout.Footer>
            </Layout>
        </div>
    )
}

export default ComponentTest;