import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { play, setCurrentSong } from "../../store/actions";
import { AudioGif, PlayIcon } from "../../ultis/icons";

const SongInChart = ({
    encodeId,
    index,
    thumbnail,
    title,
    artistsNames,
    percent,
}) => {
    const dispatch = useDispatch();
    const { isPlaying } = useSelector((state) => state.isPlaying);
    const { currentSongId } = useSelector((state) => state.storagesong);
   
    return (
        <div
            className={`cursor-pointer group flex items-center w-full px-[15px] py-[10px]  rounded-md hover:bg-[hsla(0,0%,100%,.2)] ${
                encodeId === currentSongId
                    ? "bg-[rgba(254,255,255,0.2)]"
                    : "bg-[rgba(255,255,255,0.07)]"
            } `}
        >
            {index && (
                <div
                    className={`${
                        index === 0
                            ? "text-[#4a90e2]"
                            : index === 1
                            ? "text-[#50e3c2]"
                            : "text-[#e35050]"
                    } text-[40px] font-sans font-bold mr-[15px]`}
                >
                    {index}
                </div>
            )}
            <div className="relative w-[60px] h-[60px] mr-[10px]">
                <img
                    src={thumbnail}
                    alt=""
                    className="w-full h-full rounded-md"
                />
                <div
                    className={`rounded-[5px] absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] justify-center items-center ${
                        encodeId === currentSongId ? "flex" : "hidden"
                    } group-hover:flex`}
                >
                    {!isPlaying ? (
                        <PlayIcon
                            onClick={() => {
                                dispatch(setCurrentSong(encodeId));
                                dispatch(play(true));
                            }}
                            size={32}
                            className="text-white  border-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                        />
                    ) : encodeId === currentSongId ? (
                        <div onClick={() => dispatch(play(false))}>
                            <AudioGif />
                        </div>
                    ) : (
                        <PlayIcon
                            onClick={() => {
                                dispatch(setCurrentSong(encodeId));
                                dispatch(play(true));
                            }}
                            size={32}
                            className="text-white  border-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-center  flex-1">
                <span className="text-[16px] font-semibold truncate">
                    {title}
                </span>
                <span className="text-[14px] text-[hsla(0,0%,100%,.5)] truncate">
                    {artistsNames}
                </span>
            </div>
            {percent && (
                <div className="text-[18px] font-semibold ml-[10px] flex justify-center items-center">
                    <span>{percent}%</span>
                </div>
            )}
        </div>
    );
};

export default SongInChart;
