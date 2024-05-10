import styles from './index.module.css';
import { gsap } from "gsap-trial";
import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';
import {useEffect, useMemo, useRef, useState} from "react";
import {Button, Form, Input, Layout, Slider, Space} from "antd";
import Sider from "antd/es/layout/Sider";
import FormItem from "antd/es/form/FormItem";
import {Content} from "antd/es/layout/layout";
// import { SplitText } from "gsap/SplitText";

console.log(DrawSVGPlugin, gsap)
gsap.registerPlugin(DrawSVGPlugin)
const mindMapData = {"layout":"logicalStructure","root":{"data":{"text":"\u003Cp\u003E\u003Cstrong style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255); font-size: 24px;\"\u003E光刻机\u003C/strong\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"470e7df9-b8c6-4b3a-ac54-2b2dc82dca7f"},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255); font-size: 18px;\"\u003E材料及设备\u003C/span\u003E\u003C/p\u003E","generalization":null,"richText":true,"expand":true,"isActive":false,"uid":"5e486721-0563-4ef1-9ac7-e674d576d7aa"},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86); font-size: 14px;\"\u003E光刻机\u003C/span\u003E\u003C/p\u003E","richText":true,"expand":true,"isActive":false,"uid":"db9817b7-7fc7-4bf4-9cc7-91814d9d53b7"},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E彤程新材\u003C/span\u003E\u003C/p\u003E","uid":"8211c7b7-af8c-4170-a7f6-450415d2df5a","expand":true,"richText":true,"isActive":false},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E从事新材料的研发生产，光刻胶专利保证光刻胶回刻的平坦化程度\u003C/span\u003E\u003C/p\u003E","uid":"389d7647-5806-4e5a-a783-22b853170201","expand":true,"richText":true,"isActive":false},"children":[]}]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E晶瑞电材\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"2cc7afc0-0e66-4bab-a737-d6141c9f300c"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E南大光电\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"cd9f569f-b471-4f7b-9f60-03e37ada553d"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E容大感光\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"dfdb34bb-0d48-4a18-b6c3-e8385676c524"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E同益股份\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"584774a3-5b17-4e8e-8508-abce2147d2da"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E华丰科技\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"f3fec018-e9fd-4599-bfcc-2416fe8b1d6a"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E上海新阳\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"188d1823-6754-4a47-9156-aff813403d3f"},"children":[]}]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86); font-size: 14px;\"\u003E电子特气\u003C/span\u003E\u003C/p\u003E","richText":true,"expand":true,"isActive":false,"uid":"a0762b35-db88-4d58-a976-fcf6b79c8831"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E涂胶显影设备\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"bd7e58fc-0363-42a7-b70e-97bf29c3f32e"},"children":[]}]}]},"theme":{"template":"classic4","config":{}},"view":{"transform":{"scaleX":1,"scaleY":1,"shear":0,"rotate":0,"translateX":-355,"translateY":-20,"originX":0,"originY":0,"a":1,"b":0,"c":0,"d":1,"e":-355,"f":-20},"state":{"scale":1,"x":-355,"y":-20,"sx":-355,"sy":-20}}}

const titleIndexData = [
    {
        label: '上',
        themeColor: '#009FFF',
    },
    {
        label: '中',
        themeColor: '#EFBB35',
        fontColor: '#6D4F03',
        title2BgColor: '#FFD977',
    },
    {
        label: '下',
        themeColor: '#0C8B75',
    },
]

const LEFT_TEXT_MOVE_DIS = 138;
const SCALE = 1.2;

