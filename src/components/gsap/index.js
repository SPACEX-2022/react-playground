import styles from './index.module.css';
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import {useEffect, useRef, useState} from "react";
import {Button, Form, Input, Layout, Slider, Space} from "antd";
import Sider from "antd/es/layout/Sider";
import FormItem from "antd/es/form/FormItem";
import {Content} from "antd/es/layout/layout";
// import { SplitText } from "gsap/SplitText";

const mindMapData = {"layout":"logicalStructure","root":{"data":{"text":"\u003Cp\u003E\u003Cstrong style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255); font-size: 24px;\"\u003E光刻机\u003C/strong\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"470e7df9-b8c6-4b3a-ac54-2b2dc82dca7f"},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255); font-size: 18px;\"\u003E材料及设备\u003C/span\u003E\u003C/p\u003E","generalization":null,"richText":true,"expand":true,"isActive":false,"uid":"5e486721-0563-4ef1-9ac7-e674d576d7aa"},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86); font-size: 14px;\"\u003E光刻机\u003C/span\u003E\u003C/p\u003E","richText":true,"expand":true,"isActive":false,"uid":"db9817b7-7fc7-4bf4-9cc7-91814d9d53b7"},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E彤程新材\u003C/span\u003E\u003C/p\u003E","uid":"8211c7b7-af8c-4170-a7f6-450415d2df5a","expand":true,"richText":true,"isActive":false},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E从事新材料的研发生产，光刻胶专利保证光刻胶回刻的平坦化程度\u003C/span\u003E\u003C/p\u003E","uid":"389d7647-5806-4e5a-a783-22b853170201","expand":true,"richText":true,"isActive":false},"children":[]}]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E晶瑞电材\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"2cc7afc0-0e66-4bab-a737-d6141c9f300c"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E南大光电\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"cd9f569f-b471-4f7b-9f60-03e37ada553d"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E容大感光\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"dfdb34bb-0d48-4a18-b6c3-e8385676c524"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E同益股份\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"584774a3-5b17-4e8e-8508-abce2147d2da"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E华丰科技\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"f3fec018-e9fd-4599-bfcc-2416fe8b1d6a"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E上海新阳\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"188d1823-6754-4a47-9156-aff813403d3f"},"children":[]}]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86); font-size: 14px;\"\u003E电子特气\u003C/span\u003E\u003C/p\u003E","richText":true,"expand":true,"isActive":false,"uid":"a0762b35-db88-4d58-a976-fcf6b79c8831"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E涂胶显影设备\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"bd7e58fc-0363-42a7-b70e-97bf29c3f32e"},"children":[]}]}]},"theme":{"template":"classic4","config":{}},"view":{"transform":{"scaleX":1,"scaleY":1,"shear":0,"rotate":0,"translateX":-355,"translateY":-20,"originX":0,"originY":0,"a":1,"b":0,"c":0,"d":1,"e":-355,"f":-20},"state":{"scale":1,"x":-355,"y":-20,"sx":-355,"sy":-20}}}

