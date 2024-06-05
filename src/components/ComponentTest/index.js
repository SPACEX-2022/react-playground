import {Component, useEffect, useRef, useState} from "react";
import {Button, Col, Layout, Row, Slider} from "antd";
import {CaretRightFilled, PauseOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";
import {useKeyPress} from "ahooks";


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
            componentProps.current = {
                    "left": "0px",
                    "top": "0px",
                    "width": "1080px",
                    "height": "1920px",
                    "delay": 0,
                    "duration": 70200,
                    "enterDuration": 500,
                    "leaveDuration": 500,
                    "style": {},
                    "fromStyle": {
                        "transform": "translateX(0px) scale(1)",
                        "opacity": 1
                    },
                    "toStyle": {
                        "transform": "translateX(0px) scale(1)",
                        "opacity": 1
                    },
                    "leaveStyle": {
                        "transform": "translateX(0px) scale(1)",
                        "opacity": 1
                    },
                    "animateType": null,
                    "animateLeaveType": null,
                    "rotate": "0deg",
                    "data": {
                        "value": {
                            "animationData": {

                                "level": 1,
                                "parentId": "0",
                                "children": [
                                    {
                                        "level": 2,
                                        "parentId": "1163728422451558693",
                                        "children": [
                                            {
                                                "level": 3,
                                                "parentId": "1163728615590069740",
                                                "children": [
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352810",
                                                        "name": "电子膨胀阀",
                                                        "bizId": "1163728615639352815",
                                                        "effectResult": "间接利好",
                                                        "effectReason": "优化能效"
                                                    },
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352810",
                                                        "name": "传感器",
                                                        "bizId": "1163728615639352814",
                                                        "effectResult": "间接利好",
                                                        "effectReason": "优化能效"
                                                    },
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352810",
                                                        "name": "芯片",
                                                        "bizId": "1163728615639352813",
                                                        "effectResult": "间接利好",
                                                        "effectReason": "优化能效"
                                                    },
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352810",
                                                        "name": "电机",
                                                        "bizId": "1163728615639352812",
                                                        "effectResult": "间接利好",
                                                        "effectReason": "优化能效"
                                                    },
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352810",
                                                        "name": "压缩机",
                                                        "bizId": "1163728615639352811",
                                                        "effectResult": "间接利好",
                                                        "effectReason": "优化能效"
                                                    }
                                                ],
                                                "name": "核心零部件",
                                                "bizId": "1163728615639352810"
                                            },
                                            {
                                                "level": 3,
                                                "parentId": "1163728615590069740",
                                                "children": [
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352807",
                                                        "name": "塑料",
                                                        "bizId": "1163728615639352809",
                                                        "effectResult": "间接利好",
                                                        "effectReason": "技术升级"
                                                    },
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352807",
                                                        "name": "金属材料",
                                                        "bizId": "1163728615639352808",
                                                        "effectResult": "间接利好",
                                                        "effectReason": "销量带动"
                                                    }
                                                ],
                                                "name": "原材料",
                                                "bizId": "1163728615639352807"
                                            }
                                        ],
                                        "name": "上游\n原材料、零部件",
                                        "bizId": "1163728615590069740",
                                        "tts": {
                                            "ttsText": "中游家电制造业将直接受益。白电领域，空调因节能需求和刚需而受到直接利好，冰箱刚需增加。黑电中的电视产品升级，厨电电饭煲智能转型，小家电扫地机器人需求增加，整个中游产业将迎来产品升级和需求增长的双重利好。",
                                            "duration": 19404
                                        }
                                    },
                                    {
                                        "level": 2,
                                        "parentId": "1163728422451558693",
                                        "children": [
                                            {
                                                "level": 3,
                                                "parentId": "1163728615639352816",
                                                "children": [
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352817",
                                                        "name": "品牌官网",
                                                        "bizId": "1163728615639352819",
                                                        "effectResult": "直接利好",
                                                        "effectReason": "优惠加大"
                                                    },
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352817",
                                                        "name": "电商平台",
                                                        "bizId": "1163728615639352818",
                                                        "effectResult": "直接利好",
                                                        "effectReason": "补贴增加"
                                                    }
                                                ],
                                                "name": "线上渠道",
                                                "bizId": "1163728615639352817"
                                            },
                                            {
                                                "level": 3,
                                                "parentId": "1163728615639352816",
                                                "children": [
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352820",
                                                        "name": "品牌专卖店",
                                                        "bizId": "1163728615639352822",
                                                        "effectResult": "直接利好",
                                                        "effectReason": "促销增大"
                                                    },
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352820",
                                                        "name": "超市",
                                                        "bizId": "1163728615639352821",
                                                        "effectResult": "直接利好",
                                                        "effectReason": "活动增多"
                                                    }
                                                ],
                                                "name": "线下渠道",
                                                "bizId": "1163728615639352820"
                                            }
                                        ],
                                        "name": "下游\n销售渠道",
                                        "bizId": "1163728615639352816",
                                        "tts": {
                                            "ttsText": "下游销售渠道也将受益。线上电商平台和品牌官网的补贴和优惠将增加，吸引消费者线上购买。线下超市和品牌专卖店通过举办促销活动，增加销量，享受政策红利。",
                                            "duration": 13392
                                        }
                                    },
                                    {
                                        "level": 2,
                                        "parentId": "1163728422451558693",
                                        "children": [
                                            {
                                                "level": 3,
                                                "parentId": "1163728615639352823",
                                                "children": [
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352835",
                                                        "name": "扫地机器人",
                                                        "bizId": "1163728615639352837",
                                                        "effectResult": "直接利好",
                                                        "effectReason": "需求增加"
                                                    }
                                                ],
                                                "name": "小家电",
                                                "bizId": "1163728615639352835"
                                            },
                                            {
                                                "level": 3,
                                                "parentId": "1163728615639352823",
                                                "children": [
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352831",
                                                        "name": "电饭煲",
                                                        "bizId": "1163728615639352832",
                                                        "effectResult": "直接利好",
                                                        "effectReason": "智能转型"
                                                    }
                                                ],
                                                "name": "厨电",
                                                "bizId": "1163728615639352831"
                                            },
                                            {
                                                "level": 3,
                                                "parentId": "1163728615639352823",
                                                "children": [
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352828",
                                                        "name": "电视",
                                                        "bizId": "1163728615639352829",
                                                        "effectResult": "直接利好",
                                                        "effectReason": "产品升级"
                                                    }
                                                ],
                                                "name": "黑电",
                                                "bizId": "1163728615639352828"
                                            },
                                            {
                                                "level": 3,
                                                "parentId": "1163728615639352823",
                                                "children": [
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352824",
                                                        "name": "冰箱",
                                                        "bizId": "1163728615639352826",
                                                        "effectResult": "直接利好",
                                                        "effectReason": "刚需增加"
                                                    },
                                                    {
                                                        "level": 4,
                                                        "parentId": "1163728615639352824",
                                                        "name": "空调",
                                                        "bizId": "1163728615639352825",
                                                        "effectResult": "直接利好",
                                                        "effectReason": "节能需求+刚需"
                                                    }
                                                ],
                                                "name": "白电",
                                                "bizId": "1163728615639352824"
                                            }
                                        ],
                                        "name": "中游\n家电制造",
                                        "bizId": "1163728615639352823",
                                        "tts": {
                                            "ttsText": "上游原材料和核心零部件供应商同样受益。随着家电产品更新换代的需求增加，对金属材料和塑料等原材料的销量和技术升级需求上升。核心零部件如电子膨胀阀、电机、压缩机、芯片、传感器等的优化能效需求增长，技术升级成为推动力。",
                                            "duration": 20052
                                        }
                                    }
                                ],
                                "name": "消费品以旧换新",
                                "bizId": "1163728422451558693",
                                "tts": {
                                    "ttsText": "家电产业链包括上游原材料与零部件、中游家电制造、下游销售渠道。",
                                    "duration": 5471
                                },
                                "summary": {
                                    "ttsText": "以旧换新政策直接推动了家电制造的产品升级和销售渠道的促销活动，间接促进了上游原材料和核心零部件的需求增长和技术进步，为家电产业链带来了全面而深远的积极影响。",
                                    "duration": 13643
                                }
                            }
                        }
                    }
            };
            // componentProps.current.data.value.animationData = {
            //     "level": 1,
            //     "parentId": "0",
            //     "children": [
            //         {
            //             "level": 2,
            //             "parentId": "1001",
            //             "children": [
            //                 {
            //                     "level": 3,
            //                     "parentId": "1163728981296039756",
            //                     "name": "纯电车",
            //                     "bizId": "1163728981296039757",
            //                     "effectResult": "利空",
            //                     "effectReason": "海外补贴限制"
            //                 }
            //             ],
            //             "name": "下游\n整车",
            //             "bizId": "1163728981296039756",
            //             "tts": {
            //                 "ttsText": "贸易壁垒的出现，首先对下游纯电车市场带来利空影响。海外市场补贴限制，将直接影响出口量和利润空间。",
            //                 "duration": 7488
            //             }
            //         },
            //         {
            //             "level": 2,
            //             "parentId": "1001",
            //             "children": [
            //                 {
            //                     "level": 3,
            //                     "parentId": "1163728981296039760",
            //                     "name": "电解液",
            //                     "bizId": "1163728981296039768",
            //                     "effectResult": "利空",
            //                     "effectReason": "重点限制对象"
            //                 },
            //                 {
            //                     "level": 3,
            //                     "parentId": "1163728981296039760",
            //                     "name": "稀土",
            //                     "bizId": "1163728981296039762",
            //                     "effectResult": "利空",
            //                     "effectReason": "关键原材料"
            //                 },
            //                 {
            //                     "level": 3,
            //                     "parentId": "1163728981296039760",
            //                     "name": "盐湖/锂矿石",
            //                     "bizId": "1163728981296039761",
            //                     "effectResult": "利空",
            //                     "effectReason": "关键原材料"
            //                 },
            //                 {
            //                     "level": 3,
            //                     "parentId": "1163728981296039760",
            //                     "name": "正负极",
            //                     "bizId": "1163728981296039767",
            //                     "effectResult": "利空",
            //                     "effectReason": "重点限制对象"
            //                 }
            //             ],
            //             "name": "上游\n原材料",
            //             "bizId": "1163728981296039760",
            //             "tts": {
            //                 "ttsText": "上游原材料市场同样面临利空。盐湖/锂矿石和稀土作为关键原材料，受到贸易限制影响，供应可能受限。正负极材料和电解液作为重点限制对象，其生产和出口也将受到冲击。",
            //                 "duration": 13068
            //             }
            //         },
            //         {
            //             "level": 2,
            //             "parentId": "1001",
            //             "children": [
            //                 {
            //                     "level": 3,
            //                     "parentId": "1163728981050672971",
            //                     "name": "电池",
            //                     "bizId": "1163728981296039750",
            //                     "effectResult": "利空",
            //                     "effectReason": "重点限制对象"
            //                 }
            //             ],
            //             "name": "中游\n零部件制造",
            //             "bizId": "1163728981050672971",
            //             "tts": {
            //                 "ttsText": "中游电池制造环节，作为新能源汽车的核心部件，同样成为贸易限制的重点对象。电池技术和产能受限，将对整个产业链产生连锁反应。",
            //                 "duration": 9504
            //             }
            //         }
            //     ],
            //     "name": "贸易壁垒的出现",
            //     "bizId": "1001",
            //     "tts": {
            //         "ttsText": "新能源汽车产业链包括上游原材料、中游零部件制造和下游整车。",
            //         "duration": 3108
            //     },
            //     "summary": {
            //         "ttsText": "贸易壁垒的出现，对新能源汽车产业链的上中下游均带来利空影响，从原材料供应到整车出口，整个产业链面临严峻挑战。",
            //         "duration": 8027
            //     }
            // };
            // setDuration(
            //     componentProps.current.data.value.animationData.tts.duration
            //     + componentProps.current.data.value.animationData.children.reduce((t, c) => t + c.tts.duration, 0)
            //     + componentProps.current.data.value.animationData.summary.duration
            // )
            setDuration(78000)
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

    useKeyPress('Space', () => {
        onPlay();
    }, {
        exactMatch: true,
    })

    return (
        <div>
            <Layout>
                <Content style={{ display: 'flex', justifyContent: 'center'}}>
                    <div style={{width: '540px', height: '960px', background: '#ccc'}}>
                        {!loading ?
                            <Comp ref={componentRef} {...componentProps.current} playing={playing} width={"540px"}
                                  height={"960px"} timestamp={timestamp}
                                  onTimestampChange={(time) => setTimestamp(time * 1000)}
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