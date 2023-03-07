import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../api";
import {
    play,
    pushListenHistory,
    repeat,
    setCurrentSongInfo,
    shuffle,
} from "../store/actions";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    HighVolumeIcon,
    MuteVolumeIcon,
    NextIcon,
    PauseIcon,
    PlayerPlaylistIcon,
    PlayIcon,
    PrevIcon,
    RepeatIcon,
    ShuffleIcon,
    SpinerIcon,
} from "../ultis/icons";
import { setCurrentSong } from "../store/actions";
import { muteVolume, setCurrentVolume } from "../store/actions/volume";
import LeftPlayer from "./LeftPlayer";
import { setLoaded } from "../store/actions/load";
var intervalId;
const Player = ({ setShowSidebar }) => {
    const [songInfo, setSongInfo] = useState();
    const [audio, setAudio] = useState(new Audio());
    const [currentTime, setCurrentTime] = useState(0);
    const [isFirst, setIsFirst] = useState(false);
    const [isLast, setIsLast] = useState(false);
    const [isError, setIsError] = useState(false);
    const [firstAccess, setFirstAccess] = useState(true);
    const {width} = useSelector((state) => state.app);
    const [err, setErr] = useState();
    const thumbRef = useRef();
    const trackRef = useRef();
    const volumeTrackRef = useRef();
    const volumeThumbRef = useRef();
    const dispatch = useDispatch();
    const playlist = useSelector(
        (state) => state.storagesong?.playlistData?.songs
    );
    const songId = useSelector((state) => state.storagesong.currentSongId);
    const { isPlaying } = useSelector((state) => state.isPlaying);
    const [isLoaded, setIsLoaded] = useState(true);
    const volumeSelector = useSelector((state) => state.storagevolume.volume);
    const volumeBeforeMuteSelector = useSelector(
        (state) => state.storagevolume.volumeBeforeMute
    );
    const isRepeat = useSelector((state) => state.storageRepeat.isRepeat);
    const isShuffle = useSelector((state) => state.storageRepeat.isShuffle);
    const formatTime = (time) => {
        if (time && !isNaN(time)) {
            const mins = Math.floor(time / 60);
            const secs =
                Math.floor(time % 60) < 10
                    ? `0${Math.floor(time % 60)}`
                    : Math.floor(time % 60);
            return `${mins}:${secs}`;
        }
        return `0:00`;
    };
    function Toast(msg) {
        return toast.warn(msg);
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsLoaded(false);
            dispatch(setLoaded(false));
            const [res, res2] = await Promise.all([
                apis.apigetDetailSong(songId),
                apis.apiGetSong(songId),
            ]);
            if (res.data.err === 0) {
                setSongInfo(res.data.data);
                dispatch(setCurrentSongInfo(res.data.data));
                dispatch(pushListenHistory(res.data.data));
                setIsError(false);
            }
            if (res2.data.err === 0) {
                audio.pause();
                setAudio(new Audio(res2.data.data["128"]));
                setIsError(false);
            } else {
                setAudio(new Audio());
                dispatch(play(false));
                audio.pause();
                Toast(res2.data.msg);
                setCurrentTime(0);
                thumbRef.current.style.cssText = `right: 100%`;
                setIsError(true);
                setErr(res2.data.msg);
            }
            setIsLoaded(true);
            dispatch(setLoaded(true));
        };
        fetchData();
    }, [songId]);

    useEffect(() => {
        intervalId && clearInterval(intervalId);
        audio.pause();
        audio.load();
        audio.currentTime = currentTime;
        if (isPlaying) {
            audio.play();
            intervalId = setInterval(() => {
                setCurrentTime(audio?.currentTime);
                let percent =
                    Math.round(
                        (audio.currentTime * 10000) / songInfo.duration
                    ) / 100;
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;
            }, 500);
        }
    }, [audio, isPlaying]);
    const handleTogglePlay = () => {
        if (!isError) {
            if (isPlaying) {
                audio.pause();
                dispatch(play(false));
            } else {
                audio.play();
                dispatch(play(true));
            }
        } else Toast(err);
    };
    useEffect(() => {
        if (isPlaying && !isError) {
            if (isLoaded) audio.play();
            else audio.load();
        } else {
            dispatch(play(false));
            audio.pause();
        }
    }, [isPlaying, isLoaded]);

    useEffect(() => {
        audio.volume = volumeSelector / 100;
    }, [volumeSelector]);

    useEffect(() => {
        if (currentTime === audio.duration) {
            if (isRepeat) {
                setCurrentTime(0);
                audio.load();
                audio.play();
            } else handleNextSong();
        }
    }, [currentTime]);

    useEffect(() => {
        if (playlist) {
            let currentSongIndex;
            for (let i = 0; i < playlist.length; i++) {
                if (playlist[i].encodeId === songId) {
                    currentSongIndex = i;
                    break;
                }
            }
            if (currentSongIndex === 0) setIsFirst(true);
            else setIsFirst(false);
            if (currentSongIndex === playlist.length - 1) setIsLast(true);
            else setIsLast(false);
        } else {
            setIsFirst(true);
            setIsLast(true);
        }
    }, [audio]);
    const handleSetProgress = (e) => {
        const trackReact = trackRef.current.getBoundingClientRect();
        const percent = Math.round(
            ((e.clientX - trackReact.left) / trackReact.width) * 100
        );
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        audio.currentTime = (percent * audio.duration) / 100;
        setCurrentTime((percent * audio.duration) / 100);
    };
    const handleSetVolume = (e) => {
        const trackReact = volumeTrackRef.current.getBoundingClientRect();
        const percent = Math.abs(
            Math.round(((e.clientX - trackReact.left) / trackReact.width) * 100)
        );
        volumeThumbRef.current.style.cssText = `right: ${100 - percent}%`;
        if (percent === 0) dispatch(muteVolume(10));
        dispatch(setCurrentVolume(percent));
    };

    const handleMute = () => {
        dispatch(muteVolume(volumeSelector));
        dispatch(setCurrentVolume(0));
    };
    const handleUnMute = () => {
        dispatch(setCurrentVolume(volumeBeforeMuteSelector));
        dispatch(muteVolume(0));
    };

    const handlePrevSong = () => {
        if (isLoaded) {
            if (!isShuffle) {
                if (playlist && !isFirst) {
                    let currentSongIndex;
                    for (let i = 0; i < playlist.length; i++) {
                        if (playlist[i].encodeId === songId) {
                            currentSongIndex = i;
                            break;
                        }
                    }
                    dispatch(
                        setCurrentSong(playlist[currentSongIndex - 1].encodeId)
                    );
                    dispatch(play(true));
                }
            } else {
                let currentSongIndex = Math.floor(
                    Math.random() * playlist.length
                );
                dispatch(setCurrentSong(playlist[currentSongIndex].encodeId));
                dispatch(play(true));
            }
        }
    };
    const handleNextSong = () => {
        if (isLoaded) {
            if (!isShuffle) {
                if (playlist && !isLast) {
                    let currentSongIndex;
                    for (let i = 0; i < playlist.length; i++) {
                        if (playlist[i].encodeId === songId) {
                            currentSongIndex = i;
                            break;
                        }
                    }
                    dispatch(
                        setCurrentSong(playlist[currentSongIndex + 1].encodeId)
                    );
                    dispatch(play(true));
                } else {
                    dispatch(play(false));
                    setCurrentTime(0);
                }
            } else {
                let currentSongIndex = Math.floor(
                    Math.random() * playlist.length
                );
                dispatch(setCurrentSong(playlist[currentSongIndex].encodeId));
                dispatch(play(true));
            }
        }
    };
    return (
        <div className={`h-full bg-main-400 flex items-center ${width >700 ? " px-5" : "px-1"}`}>
            <LeftPlayer songInfo={songInfo} isLoaded={isLoaded} />
            <div className=" w-[40%] flex-auto mx-[10px]">
                <div className="flex justify-center items-center flex-col gap-1">
                    <div className={` flex justify-center items-center ${width < 500 ? "gap-2" : "gap-4"}`}>
                        <div className="w-[30px] h-[30px] px-[3px] py-[3px] cursor-pointer">
                            <ShuffleIcon
                                className={`w-full h-full ${
                                    isShuffle
                                        ? "text-[#0f7070]"
                                        : "text-[#32323d]"
                                } ${
                                    !playlist &&
                                    "text-[rgba(20,20,20,0.4)] cursor-not-allowed"
                                }`}
                                onClick={() =>
                                    isShuffle
                                        ? dispatch(shuffle(false))
                                        : dispatch(shuffle(true))
                                }
                                size={16}
                            />
                        </div>
                        <div
                            className={`w-[30px] h-[30px] px-[3px] py-[3px] cursor-pointer`}
                        >
                            <PrevIcon
                                onClick={handlePrevSong}
                                className={`w-full h-full ${
                                    isFirst &&
                                    "text-[rgba(20,20,20,0.4)] cursor-not-allowed"
                                }`}
                                size={16}
                            />
                        </div>

                        {!isLoaded ? (
                            <div className="w-[36px] h-[36px] p-1 cursor-pointer rounded-full border-[1px] border-black hover:text-[#0e8080] hover:border-[#0e8080] flex justify-center items-center  ">
                                <SpinerIcon className="animate-spin" />
                            </div>
                        ) : isPlaying ? (
                            <div
                                onClick={handleTogglePlay}
                                className="w-[36px] h-[36px] p-1 cursor-pointer rounded-full border-[1px] border-black hover:text-[#0e8080] hover:border-[#0e8080] flex justify-center items-center  "
                            >
                                <PauseIcon className="w-8 h-8  " size={16} />
                            </div>
                        ) : (
                            <div
                                onClick={handleTogglePlay}
                                className="w-[36px] h-[36px] p-1 cursor-pointer rounded-full border-[1px] border-black hover:text-[#0e8080] hover:border-[#0e8080] flex justify-center items-center  "
                            >
                                <PlayIcon
                                    className={`w-8 h-8 ${
                                        isError &&
                                        "cursor-not-allowed text-[rgba(20,20,20,0.4)]"
                                    }`}
                                    size={16}
                                />
                            </div>
                        )}

                        <div className="w-[30px] h-[30px] px-[3px] py-[3px] cursor-pointer">
                            <NextIcon
                                onClick={handleNextSong}
                                className={`w-full h-full ${
                                    isLast &&
                                    "text-[rgba(20,20,20,0.4)] cursor-not-allowed"
                                }`}
                                size={16}
                            />
                        </div>
                        <div
                            title="Bật phát lại tất cả"
                            className="w-[30px] h-[30px] px-[3px] py-[3px] cursor-pointer"
                        >
                            <RepeatIcon
                                onClick={() =>
                                    isRepeat
                                        ? dispatch(repeat(false))
                                        : dispatch(repeat(true))
                                }
                                className={`w-full h-full ${
                                    isRepeat
                                        ? "text-[#0f7070]"
                                        : "text-[#32323d]"
                                }`}
                                size={16}
                            />
                        </div>
                    </div>
                    <div className="w-full  flex items-center gap-2 justify-center">
                        <span className="text-[#8a999d] text-[14px]">
                            {formatTime(currentTime)}
                        </span>
                        <div
                            ref={trackRef}
                            onClick={handleSetProgress}
                            className="w-5/6 h-[3px] bg-[rgba(0,0,0,0.1)] hover:h-[8px] cursor-pointer relative rounded-l-full rounded-r-full"
                        >
                            <div
                                ref={thumbRef}
                                className="absolute top-0 left-0 bottom-0 bg-[#0e8080] rounded-l-full rounded-r-full"
                            ></div>
                        </div>
                        <span className="text-[#8a999d] text-[14px]">
                            {songInfo?.duration &&
                                formatTime(songInfo.duration)}
                        </span>
                    </div>
                </div>
            </div>

            <div className={`w-[30%] flex-auto flex items-center justify-end gap-3 ${width <700 && "hidden"}`}>
                <div className="w-[30px] h-[30px] p-1 ">
                    {volumeSelector ? (
                        <HighVolumeIcon
                            onClick={handleMute}
                            size={20}
                            className="cursor-pointer"
                        />
                    ) : (
                        <MuteVolumeIcon
                            onClick={handleUnMute}
                            size={20}
                            className="cursor-pointer"
                        />
                    )}
                </div>
                <div
                    ref={volumeTrackRef}
                    onClick={handleSetVolume}
                    className="w-[70px]  h-[3px] bg-[rgba(0,0,0,0.1)] hover:h-[8px] cursor-pointer relative rounded-l-full rounded-r-full"
                >
                    <div
                        style={{ right: `${100 - volumeSelector}%` }}
                        ref={volumeThumbRef}
                        className={`absolute top-0 left-0 bottom-0 bg-[#0e8080] rounded-l-full rounded-r-full`}
                    >
                        {/* <span class="w-4 h-4 bg-red absolute pin-r pin-b -mb-1 rounded-full shadow"></span> */}
                    </div>
                </div>
            </div>
            <div className={`h-[33px] w-[1px] mx-5 bg-[rgba(0,0,0,0.05)] ${width < 700 && "hidden"}`}></div>
            <div className={`w-[30px] h-[30px] p-2 bg-[hsla(0,0%,100%,.1)] `}>
                <PlayerPlaylistIcon
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setShowSidebar((prev) => !prev)}
                />
            </div>

            <ToastContainer />
        </div>
    );
};

export default Player;
