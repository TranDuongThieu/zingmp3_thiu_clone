import React from "react";
// import { Audio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
    play,
    setCurrentSong,
    setPlaylist,
    setPlaylistId,
} from "../store/actions";
import {
    AudioGif,
    PlayIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from "../ultis/icons";
const Playlist = ({
    song,
    pid,
    newReleasePage,
    index,
    rak,
    playlistTitle,
    playlist,
}) => {
    const dispatch = useDispatch();
    const { isPlaying } = useSelector((state) => state.isPlaying);
    const { currentSongId } = useSelector((state) => state.storagesong);
    const load = useSelector((state) => state.load.loaded);
    const FormatDuration = (num) => {
        if (num < 3600) {
            let min = Math.floor(num / 60);
            let sec = num % 60;
            if (min < 10) min = "0" + min;
            if (sec < 10) sec = "0" + sec;
            return min + ":" + sec;
        } else {
            let h = Math.floor(num / 3600);
            num %= 3600;
            let min = Math.floor(num / 60);
            let sec = num % 60;
            if (h < 10) h = "0" + h;
            if (min < 10) min = "0" + min;
            if (sec < 10) sec = "0" + sec;
            return h + ":" + min + ":" + sec;
        }
    };
    const format = (text) => {
        return text?.length > 30 ? text?.slice(0, 27) + "..." : text;
    };
    return (
        <div
            className={`p-[10px] group flex items-center relative group border-b-[1px] border-b-[rgba(0,0,0,0.05)] mb-[1px] rounded-md gap-2 hover:bg-[hsla(0,0%,100%,0.3)] ${
                song.encodeId === currentSongId && "bg-[hsla(0,0%,100%,0.3)]"
            }`}
        >
            {newReleasePage && (
                <div className="min-w-[60px] flex items-center justify-between cursor-default">
                    <div
                        className={`text-[32px] font-sans font-bold justify-center ${
                            index === 1
                                ? "text-[#4a90e2]"
                                : index === 2
                                ? "text-[#50e3c2]"
                                : index === 3
                                ? "text-[#e35050]"
                                : "text-[#32323d]"
                        }`}
                    >
                        {index}
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                        {rak > 0 ? (
                            <div className="text-[#1dc186] ">
                                <TriangleUpIcon size={22} />
                            </div>
                        ) : (
                            <div className="text-[#e35050]">
                                <TriangleDownIcon size={22} />
                            </div>
                        )}
                        <div>{Math.abs(rak)}</div>
                    </div>
                </div>
            )}
            <div className="w-[50%] flex gap-2">
                <div className="relative">
                    <img
                        src={song?.thumbnail}
                        alt=""
                        className="w-[40px] h-[40px] rounded-md flex-none"
                    />
                    <div className="flex-auto  flex-col justify-center cursor-pointer ">
                        <div
                            className={`w-10 h-10  rounded-[5px] absolute top-0 left-0 group-hover:flex bg-[rgba(0,0,0,0.5)] justify-center items-center ${
                                song.encodeId === currentSongId
                                    ? "flex "
                                    : "hidden "
                            }`}
                        >
                            {!isPlaying ? (
                                <PlayIcon
                                    onClick={() => {
                                        if (load) {
                                            dispatch(
                                                setCurrentSong(song?.encodeId)
                                            );
                                            dispatch(play(true));
                                            dispatch(setPlaylistId(pid));
                                            dispatch(
                                                setPlaylist({
                                                    title: playlistTitle,
                                                    songs: playlist,
                                                })
                                            );
                                        }
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
                                        if (load) {
                                            dispatch(
                                                setCurrentSong(song?.encodeId)
                                            );
                                            dispatch(play(true));
                                            dispatch(setPlaylistId(pid));
                                            dispatch(
                                                setPlaylist({
                                                    title: playlistTitle,
                                                    songs: playlist,
                                                })
                                            );
                                        }
                                    }}
                                    size={32}
                                    className="text-white  border-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="truncate cursor-default">
                    <div className="text-[14px] font-medium truncate">
                        {format(song?.title)}
                    </div>
                    <div className="text-[12px] truncate">
                        {format(song?.artistsNames)}
                    </div>
                </div>
            </div>
            <div className="flex-1 max-w-[400px] text-[12px] truncate text-[rgba(50,50,61,0.5)]">
                {format(song?.album?.title)}
            </div>
            <div className="absolute right-2 text-[12px] cursor-default text-[rgba(50,50,61,0.5)]">
                {FormatDuration(song?.duration)}
            </div>
        </div>
    );
};

export default Playlist;