const GSAPDemo = () => {
    const [duration, setDuration] = useState(0);
    const [timestamp, setTimestamp] = useState(0);

    /* type: core.Timeline */
    const timeline = useRef();
    const refs =  useRef({});
    const [config, setConfig] = useState({
        width: 0,
        height: 0,
    })

    const [_data, setData] = useState(JSON.stringify([
        {
            title: '基础层',
            children: [
                {
                    title: '大模型大模型',
                    children: [
                        {
                            title: '智能计算平台',
                        },
                    ]
                }
            ]
        },
        {
            title: '技术层',
            children: [
                {
                    title: '大模型大模型',
                    children: [
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                    ]
                },
                {
                    title: '大模型大模型',
                    children: [
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                    ]
                },
                {
                    title: '大模型大模型',
                    children: [
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                        {
                            title: '智能计算平台',
                        },
                    ]
                },
            ]
        },
        {
            title: '应用层',
            children: [
                {
                    title: '大模型大模型',
                    children: [
                        {
                            title: '智能计算平台',
                        },
                    ]
                }
            ]
        },
    ]))

    const data = useMemo(() => JSON.parse(_data), [_data]);

    const resolutions = [1080, 1920];
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const { offsetWidth, offsetHeight } = document.querySelector('.ant-layout-content')
        setConfig({
            width: offsetWidth,
            height: offsetHeight,
        })

        const widthRadio = (offsetWidth - 100) / resolutions[0];
        const heightRadio = (offsetHeight - 100) / resolutions[1];
        setScale(Math.min(widthRadio, heightRadio))
    }, [])

    const createShowTitleTimeLine = (index, reverse = false) => {
        const [width, height] = resolutions;
        // const scale = 1.2;
        const timeline = gsap.timeline();
        const x = -(width + LEFT_TEXT_MOVE_DIS) * SCALE;
        const y = -650;
        timeline
            .to(refs['contentWrapper'], {
                duration: 0.5,
                x: reverse ? -x : x,
                y: reverse ? -y : y,
                ease: 'power1.inOut',
            })
            .add(createShowHotspotMoveSVG('middle', reverse), '<')
            .to(refs['contentWrapper'], {
                duration: 0.5,
                scale: reverse ? 1 : SCALE,
            }, '<')
        return timeline;
    }

    const createShowHotspotSVG = (type) => {
        return gsap.timeline().fromTo(refs[`${type}HotspotLine`], {
            strokeDashoffset: 200
        }, {
            strokeDashoffset: 400,
            duration: 3.5,
            repeat: -1,
            ease: 'none'
        }).fromTo(refs[`${type}HotspotLine`], { alpha: 0 }, { alpha: 1, ease: 'power1.inOut' }, '<');
    }

    const createShowHotspotMoveSVG = (type, reverse = false) => {
        const [width, height] = resolutions;
        const timeline = gsap.timeline();
        if (type === 'middle') {
            timeline.to(refs['leftTextLineSVG'], {
                duration: 0.5,
                attr: {
                    width: `${reverse ? '-' : '+'}=${width + LEFT_TEXT_MOVE_DIS}`,
                    viewBox: `0 0 ${reverse ? '-' : '+'}=${width + LEFT_TEXT_MOVE_DIS} 145.963574`,
                },
                ease: 'power1.inOut',
            })
            .to(refs['leftTextLine'].querySelectorAll('line'), {
                duration: 0.5,
                attr: {
                    x1: `${reverse ? '-' : '+'}=${width + LEFT_TEXT_MOVE_DIS}`,
                },
                ease: 'power1.inOut',
            }, '<')
        } else if (type === 'up') {
            // refs[`${type}HotspotLine`]
        } else if (type === 'down') {

        }

        return timeline;
    }

    useGSAP(() => {
        // if (config.width === 0) return
        // console.log(config, data.current[0].ref)
        const [width, height] = resolutions;


        // const showTitle1 = gsap.to(`.${styles.title1}`, {
        //     duration: 0.5,
        //     x: 0,
        //     alpha: 1,
        //     ease: 'power1.inOut',
        // })
        // const showTitle2 = gsap.to(`#title2`, {
        //     duration: 0.5,
        //     x: 0,
        //     alpha: 1,
        //     ease: 'power1.inOut',
        // })
        // const showTitle3 = gsap.to(`.${styles.title3}`, {
        //     duration: 0.5,
        //     x: 0,
        //     alpha: 1,
        //     ease: 'power1.inOut',
        // })
        const showLeftText = gsap.to(`.${styles.leftText}`, {
            duration: 0.5,
            x: 0,
            alpha: 1,
            ease: 'power1.inOut',
        })
        const titleWrapperToRight = gsap.to(`.${styles.titleWrapper}`, {
            duration: 0.5,
            x: LEFT_TEXT_MOVE_DIS,
            ease: 'power1.inOut',
        })
        // const toRight = gsap.to(`#title2`, {
        //     duration: 0.5,
        //     x: width,
        //     ease: 'power1.inOut',
        // })
        // const showList = gsap.to(`.${styles.listWrapper}`, {
        //     duration: 0.7,
        //     height: height * 0.7,
        //     ease: 'power1.inOut',
        // })
        // gsap.fromTo(refs['leftTextLine'], { strokeDashoffset: 200 }, { strokeDashoffset: 400, duration: 3.5, repeat: -1, ease: 'none' })

        timeline.current = gsap.timeline({ paused: true });

        data.forEach((item, index) => {
            timeline.current.add(
                gsap.to(item.ref, {
                    duration: 0.5,
                    x: 0,
                    alpha: 1,
                    ease: 'power1.inOut',
                })
            )
            // if (index === data.current.length - 1) {
            //     timeline.current
            //         .add(showLeftText)
            //         .add(titleWrapperToRight, '<')
            //         .add(toLeft, '+=1')
            //         .add(toRight, '<')
            //         .add(showList, '>-0.1')
            // }
        })

        timeline.current
            .add(showLeftText)
            .add(titleWrapperToRight, '<')
            .fromTo(refs['leftTextLine'], { strokeDashoffset: 200 }, { strokeDashoffset: 400, duration: 3.5, repeat: -1, ease: 'none' })
            .fromTo(refs['leftTextLine'], { alpha: 0 }, { alpha: 1, ease: 'power1.inOut' }, '<')
            .add(createShowHotspotSVG('up'), '<+1')
            .add(createShowHotspotSVG('down'), '<+1')
            // .delay(1)
            .add(createShowTitleTimeLine(1), '<+1')
            // .to(refs['contentWrapper'], {
            //     duration: 0.5,
            //     x: -(width + LEFT_TEXT_MOVE_DIS),
            //     y: -((height - 300) / 2),
            //     ease: 'power1.inOut',
            // }, '<+1')
            // .add(createShowHotspotMoveSVG('middle'), '<')


        timeline.current.to(data[1].ref, {
            duration: 0.5,
            x: width,
            ease: 'power1.inOut',
        }, '<')
            .to(data[1].listRef, {
                duration: 0.7,
                height: height * 0.5,
                ease: 'power1.inOut',
            }, '>-0.1')

        data[1].children.forEach((item, index) => {
            timeline.current.add(
                gsap.to(item.ref, {
                    duration: 0.5,
                    x: 0,
                    ease: 'power1.inOut',
                })
            )
        })

        timeline.current
            .add(gsap.to(`.${styles.contentWrapper}`, {
                duration: 0.5,
                y: -(height * 0.55),
                ease: 'power1.inOut',
            }))
            .add(gsap.to(`.${styles.listWrapper}`, {
                duration: 0.5,
                paddingTop: `+=100`,
                height: `+=${height}`,
                ease: 'power1.inOut',
            }), '<')

        data[1].children.forEach((item, index) => {
            timeline.current.add(
                gsap.to(item.listRef, {
                    // display: 'flex',
                    duration: 0.5,
                    y: 0,
                    height: 'auto',
                    alpha: 1,
                    ease: 'power1.inOut',
                }), '<'
            )
            timeline.current.add(
                gsap.to(item.listRef, {
                    // display: 'none',
                    delay: 1.5,
                    duration: 0.5,
                    height: 0,
                    alpha: 0,
                    ease: 'power1.inOut',
                })
            )
        })

        // timeline.current
            // .add(gsap.to(`.${styles.listItem}`, {
            //     duration: 0.7,
            //     x: 0,
            //     ease: 'power1.inOut',
            // }), '>-0.2')
            // .add(gsap.to(`.${styles.listItem1}`, {
            //     duration: 0.7,
            //     x: 0,
            //     ease: 'power1.inOut',
            // }))
            // .add(gsap.to(`.${styles.contentWrapper}`, {
            //     duration: 0.5,
            //     y: -(height * 0.55),
            //     ease: 'power1.inOut',
            // }))
            // .add(gsap.to(`.${styles.listWrapper}`, {
            //     duration: 0.5,
            //     height: `+=${height}`,
            //     ease: 'power1.inOut',
            // }), '<')
            // .add(gsap.to(`.${styles.listItemContent}`, {
            //     duration: 0.5,
            //     height: 'auto',
            //     alpha: 1,
            //     ease: 'power1.inOut',
            // }), '<')

        timeline.current.addLabel('endTime');
        // timeline.current.seek(2.1)
        console.log(999, timeline.current.duration(), timeline.current.totalTime(), timeline.current)
        setDuration(timeline.current.labels.endTime);
    }, [config])

    const onPlay = () => {
        timeline.current.play()
    }

    const onReversePlay = () => {
        timeline.current.reverse()
    }

    const onSeek = (timestamp) => {
        console.log(timestamp)
        setTimestamp(timestamp);
        timeline.current.seek(timestamp).pause();
        // timeline.current.pause();
    }

    const createHotspotVerticalSVG = (type = 'up') => {
        return (
            <svg width="371.669664px" height="397.996543px" viewBox="0 0 371.669664 397.996543" version="1.1"
                 style={{ transform: type === 'up' ? '' : 'rotate(180deg)' }}
                 xmlns="http://www.w3.org/2000/svg">
                <title>编组</title>
                <defs>
                    <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id={`${type}-linearGradient-1`}>
                        <stop stopColor="#FFFFFF" offset="0%"></stop>
                        <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id={`${type}-linearGradient-2`}>
                        <stop stopColor="#FFFFFF" offset="0%"></stop>
                        <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
                    </linearGradient>
                </defs>
                <g ref={ref => refs[`${type}HotspotLine`] = ref} id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeDasharray="20"
                   strokeLinecap="round">
                    <g id="画板02" transform="translate(-479.9998, -441.9992)" strokeWidth="6">
                        <g id="编组" transform="translate(483, 445)">
                            <path
                                d="M-5.68434189e-14,0 C39.779569,52.0098794 59.6693534,114.468021 59.6693534,187.374424 C59.6693534,260.280827 39.779569,328.489352 -5.68434189e-14,392"
                                id="路径" stroke={`url(#${type}-linearGradient-1)`}></path>
                            <path
                                d="M108,0 C132.418695,62.0946972 144.628042,127.428031 144.628042,196 C144.628042,264.571969 132.418695,329.905303 108,392"
                                id="路径" stroke={`url(#${type}-linearGradient-2)`}></path>
                            <path
                                d="M306,0 C345.779569,52.0098794 365.669353,114.468021 365.669353,187.374424 C365.669353,260.280827 345.779569,328.489352 306,392"
                                id="路径" stroke={`url(#${type}-linearGradient-1)`}
                                transform="translate(335.8347, 196) scale(-1, 1) translate(-335.8347, -196)"></path>
                            <path
                                d="M221,0 C245.418695,62.0946972 257.628042,127.428031 257.628042,196 C257.628042,264.571969 245.418695,329.905303 221,392"
                                id="路径" stroke={`url(#${type}-linearGradient-2)`}
                                transform="translate(239.314, 196) scale(-1, 1) translate(-239.314, -196)"></path>
                        </g>
                    </g>
                </g>
            </svg>
        )
    }

    return (
        <Layout className={styles.container}>
            <Sider width={500} style={{
                padding: 10,
                background: '#fff',
                height: '100%'
            }}>
                <Form layout={'vertical'}>
                    <FormItem label="timestamp">
                        {/*<Input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} suffix={'ms'} />*/}
                        <Slider step={0.1} min={0} max={duration} value={timestamp} onChange={onSeek}/>
                    </FormItem>
                    <FormItem label="data">
                        <Input.TextArea autoSize={{minRows: 10}} value={_data}
                                        onChange={(e) => setData(e.target.value)}/>
                    </FormItem>
                    <FormItem label="action">
                        <Space direction={'vertical'} style={{width: '100%'}}>
                            <Button block onClick={onPlay}>Play</Button>
                            <Button block onClick={onReversePlay}>Reverse Play</Button>
                            {/*<Button block onClick={onSeek}>Seek</Button>*/}
                        </Space>
                    </FormItem>
                </Form>
            </Sider>
            <Content style={{position: 'relative'}}>
                {/*<div id={'box'} className={styles.text}>*/}
                {/*    GroupShopping List*/}
                {/*</div>*/}
                <div className={styles.stage} style={{
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    width: `${resolutions[0]}px`,
                    height: `${resolutions[1]}px`
                }}>
                    <div className={styles.resolutions} style={{transform: `translateY(-100%) scale(${1})`}}>1080 x
                        1920
                    </div>
                    <div className={styles.stageBorder} style={{transform: `scale(${1})`}}></div>

                    <div className={styles.stageContent} style={{fontSize: `${resolutions[1] / 10}px`}}>
                        <div ref={ref => refs['contentWrapper'] = ref} className={styles.contentWrapper}>
                            <div className={styles.leftText}>
                                <div className={styles.leftTextContent}>百模大战</div>
                                <svg ref={ref => refs['leftTextLineSVG'] = ref} width="145.999233px" height="145.963574px" viewBox="0 0 145.999233 145.963574"
                                     version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <title>编组 2</title>
                                    <defs>
                                        <linearGradient x1="0%" y1="100%" x2="102.553873%" y2="100%"
                                                        id="linearGradient-1">
                                            <stop stopColor="#FFFFFF" offset="0%"></stop>
                                            <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
                                        </linearGradient>
                                        <linearGradient x1="0%" y1="100%" x2="102.553873%" y2="100%"
                                                        id="linearGradient-2">
                                            <stop stopColor="#FFFFFF" offset="0%"></stop>
                                            <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
                                        </linearGradient>
                                        <linearGradient x1="0%" y1="100%" x2="102.553873%" y2="100%"
                                                        id="linearGradient-3">
                                            <stop stopColor="#FFFFFF" offset="0%"></stop>
                                            <stop stopColor="#FFFFFF" stopOpacity="0" offset="100%"></stop>
                                        </linearGradient>
                                    </defs>
                                    <g ref={ref => refs['leftTextLine'] = ref} id="leftTextLine" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"
                                       strokeDasharray="20" strokeLinecap="round">
                                        <g id="画板01" transform="translate(-250.0008, -851.0364)" strokeWidth="6">
                                            <g id="01" transform="translate(-0, 0)">
                                                <g id="事件" transform="translate(135, 790)">
                                                    <g id="编组-2" transform="translate(107, 63.5)">
                                                        <line x1="112" y1="70.5" x2="0" y2="70" id="路径"
                                                              stroke="url(#linearGradient-1)"></line>
                                                        <line x1="151" y1="140.5" x2="0" y2="140" id="路径"
                                                              stroke="url(#linearGradient-2)"></line>
                                                        <line x1="151" y1="1" x2="0" y2="0.5" id="路径"
                                                              stroke="url(#linearGradient-3)"></line>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className={styles.titleWrapper}>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <>
                                                <div key={index} ref={ref => item.ref = ref} className={styles.title}
                                                     style={{
                                                         '--color': titleIndexData[index].themeColor,
                                                         '--font-color': titleIndexData[index].fontColor,
                                                         '--title2-bg-color': titleIndexData[index].title2BgColor,
                                                }}>
                                                    <div ref={ref => item.titleRef = ref} className={styles.titleContent}>
                                                        <div
                                                            className={styles.titleIndex}>{titleIndexData[index].label}</div>
                                                        {item.title}
                                                    </div>
                                                    <div ref={ref => item.listRef = ref} className={styles.listWrapper}>
                                                        {
                                                            item.children.map((child, childIndex) => {
                                                                return (
                                                                    <div key={childIndex}
                                                                         ref={ref => child.ref = ref}
                                                                         className={styles.listItem}>
                                                                        <div
                                                                            className={styles.listItemTitle}>
                                                                            {child.title}
                                                                            <div className={styles.listItemDesc}>
                                                                                利好利好利好利好利好利好
                                                                            </div>
                                                                        </div>
                                                                        <div ref={ref => child.listRef = ref}
                                                                             className={styles.listItemContent}>
                                                                            {
                                                                                child.children.map((grandson, grandsonIndex) => {
                                                                                    return (
                                                                                        <img
                                                                                            key={grandsonIndex}
                                                                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                                                                            alt=""/>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                { index !== data.length - 1 ? createHotspotVerticalSVG(index % 2 ? 'down' : 'up') : null}
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default GSAPDemo;