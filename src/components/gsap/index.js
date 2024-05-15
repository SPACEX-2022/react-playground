import styles from './index.module.css';
import {gsap} from "gsap";
// import EaselPlugin from 'gsap/EaselPlugin';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin';
import {useGSAP} from '@gsap/react';
// import * as createjs from 'createjs/builds/1.0.0/createjs';
import {useEffect, useRef, useState} from "react";
import {Button, Col, Form, Input, Layout, message, Row, Slider, Space} from "antd";
import Sider from "antd/es/layout/Sider";
import FormItem from "antd/es/form/FormItem";
import {Content} from "antd/es/layout/layout";
import {CaretRightFilled, PauseOutlined} from '@ant-design/icons';
import {useDebounceEffect, useKeyPress, useLocalStorageState} from "ahooks";
import {DragSortTable, ProList} from "@ant-design/pro-components";
import dayjs from "dayjs";
import {nanoid} from "nanoid";
import cloneDeep from 'lodash.clonedeep';
// import { SplitText } from "gsap/SplitText";

// console.log(DrawSVGPlugin, gsap)
gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin)
// gsap.registerPlugin();
const mindMapData = {"layout":"logicalStructure","root":{"data":{"text":"\u003Cp\u003E\u003Cstrong style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255); font-size: 24px;\"\u003E光刻机\u003C/strong\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"470e7df9-b8c6-4b3a-ac54-2b2dc82dca7f"},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(255, 255, 255); font-size: 18px;\"\u003E材料及设备\u003C/span\u003E\u003C/p\u003E","generalization":null,"richText":true,"expand":true,"isActive":false,"uid":"5e486721-0563-4ef1-9ac7-e674d576d7aa"},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86); font-size: 14px;\"\u003E光刻机\u003C/span\u003E\u003C/p\u003E","richText":true,"expand":true,"isActive":false,"uid":"db9817b7-7fc7-4bf4-9cc7-91814d9d53b7"},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E彤程新材\u003C/span\u003E\u003C/p\u003E","uid":"8211c7b7-af8c-4170-a7f6-450415d2df5a","expand":true,"richText":true,"isActive":false},"children":[{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E从事新材料的研发生产，光刻胶专利保证光刻胶回刻的平坦化程度\u003C/span\u003E\u003C/p\u003E","uid":"389d7647-5806-4e5a-a783-22b853170201","expand":true,"richText":true,"isActive":false},"children":[]}]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E晶瑞电材\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"2cc7afc0-0e66-4bab-a737-d6141c9f300c"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E南大光电\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"cd9f569f-b471-4f7b-9f60-03e37ada553d"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E容大感光\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"dfdb34bb-0d48-4a18-b6c3-e8385676c524"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E同益股份\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"584774a3-5b17-4e8e-8508-abce2147d2da"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E华丰科技\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"f3fec018-e9fd-4599-bfcc-2416fe8b1d6a"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E上海新阳\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"188d1823-6754-4a47-9156-aff813403d3f"},"children":[]}]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86); font-size: 14px;\"\u003E电子特气\u003C/span\u003E\u003C/p\u003E","richText":true,"expand":true,"isActive":false,"uid":"a0762b35-db88-4d58-a976-fcf6b79c8831"},"children":[]},{"data":{"text":"\u003Cp\u003E\u003Cspan style=\"font-size: 14px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; color: rgb(30, 53, 86);\"\u003E涂胶显影设备\u003C/span\u003E\u003C/p\u003E","expand":true,"richText":true,"isActive":false,"uid":"bd7e58fc-0363-42a7-b70e-97bf29c3f32e"},"children":[]}]}]},"theme":{"template":"classic4","config":{}},"view":{"transform":{"scaleX":1,"scaleY":1,"shear":0,"rotate":0,"translateX":-355,"translateY":-20,"originX":0,"originY":0,"a":1,"b":0,"c":0,"d":1,"e":-355,"f":-20},"state":{"scale":1,"x":-355,"y":-20,"sx":-355,"sy":-20}}}