const GSAPDemo = () => {
    const [duration, setDuration] = useState(0);
    const [timestamp, setTimestamp] = useState(0);

    /* type: core.Timeline */
    const timeline = useRef();
    const [config, setConfig] = useState({
        width: 0,
        height: 0,
    })

    const data = useRef([
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
    ])

    useEffect(() => {
        const content = document.querySelector('.ant-layout-content')
        setConfig({
            width: content.offsetWidth,
            height: content.offsetHeight,
        })
    }, [])

    useGSAP(() => {
        if (config.width === 0) return
        console.log(config, data.current[0].ref)
        const { width, height } = config;


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
            x: 50,
            ease: 'power1.inOut',
        })
        const toLeft = gsap.to(`.${styles.contentWrapper}`, {
            duration: 0.5,
            x: -(width + 50),
            y: -((height - 300) / 2),
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

        timeline.current = gsap.timeline({ paused: true });

        data.current.forEach((item, index) => {
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
            .add(toLeft, '+=1')


        timeline.current.add(gsap.to(data.current[1].ref, {
            duration: 0.5,
            x: width,
            ease: 'power1.inOut',
        }), '<')
            .add(gsap.to(data.current[1].listRef, {
                duration: 0.7,
                height: height * 0.7,
                ease: 'power1.inOut',
            }), '>-0.1')

        data.current[1].children.forEach((item, index) => {
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

        data.current[1].children.forEach((item, index) => {
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

        setDuration(timeline.current.duration());
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

    return (
        <Layout className={styles.container}>
            <Sider style={{
                padding: 10,
                background: '#fff',
                height: '100%'
            }}>
                <Form layout={'vertical'}>
                    <FormItem label="timestamp">
                        {/*<Input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} suffix={'ms'} />*/}
                        <Slider step={0.1} min={0} max={duration} value={timestamp} onChange={onSeek} />
                    </FormItem>
                    <FormItem label="action">
                        <Space direction={'vertical'} style={{ width: '100%' }}>
                            <Button block onClick={onPlay}>Play</Button>
                            <Button block onClick={onReversePlay}>Reverse Play</Button>
                            {/*<Button block onClick={onSeek}>Seek</Button>*/}
                        </Space>
                    </FormItem>
                </Form>
            </Sider>
            <Content style={{ position: 'relative', backgroundColor: '#282c34', color: '#fff', fontSize: '100px', overflow: 'hidden' }}>
                {/*<div id={'box'} className={styles.text}>*/}
                {/*    GroupShopping List*/}
                {/*</div>*/}

                <div className={styles.contentWrapper}>

                    <div className={styles.leftText}>
                        百模大战
                    </div>
                    <div className={styles.titleWrapper}>
                        {
                            data.current.map((item, index) => {
                                return (
                                    <div ref={ref => item.ref = ref} className={styles.title}>
                                        {item.title}
                                        <div ref={ref => item.listRef = ref} className={styles.listWrapper}>
                                            {
                                                item.children.map((child, childIndex) => {
                                                    return (
                                                        <div ref={ref => child.ref = ref} className={styles.listItem}>
                                                            <div className={styles.listItemTitle}>{ child.title }</div>
                                                            <div ref={ref => child.listRef = ref} className={styles.listItemContent}>
                                                                {
                                                                    child.children.map((grandson, grandsonIndex) => {
                                                                        return (
                                                                            <img
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
                                            {/*<div className={styles.listItem}>*/}
                                            {/*    <div className={styles.listItemTitle}>大模型大模型</div>*/}
                                            {/*    <div className={styles.listItemContent}>*/}
                                            {/*        <img*/}
                                            {/*            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
                                            {/*            alt=""/>*/}
                                            {/*        <img*/}
                                            {/*            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
                                            {/*            alt=""/>*/}
                                            {/*        <img*/}
                                            {/*            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
                                            {/*            alt=""/>*/}
                                            {/*        <img*/}
                                            {/*            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
                                            {/*            alt=""/>*/}
                                            {/*        <img*/}
                                            {/*            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
                                            {/*            alt=""/>*/}
                                            {/*        <img*/}
                                            {/*            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"*/}
                                            {/*            alt=""/>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            {/*<div className={styles.listItem1}>大模型大模型</div>*/}
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/*<div className={styles.title1}>基础层</div>*/}
                        {/*<div id="title2" className={styles.title2}>*/}
                        {/*    技术层*/}
                        {/*    <div className={styles.listWrapper}>*/}
                        {/*        <div className={styles.listItem}>*/}
                        {/*            <div className={styles.listItemTitle}>大模型大模型</div>*/}
                        {/*            <div className={styles.listItemContent}>*/}
                        {/*                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>*/}
                        {/*                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>*/}
                        {/*                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>*/}
                        {/*                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>*/}
                        {/*                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>*/}
                        {/*                <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt=""/>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className={styles.listItem1}>大模型大模型</div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={styles.title3}>应用层</div>*/}
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default GSAPDemo;