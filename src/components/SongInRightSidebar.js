import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../api";
import { play, setCurrentSong, setPlaylist } from "../store/actions";
import { AudioGif, PlayIcon } from "../ultis/icons";
const SongInRightSidebar = ({ song , playlistTitle, playlist}) => {
    const dispatch = useDispatch();
    const { isPlaying } = useSelector((state) => state.isPlaying);
    const currentSongId = useSelector(
        (state) => state.storagesong.currentSongId
    );
    return (
        <div className="">
            {song ? (
                <div
                    className={`cursor-pointer group flex items-center w-full p-2 rounded-md  ${
                        song.encodeId === currentSongId
                            ? "bg-main-500"
                            : "bg-[rgba(255,255,255,0.07)] hover:bg-[hsla(0,0%,100%,.2)]"
                    }`}
                >
                    <div className="relative w-[40px] h-[40px] mr-[10px] flex-none">
                        <img
                            src={song.thumbnail}
                            alt=""
                            className="w-full h-full rounded-md"
                        />
                        <div
                            className={`rounded-[5px] absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] justify-center items-center ${
                                song.encodeId === currentSongId
                                    ? "flex"
                                    : "hidden"
                            } group-hover:flex`}
                        >
                            {!isPlaying ? (
                                <PlayIcon
                                    onClick={() => {
                                        dispatch(setCurrentSong(song.encodeId));
                                        dispatch(play(true));
                                    }}
                                    size={32}
                                    className="text-white  border-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                />
                            ) : song.encodeId === currentSongId ? (
                                <div onClick={() => dispatch(play(false))}>
                                    <AudioGif />
                                </div>
                            ) : (
                                <PlayIcon
                                    onClick={() => {
                                        dispatch(setCurrentSong(song.encodeId));
                                        dispatch(play(true));
                                    }}
                                    size={32}
                                    className="text-white  border-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center  flex-auto">
                        <span
                            className={`text-[14px] font-semibold truncate w-3/5 ${
                                song.encodeId === currentSongId
                                    ? "text-white"
                                    : "text-[#32323d]"
                            }`}
                        >
                            {song.title}
                        </span>
                        <span
                            className={`text-[12px]  ${
                                song.encodeId === currentSongId
                                    ? "text-[hsla(0,0%,100%,.5)]"
                                    : "text-[#696969]"
                            }`}
                        >
                            {song.artistsNames}
                        </span>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default SongInRightSidebar;