const titleIndexData = [
    {
        label: '上',
        themeColor: '#009FFF',
        fontColor: '#084C75',
        title2BgColor: '#54BFFF',
        sectorBgColor: '#D7F0FF',
        sectorFontColor: '#2277A9',
    },
    {
        label: '中',
        themeColor: '#EFBB35',
        fontColor: '#6D4F03',
        title2BgColor: '#FFD977',
        sectorBgColor: '#FFF0C9',
        sectorFontColor: '#BA932D',
    },
    {
        label: '下',
        themeColor: '#0C8B75',
        fontColor: '#023E34',
        title2BgColor: '#25BFA5',
        sectorBgColor: '#D3FFF8',
        sectorFontColor: '#4D8B81',
    },
]

const TOP_NODE_WEIGHT = 546;
const TOP_NODE_HEIGHT = 224;
const LEFT_TEXT_MOVE_DIS = 138;
const SCALE = 1.4;

const GSAPDemo = () => {
    const [duration, setDuration] = useState(0);
    const [timestamp, setTimestamp] = useState(0);
    const [playing, setPlaying] = useState(false);

    /* type: core.Timeline */
    const timeline = useRef();
    const refs =  useRef({});
    const [config, setConfig] = useState({
        width: 0,
        height: 0,
    })

    const [sequence, setSequence] = useState([
        { id: nanoid(), index: 0, duration: 0 },
        { id: nanoid(), index: 1, duration: 0 },
        { id: nanoid(), index: 2, duration: 0 },
    ])

    const [_data, setData] = useState(JSON.stringify({
        // sequence: [1, 2, 3],
        data: [
            {
                title: '基础层',
                children: [
                    {
                        title: '大模型大模型',
                        desc: '描述描述描述描述描述描述描述描述',
                        children: [
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                        ]
                    }
                ]
            },
            {
                title: '技术层',
                children: [
                    {
                        title: '大模型大模型大模型大模型大模型大模型',
                        desc: '描述描述描述描述描述描述描述描述',
                        children: [
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                        ]
                    },
                    {
                        title: '大模型大模型',
                        desc: '描述描述描述描述描述描述描述描述',
                        children: [
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                        ]
                    },
                    {
                        title: '大模型大模型',
                        desc: '描述描述描述描述描述描述描述描述',
                        children: [
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
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
                        desc: '描述描述描述描述描述描述描述描述',
                        children: [
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                        ]
                    },
                    {
                        title: '大模型大模型',
                        desc: '描述描述描述描述描述描述描述描述',
                        children: [
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                        ]
                    },
                    {
                        title: '大模型大模型',
                        desc: '描述描述描述描述描述描述描述描述',
                        children: [
                            {
                                title: '智能计算平台',
                                desc: '描述描述描述描述描述描述描述描述',
                            },
                        ]
                    },
                ]
            },
        ]
    }, null, 2))

    // const demoData = useMemo(() => JSON.parse(_data), [_data]);

    const [data, setUseData] = useState(JSON.parse(_data).data);

    useDebounceEffect(
        () => {
            try {
                setUseData(JSON.parse(_data).data);
            } catch (e) {
                message.error('请输入正确的JSON数据');
            }
        },
        [_data],
        {
            wait: 100,
        },
    );

    const resolutions = [1080, 1920];
    const [scale, setScale] = useState(1);
    const [width, height] = resolutions;

    useEffect(() => {
        const { offsetWidth, offsetHeight } = document.querySelector('.ant-layout-content')
        setConfig({
            width: offsetWidth,
            height: offsetHeight,
        })

        const widthRadio = (offsetWidth - 100) / resolutions[0];
        const heightRadio = (offsetHeight - 150) / resolutions[1];
        setScale(Math.min(widthRadio, heightRadio))
    }, [])

    const createShowTitleTimeLine = (index, reverse = false) => {
        const [width, height] = resolutions;
        const timeline = gsap.timeline();
        const x = (width + LEFT_TEXT_MOVE_DIS) * SCALE;
        let y = 60 + (548 * index);
        if (index === 0 || index === 2) {
            timeline.set(
                refs['contentWrapper'], {
                    transformOrigin: `50% ${height / 2 - (index === 0 ? 548 : -548)}px`
                }
            )
        } else {
            timeline.set(
                refs['contentWrapper'], {
                    transformOrigin: `50% 50%`
                }
            )
        }
        const prefix = reverse ? '+=' : '-=';
        timeline
            .to(refs['contentWrapper'], {
                duration: 0.5,
                x: prefix + x,
                y: prefix + y,
                ease: 'power1.inOut',
            })
            .to(refs['contentWrapper'], {
                duration: 0.5,
                scale: reverse ? 1 : SCALE,
            }, '<')
            .to(data[index].ref, {
                duration: 0.5,
                x: (reverse ? '-=' : '+=') + width,
                ease: 'power1.inOut',
            }, '<')
        return timeline;
    }

    const animeEventArrow = () => {
        const lineEl = refs['eventArrow'].querySelector('#line');
        const arrowEl = refs['eventArrow'].querySelector('#arrow');

        const timeline = gsap.timeline();
        return timeline
            .set(lineEl, { alpha: 1 })
            .set(arrowEl, { alpha: 1 })
            .fromTo(lineEl,
                {
                    drawSVG: false,
                },
                {
                    drawSVG: true,
                    duration: 0.7,
                    ease: 'power1.inOut',
                }
            )
            .to(
                arrowEl,
                {
                    motionPath: {
                        path: lineEl,
                        align: lineEl,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: true,
                    },
                    // reversed: true,
                    duration: 0.7,
                    ease: 'power1.inOut',
                },
                '<'
            );
    }

    const animeNodeArrow = (nodeIndex, diff) => {
        const lineEl = refs[`nodeArrow${nodeIndex}`].querySelector('#line');
        const arrowEl = refs[`nodeArrow${nodeIndex}`].querySelector('#arrow');
        const timeline = gsap.timeline();
        const reversed = diff < 0;

        return timeline
            .set(lineEl, { alpha: 1 })
            .set(arrowEl, { alpha: 1 })
            .fromTo(lineEl,
                {
                    drawSVG: reversed ? '100% 100%' : '0% 0%',
                },
                {
                    drawSVG: '0% 100%',
                    duration: 1,
                    // reversed: diff < 0,
                    ease: 'power1.inOut',
                }
            )
            .to(
                arrowEl,
                {
                    motionPath: {
                        path: lineEl,
                        align: lineEl,
                        alignOrigin: [0.5, 0.5],
                        autoRotate: Math.abs(diff) !== 1,
                    },
                    duration: 1,
                    reversed,
                    ease: 'power1.inOut',
                },
                '<'
            )
    }

    const showSectorList = (index, extraDuration) => {
        const [width, height] = resolutions;
        const timeline = gsap.timeline();
        const titleMoveDis = 200;
        const contentWrapperMoveDis = 600;
        const contentWrapperMoveItemDis = ((94 + 60) * SCALE);

        timeline
            .to(refs['contentWrapper'], {
                duration: 0.5,
                y: `-=${contentWrapperMoveDis}`,
                ease: 'power1.inOut',
            })
            .to(data[index].listRef, {
                duration: 0.5,
                // y: `-=200`,
                height: `+=${Math.ceil(data[index].children.length / 6) * 1200}`,
                ease: 'power1.inOut',
            }, '<')

        const delayTime = extraDuration / data[index].children.length;

        data[index].children.forEach((item, _index) => {
            timeline
                .to(
                    item.ref,
                    {
                        duration: 0.5,
                        y: titleMoveDis,
                    }, '<')
                .fromTo(
                    item.listRef,
                {
                        y: '-100%',
                    },
                {
                        // display: 'flex',
                        duration: 0.5,
                        height: `+=${height * 0.69}`,
                        // alpha: 1,
                        ease: 'power1.inOut',
                    },
                '<'
                )
                .to(item.listRef, {
                    y: 0,
                    ease: 'power1.inOut',
                })

            const maxChildrenLength = 5;
            if (item.children.length > maxChildrenLength) {
                const overflowLength = item.children.length - maxChildrenLength;
                timeline.to(
                    item.listRef,
                    {
                        delay: 0.5,
                        duration: 0.5 * overflowLength,
                        scrollTop: `+=${(overflowLength) * 250}`,
                        ease: 'power1.inOut',
                    }
                )
            }
            timeline.to(
                    item.listRef,
                    {
                        delay: 1.5 + delayTime,
                        duration: 0.5,
                        height: 0,
                        alpha: 0,
                        ease: 'power1.inOut',
                    }
                )
                .to(
                    item.ref,
                    {
                        duration: 0.5,
                        y: 0,
                    }, '<')

                if (_index !== data[index].children.length - 1) {
                    timeline.to(
                        refs['contentWrapper'],
                        {
                            y: `-=${contentWrapperMoveItemDis}`,
                            ease: 'power1.inOut',
                        },
                        '<'
                    )
                }
        })

        timeline
            .to(refs['contentWrapper'], {
                duration: 0.5,
                y: `+=${contentWrapperMoveDis + (contentWrapperMoveItemDis * (data[index].children.length - 1))}`,
                ease: 'power1.inOut',
            }, '<')
            .to(data[index].listRef, {
                duration: 0.5,
                height: `-=${Math.ceil(data[index].children.length / 6) * 1200}`,
                ease: 'power1.inOut',
            }, '<')

        return timeline;
    }

    useGSAP(() => {
        console.log('useGSAP')
        const [width, height] = resolutions;

        timeline.current = gsap.timeline({
            paused: true,
            onUpdate() {
                // console.log(timeline.current)
                setTimestamp(timeline.current.time())
            }
        });

        data.forEach((item, index) => {
            timeline.current.add(
                gsap.to(item.ref, {
                    duration: 0.5,
                    x: 0,
                    alpha: 1,
                    ease: 'power1.inOut',
                })
            )
        })

        timeline.current
            .to(refs['leftText'], {
                duration: 0.5,
                x: 0,
                alpha: 1,
                ease: 'power1.inOut',
            })
            .to(refs['titleWrapper'], {
                duration: 0.5,
                x: LEFT_TEXT_MOVE_DIS,
                ease: 'power1.inOut',
            }, '<')
            .add(animeEventArrow())

        // 展示各顶层节点
        sequence.forEach((item, _index) => {
            const index = item.index;
            const extraDuration = item.duration || 0;
            if (_index !== 0) {
                const prevNodeIndex = sequence[_index - 1].index;
                // const nextNodeIndex = sequence[_index + 1].index;
                const diff = index - prevNodeIndex;
                timeline.current.add(animeNodeArrow(index, diff), '<+1')
            }
            timeline.current
                .add(createShowTitleTimeLine(index))
                .to(data[index].listRef, {
                    duration: 0.7,
                    height: height * 0.43,
                    ease: 'power1.inOut',
                }, '>-0.1')

            const moveItemDis = 155;
            data[index].children.forEach((item, _index) => {
                let position = '+=0'
                if (_index >= 5) {
                    timeline.current.to(data[index].listRef, {
                        duration: 0.5,
                        scrollTop: `+=${moveItemDis}`,
                        ease: 'power1.inOut',
                    })
                    position = '>-0.1'
                }
                timeline.current.fromTo(
                    item.ref,
                    {
                        x: '-100%',
                    },
                    {
                        duration: 0.5,
                        x: 0,
                        ease: 'power1.inOut',
                    },
                    position
                )
            })

            timeline.current.to(data[index].listRef, {
                duration: 0.5,
                scrollTop: 0,
                ease: 'power1.inOut',
            });

            timeline.current.add(showSectorList(index, extraDuration), '+=0.5')

            timeline.current
                .to(data[index].listRef, {
                    duration: 0.3,
                    height: 0,
                    ease: 'power1.inOut',
                }, '+=1')

            timeline.current
                .add(createShowTitleTimeLine(index, true), '<')
                .delay(1);
        })


        // 总结片段
        timeline.current
            .set(
                refs['contentWrapper'],
                {
                    transformOrigin: 'center center'
                }
            )
            .to(refs['contentWrapper'], {
                duration: 0.5,
                scale: 0.8,
                x: '-=200',
                ease: 'power1.inOut',
            }, '+=1')


        timeline.current.addLabel('endTime');
        console.log(999, timestamp, timeline.current.duration(), timeline.current.totalTime(), timeline.current)

        const endTime = timeline.current.labels.endTime;
        timeline.current.seek(Math.min(endTime, timestamp));
        setDuration(endTime);
    }, {
        scope: refs['stage'],
        dependencies: [config, data, sequence],
        revertOnUpdate: true,
    })


    const onChange = (e) => {
        const val = e.target.value;
        setData(val);
    }

    useKeyPress('Space', () => {
        onPlay();
    }, {
        exactMatch: true,
    })

    const onPlay = () => {
        if (playing) {
            timeline.current.pause();
            setPlaying(false);
        } else {
            timeline.current.play();
            setPlaying(true);
        }
    }

    const onReversePlay = () => {
        timeline.current.reverse()
    }

    const onSeek = (timestamp) => {
        console.log(timestamp)
        setTimestamp(timestamp);
        timeline.current.seek(timestamp).pause();
        setPlaying(false);
        // timeline.current.pause();
    }

    const columns = [
        {
            title: 'sort',
            dataIndex: 'sort',
            width: 60,
            editable: false,
            className: 'drag-visible',
        },
        {
            title: 'name',
            dataIndex: 'title',
            editable: false,
            className: 'drag-visible',
            renderText: (_, record, index) => (data[record.index].title)
        },
        {
            title: 'duration (s)',
            dataIndex: 'duration',
            editable: true,
            valueType: 'digit',
            className: 'drag-visible',
            formItemProps: {
                onKeyDown(e) {
                    e.stopPropagation();
                }
            },
        },
        {
            title: '操作',
            valueType: 'option',
            width: 150,
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    edit
                </a>,
            ],
        },
    ];

    const handleDragSortEnd = (
        beforeIndex,
        afterIndex,
        newDataSource,
    ) => {
        console.log('排序后的数据', newDataSource);
        // setDataSource(newDataSource);
        onSeek(0);
        setTimeout(() => {
            setSequence(newDataSource);
        })
        message.success('修改列表排序成功');
    };

    const [localDataList, setLocalDataList] = useLocalStorageState('localDataList', {
        defaultValue: [],
    })

    useEffect(() => {
        if (localDataList.length) {
            onUseData(0);
        }
    }, [])

    const onSaveDataLocally = () => {
        if (localDataList.length >= 10) {
            message.warning('本地缓存只保存最近10条，最旧的数据将被删除')
            localDataList.pop();
        }
        localDataList.unshift({
            id: nanoid(),
            name: 'name',
            data: {
                sequence: cloneDeep(sequence),
                data: _data,
            },
            time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
        setLocalDataList([...localDataList]);
    }

    const onUseData = index => {
        const { data, sequence } = localDataList[index].data;
        setData(data);
        setSequence(cloneDeep(sequence));
    }

    const onDeleteItem = index => {
        localDataList.splice(index, 1);
        setLocalDataList([...localDataList]);
    }

    const createArrow = (type) => {
        switch (type) {
            case 'left':
                return (
                    <path id="arrow" d="M28.256 5 5 28.256l23.256 23.256" style={{ opacity: 0 }} />
                );
            case 'right':
                return (
                    <path id="arrow" d="M5 5 28.256 28.256l-23.256 23.256" style={{ opacity: 0 }} />
                );
            case 'top':
                return (
                    <path id="arrow" d="M5 28.256 28.256 5l23.256 23.256" style={{ opacity: 0 }} />
                );
            case 'bottom':
                return (
                    <path id="arrow" d="M5 5 28.256 28.256l23.256 -23.256" style={{ opacity: 0 }} />
                );
        }
    }

    const arrowList = () => {
        const centerX = width / 2;
        const centerY = height / 2;
        const nodeGutter = 398;
        const moveRightDis = 70;
        return sequence.map((item, index) => {
            if (index === sequence.length - 1) return null;
            const currentIndex = item.index;
            const nextIndex = sequence[index + 1].index;
            const diff = nextIndex - currentIndex;
            if (Math.abs(diff) === 1) {
                const startY = centerY - (nodeGutter + TOP_NODE_HEIGHT / 2);
                return (
                    <g key={nextIndex} ref={ref => refs[`nodeArrow${nextIndex}`] = ref} fill="none" fillRule="evenodd" stroke="#FFF" strokeLinecap="round"
                       strokeLinejoin="round" strokeWidth="10">
                        <path id="line" d={`M${centerX + LEFT_TEXT_MOVE_DIS} ${startY + (index * (398 + TOP_NODE_HEIGHT) + 30)} l0 ${nodeGutter - 60}`} style={{ opacity: 0 }} />
                        {createArrow(diff > 0 ? 'bottom' : 'top')}
                    </g>
                )
            } else if (Math.abs(diff) > 1) {
                return (
                    <g key={nextIndex} ref={ref => refs[`nodeArrow${nextIndex}`] = ref} fill="none" fillRule="evenodd" stroke="#FFF" strokeLinecap="round"
                       strokeLinejoin="round" strokeWidth="10">
                        <path id="line" d={`M${centerX + LEFT_TEXT_MOVE_DIS + (TOP_NODE_WEIGHT / 2) + 20} ${centerY - nodeGutter - TOP_NODE_HEIGHT} l${moveRightDis} 0 v0 ${nodeGutter * 2 + TOP_NODE_HEIGHT * 2} h-${moveRightDis - 10} 0`}  style={{ opacity: 0 }} />
                        {createArrow('right')}
                    </g>
                )
            }
        });
    }

    return (
        <Layout className={styles.container}>
            <Sider width={500} style={{
                padding: 10,
                background: '#fff',
                height: '100%',
                overflowY: 'auto'
            }}>
                <Form layout={'vertical'}>
                    <FormItem label="Sequence">
                        <DragSortTable
                            toolBarRender={false}
                            columns={columns}
                            rowKey="id"
                            search={false}
                            pagination={false}
                            dataSource={sequence}
                            dragSortKey="sort"
                            onDragSortEnd={handleDragSortEnd}
                            editable={{
                                onSave: async (key, record, { index }) => {
                                    console.log(key, record);
                                    sequence[index] = record;
                                    setSequence([...sequence])
                                    // setLocalDataList([...localDataList])
                                    return true;
                                },
                            }}
                        />
                    </FormItem>
                    <FormItem label="Data">
                        <Space direction={'vertical'} style={{width: '100%'}}>
                            <Input.TextArea
                                autoSize={{minRows: 10, maxRows: 30}}
                                value={_data}
                                onChange={onChange}
                                onKeyDown={e => e.stopPropagation()}
                            />
                            <Button block type="primary" onClick={onSaveDataLocally}>Save data locally</Button>
                        </Space>
                        <ProList
                            rowKey="id"
                            headerTitle="本地数据列表"
                            dataSource={localDataList}
                            showActions="hover"
                            editable={{
                                onSave: async (key, record, { index }) => {
                                    console.log(key, record);
                                    localDataList[index] = record;
                                    setLocalDataList([...localDataList])
                                    return true;
                                },
                            }}
                            metas={{
                            title: {
                                dataIndex: 'name',
                                formItemProps: {
                                    onKeyDown(e) {
                                        e.stopPropagation();
                                    }
                                },
                            },
                            subTitle: {
                                dataIndex: 'time',
                                editable: false,
                            },
                            actions: {
                                render: (text, row, index, action) => [
                                    <a
                                        onClick={() => {
                                            action?.startEditable(row.id);
                                        }}
                                        key="edit"
                                    >
                                        edit
                                    </a>,
                                    <a
                                        onClick={() => {
                                            onUseData(index);
                                        }}
                                        key="use"
                                    >
                                        use
                                    </a>,
                                    <a
                                        onClick={() => {
                                            onDeleteItem(index);
                                        }}
                                        key="delete"
                                    >
                                        delete
                                    </a>,
                                ],
                            },
                        }}
                            />
                    </FormItem>
                </Form>
            </Sider>
            <Layout>
                <Content style={{position: 'relative'}}>
                    <div className={styles.stage} style={{
                        transform: `translate(-50%, -50%) scale(${scale})`,
                        width: `${resolutions[0]}px`,
                        height: `${resolutions[1]}px`
                    }}>
                        <div className={styles.resolutions} style={{transform: `translateY(-100%) scale(${1})`}}>1080 x
                            1920
                        </div>
                        <div className={styles.stageBorder} style={{transform: `scale(${1})`}}></div>

                        <div ref={ref => refs['stage'] = ref} className={styles.stageContent} style={{fontSize: `${resolutions[1] / 10}px`}}>
                            <div ref={ref => refs['contentWrapper'] = ref} className={styles.contentWrapper}>
                                <canvas ref={ref => refs['canvas'] = ref} style={{ position: 'absolute', top: 0, left: 0, width: resolutions[0] + 'px', height: resolutions[1] + 'px' }} />
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, width: resolutions[0] + 'px', height: resolutions[1] + 'px' }}>
                                    <g ref={ref => refs['eventArrow'] = ref} fill="none" fillRule="evenodd"
                                       stroke="#FFF" strokeLinecap="round"
                                       strokeLinejoin="round" strokeWidth="10">
                                        <path id="line" d={`M257 ${height / 2}h126`} style={{ opacity: 0 }} />
                                        <path id="arrow" d="M5 5 28.256 28.256l-23.256 23.256" style={{ opacity: 0 }} />
                                    </g>
                                    {
                                        arrowList()
                                    }
                                </svg>
                                <div ref={ref => refs['leftText'] = ref} className={styles.leftText}>
                                    <div className={styles.leftTextContent}>百模大战</div>
                                </div>
                                <div ref={ref => refs['titleWrapper'] = ref} className={styles.titleWrapper}>
                                    {
                                        data.map((item, index) => {
                                            return (
                                                <>
                                                    <div key={index} ref={ref => item.ref = ref}
                                                         className={styles.title}
                                                         style={{
                                                             '--color': titleIndexData[index].themeColor,
                                                             '--font-color': titleIndexData[index].fontColor,
                                                             '--title2-bg-color': titleIndexData[index].title2BgColor,
                                                             '--sector-bg-color': titleIndexData[index].sectorBgColor,
                                                             '--sector-font-color': titleIndexData[index].sectorFontColor,
                                                         }}>
                                                        <div ref={ref => item.titleRef = ref}
                                                             className={styles.titleContent + ' ' + (item.title.length > 10 ? styles.titleContentMinFs : (item.title.length > 5 ? styles.titleContentMiddleFs : styles.titleContentMaxFs))}>
                                                            <div
                                                                className={styles.titleIndex}>{titleIndexData[index].label}</div>
                                                            <div className={styles.titleContentNode}>{item.title}</div>
                                                        </div>
                                                        <div ref={ref => item.listRef = ref}
                                                             className={styles.listWrapper}>
                                                            {
                                                                item.children.map((child, childIndex) => {
                                                                    return (
                                                                        <div key={childIndex}
                                                                             ref={ref => child.ref = ref}
                                                                             className={styles.listItem}
                                                                             style={{transform: `scale(${1 / SCALE})`}}
                                                                        >
                                                                            <div
                                                                                className={styles.listItemTitle}>
                                                                                {child.title}
                                                                                <div className={styles.listItemDesc}>
                                                                                    {child.desc}
                                                                                </div>
                                                                            </div>
                                                                            <div style={{overflow: 'hidden'}}>
                                                                                <div ref={ref => child.listRef = ref}
                                                                                     className={styles.listItemContent}>
                                                                                    {
                                                                                        child.children.map((grandson, grandsonIndex) => {
                                                                                            return (
                                                                                                <div
                                                                                                    key={grandsonIndex}
                                                                                                    className={styles.sectorWrapper}>
                                                                                                    <div
                                                                                                        className={styles.sectorPositive}>间接利好
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className={styles.sectorTitle}>{grandson.title}</div>
                                                                                                    <div
                                                                                                        className={styles.sectorDesc}>{grandson.desc}
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
                <Layout.Footer>
                    <Row>
                        <Col span={24}>
                            <Slider step={0.1} min={0} max={duration} value={timestamp} onChange={onSeek}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Button icon={playing ? <PauseOutlined /> : <CaretRightFilled />} type="text" size="large" onClick={onPlay}></Button>
                        </Col>
                    </Row>
                </Layout.Footer>
            </Layout>
        </Layout>
    )
}

export default GSAPDemo;