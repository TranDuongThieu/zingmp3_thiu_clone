import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    play,
    setCurrentSong,
    setPlaylist,
    setPlaylistId,
} from "../../store/actions";
import {
    AudioGif,
    HeartIcon,
    MicroIcon,
    MoreIcon,
    MusicIcon,
    PlayIcon,
} from "../../ultis/icons";
const SearchSong = ({ song, pid, playlistTitle, playlist }) => {
    const { isPlaying } = useSelector((state) => state.isPlaying);
    const { currentSongId } = useSelector((state) => state.storagesong);
    const load = useSelector((state) => state.load.loaded);
    const dispatch = useDispatch();
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
    return (
        <div
            className={`p-[10px] flex items-center relative group border-b-[1px] border-b-[rgba(0,0,0,0.05)] mb-[1px] rounded-md gap-2 hover:bg-[hsla(0,0%,100%,0.3)] ${
                song.encodeId === currentSongId && "bg-[hsla(0,0%,100%,0.3)]"
            }`}
        >
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
                                    dispatch(setCurrentSong(song?.encodeId));
                                    dispatch(play(true));
                                    dispatch(setPlaylistId(pid));
                                    dispatch(
                                        setPlaylist({
                                            title: playlistTitle,
                                            songs: playlist,
                                        })
                                    );
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
            <div className="w-3/5 truncate cursor-default">
                <div className="text-[14px] font-medium">{song?.title}</div>
                <div className="text-[12px]">{song?.artistsNames}</div>
            </div>

            <div className="absolute right-[10px] text-[12px] cursor-default">
                {FormatDuration(song?.duration)}
            </div>
        </div>
    );
};

export default SearchSong;
