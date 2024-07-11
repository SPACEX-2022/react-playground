import {useRef, useState} from "react";
import {Button, Col, Row} from "antd";
import {useLatest, useSetState} from "ahooks";

const AudioTest = () => {

    const [playing, setPlaying] = useState(false);
    const latestPlaying = useLatest(playing);
    const startTime = useRef(0);
    const [time, setTime] = useSetState({
        audioTime: 0,
        timestamp: 0,
    });
    const audioRef = useRef(null);

    const onPlay = () => {
        const play = () => {
            if (latestPlaying.current) {
                setTime({
                    audioTime: audioRef.current.currentTime * 1000,
                    timestamp: Date.now() - startTime.current,
                });
                requestAnimationFrame(play);
            }
        }
        if (playing) {
            setPlaying(false);
            audioRef.current.pause();
        } else {
            setPlaying(true);
            startTime.current = Date.now();
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            Promise.resolve().then(() => {
                play();
            })
        }
    }

    const pause = () => {
        setPlaying(false);
    }

    return (
        <div>
            <audio ref={audioRef} src="https://dl-ivhmedia-1314522657.cos.ap-shanghai.myqcloud.com/1195257980094619219.mp3" onEnded={pause} onPlaying={() => {
                console.log('onPlaying', audioRef.current.currentTime);
            }} onWaiting={() => {
                console.log('onWaiting', audioRef.current.currentTime);

            }}></audio>
            <div>
                audioTime: { time.audioTime }
            </div>
            <div>
                timestamp: { time.timestamp }
            </div>
            <div>
                diff: { time.timestamp - time.audioTime }
            </div>
            <Button onClick={onPlay}>Play</Button>
        </div>
    )
}

export default AudioTest;