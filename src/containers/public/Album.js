import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import * as apis from "../../api";
import { SongInPlaylist } from "../../components";
import AlbumArtists from "../../components/album/AlbumArtists";
import {
    play,
    setCurrentSong,
    setPlaylist,
    setPlaylistId,
} from "../../store/actions";
import {
    ArrangeIcon,
    HeartIcon,
    Loading,
    MoreIcon,
    PauseIcon,
    PlayIcon,
} from "../../ultis/icons";
import "./scrollbar/scrollbar-settings.css";

const Album = () => {
    const location = useLocation();
    const { pid } = useParams();
    const playlistIdStorage = useSelector(
        (state) => state.storagesong.playlistId
    );
    const [playlistData, setPlaylistData] = useState("");
    const dispatch = useDispatch();
    const { isPlaying } = useSelector((state) => state.isPlaying);
    const [isLoaded, setIsLoaded] = useState(false);
    const { width } = useSelector((state) => state.app);
    const AudioGif = () => (
        <Audio
            height="30"
            width="30"
            color="white"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    );
    useEffect(() => {
        function handleBeforeUnload(e) {
            e.preventDefault();
            dispatch(play(false));
        }

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const fetchPlaylistData = async () => {
            setIsLoaded(false);
            const res = await apis.apiGetPlaylist(pid);
            if (res.data.err === 0) {
                setPlaylistData(res.data.data);
            }
            setIsLoaded(true);
        };
        fetchPlaylistData();
    }, [pid]);
    useEffect(() => {
        if (location?.state?.playAlbum) {
            const randomSong =
                Math.round(Math.random() * playlistData?.song?.items?.length) -
                1;
            dispatch(
                setCurrentSong(playlistData?.song?.items[randomSong]?.encodeId)
            );
            dispatch(
                setPlaylist({
                    title: playlistData?.title,
                    songs: playlistData?.song?.items,
                })
            );
            dispatch(play(true));
            // const newState = { ...location.state, playAlbum: false };
            // navigate(location.pathname, { state: newState });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pid, playlistData]);
    const FormatDuration = (num) => {
        if (num < 3600) {
            let min = Math.floor(num / 60);
            return min + " phút";
        } else {
            let h = Math.floor(num / 3600);
            num %= 3600;
            let min = Math.floor(num / 60);
            return h + " giờ " + min + " phút";
        }
    };
    return (
        <div className="w-full flex justify-center pt-8">
            {isLoaded ? (
                <div
                    className={`justify-center w-full h-full max-w-[1442px] flex flex-col pt-5  mb-[200px] ${
                        width > 700 ? "px-[59px]" : "px-3"
                    }`}
                >
                    <div
                        className={` mb-[30px] ${
                            width > 1200
                                ? "flex h-[550px] gap-8"
                                : "flex-col gap-8"
                        }`}
                    >
                        <div
                            className={`${
                                width > 1200
                                    ? "flex flex-col flex-none  gap-1 h-full max-w-[300px]"
                                    : "flex flex-none  gap-5 h-full items-center mb-8"
                            }`}
                        >
                            <div className="relative ">
                                <div
                                    className={`relative text-center overflow-hidden shadow-black rounded-[8px]  group ${
                                        isPlaying
                                            ? "rounded-full animate-rotate-center "
                                            : "rounded-[8px] animate-rotate-center-pause"
                                    } ${
                                        width > 700
                                            ? " h-[300px] w-[300px]"
                                            : width > 400
                                            ? "h-[200px] w-[200px]"
                                            : "h-[150px] w-[150px]"
                                    }`}
                                >
                                    <img
                                        src={playlistData.thumbnailM}
                                        alt=""
                                        className={`w-full h-full  group-hover:scale-110 transition duration-700`}
                                    />
                                    {!isPlaying ? (
                                        <div
                                            onClick={() => {
                                                if (pid !== playlistIdStorage) {
                                                    const random =
                                                        Math.round(
                                                            Math.random() *
                                                                playlistData
                                                                    ?.song
                                                                    ?.items
                                                                    .length
                                                        ) - 1;
                                                    dispatch(
                                                        setCurrentSong(
                                                            playlistData.song
                                                                .items[random]
                                                                .encodeId
                                                        )
                                                    );
                                                    dispatch(
                                                        setPlaylistId(pid)
                                                    );
                                                    dispatch(
                                                        setPlaylist({
                                                            title: playlistData?.title,
                                                            songs: playlistData
                                                                ?.song?.items,
                                                        })
                                                    );
                                                    dispatch(play(true));
                                                } else dispatch(play(true));
                                            }}
                                            className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] z-10 cursor-pointer hidden group-hover:block "
                                        >
                                            <PlayIcon className="text-white w-[45px] h-[45px] rounded-[99px] border-white border-[1px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() =>
                                                dispatch(play(false))
                                            }
                                            className="p-[10px] cursor-pointer border-[1px] border-white rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                        >
                                            <AudioGif />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                {playlistData && (
                                    <div
                                        className={`text-[13px] text-[#696969] font-sans flex flex-col ${
                                            width > 1200
                                                ? "items-center"
                                                : "items-start"
                                        }`}
                                    >
                                        <h3 className="text-[20px] font-bold text-black text-start">
                                            {playlistData.title}
                                        </h3>
                                        <div className="flex gap-1">
                                            <span>Cập nhật: </span>
                                            <span>
                                                {moment
                                                    .unix(
                                                        playlistData.contentLastUpdate
                                                    )
                                                    .format("DD/MM/YYYY")}
                                            </span>
                                        </div>
                                        <div className="text-start">
                                            {playlistData.artistsNames}
                                        </div>
                                        <div className="flex gap-1">
                                            <span>{playlistData.like}</span>{" "}
                                            <span>người yêu thích</span>
                                        </div>
                                        <div className="text-[14px] cursor-pointer hover:bg-[#0d7373]  my-5 items-center justify-center px-6 py-[9px] rounded-[999px] bg-main-500 text-white">
                                            {isPlaying ? (
                                                <div
                                                    onClick={() => {
                                                        dispatch(play(false));
                                                    }}
                                                    className="flex gap-[5px] justify-center items-center"
                                                >
                                                    <PauseIcon className="w-[20px] h-[20px]" />
                                                    {width > 400 && (
                                                        <span>TẠM DỪNG</span>
                                                    )}
                                                </div>
                                            ) : playlistIdStorage !== pid ? (
                                                <div
                                                    onClick={() => {
                                                        dispatch(
                                                            setCurrentSong(
                                                                playlistData
                                                                    .song
                                                                    .items[0]
                                                                    .encodeId
                                                            )
                                                        );
                                                        dispatch(
                                                            setPlaylistId(pid)
                                                        );
                                                        dispatch(play(true));
                                                        dispatch(
                                                            setPlaylist({
                                                                title: playlistData?.title,
                                                                songs: playlistData
                                                                    ?.song
                                                                    ?.items,
                                                            })
                                                        );
                                                    }}
                                                    className="flex gap-[5px] justify-center items-center"
                                                >
                                                    <PlayIcon className="w-[20px] h-[20px]" />
                                                    {width > 400 && (
                                                        <span>PHÁT TẤT CẢ</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => {
                                                        dispatch(play(true));
                                                    }}
                                                    className="flex gap-[5px] justify-center items-center"
                                                >
                                                    <PlayIcon className="w-[20px] h-[20px]" />
                                                    {width > 400 && (
                                                        <span>
                                                            TIẾP TỤC PHÁT
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        {width > 700 && (
                                            <div className="flex gap-[10px]">
                                                <div className="p-[7px] bg-main-200 rounded-[999px] text-black">
                                                    {" "}
                                                    <HeartIcon size={20} />
                                                </div>
                                                <div className="p-[7px] bg-main-200 rounded-[999px] text-black">
                                                    <MoreIcon size={20} />{" "}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        {playlistData && (
                            <div className="text-[14px] font-sans flex flex-col gap-[5px] h-full w-full scrollbar-settings-album overflow-auto ">
                                <div>
                                    <span className="text-[#696969] mr-1">
                                        Lời tựa
                                    </span>
                                    <span>
                                        {playlistData.description.length <
                                        240 ? (
                                            playlistData.description
                                        ) : (
                                            <span>
                                                {playlistData.description.slice(
                                                    0,
                                                    240
                                                )}{" "}
                                                <span className="text-[#0f7070] font-semibold cursor-pointer">
                                                    ...XEM THÊM
                                                </span>
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <div className="flex flex-col w-full mb-[10px] text-[13px] ">
                                    <div className="flex text-[#696969] p-[10px] justify-between border-b-[1px] border-b-[rgba(0,0,0,0.05)]">
                                        <div className="flex gap-4 items-center  w-[50%]">
                                            <ArrangeIcon className="w-4 h-4 p-[2px] border-[rgba(50,50,61,0.5)] border-[1px] rounded-[3px]" />
                                            <span>BÀI HÁT</span>
                                        </div>
                                        {width > 700 && (
                                            <div className="flex-1 mx-10">
                                                ALBUM
                                            </div>
                                        )}
                                        <div>THỜI GIAN</div>
                                    </div>
                                    <div className="">
                                        {playlistData.song.items.map((item) => (
                                            <SongInPlaylist
                                                key={item.encodeId}
                                                song={item}
                                                pid={pid}
                                                playlistTitle={
                                                    playlistData.title
                                                }
                                                playlist={
                                                    playlistData?.song?.items
                                                }
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-[10px] text-[#696969]">
                                        <span>
                                            {playlistData.song.total} bài hát
                                        </span>
                                        <span className="mx-[10px]">•</span>
                                        <span>
                                            {FormatDuration(
                                                playlistData.song.totalDuration
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <AlbumArtists artists={playlistData?.artists} />
                </div>
            ) : (
                <div>
                    {" "}
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default Album;
