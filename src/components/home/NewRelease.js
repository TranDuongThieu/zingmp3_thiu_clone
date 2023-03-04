import moment from "moment";
import "moment/locale/vi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { play, setCurrentSong, setPlaylist } from "../../store/actions";
import { MoreIcon, NextIcon2, PlayIcon } from "../../ultis/icons";
const NewRelease = () => {
    const newReleaseSelector = useSelector(
        (state) => state.app.new_releases[0]
    );
    const {width} = useSelector(state=>state.app)
    const titles = [
        { id: "all", title: "TẤT CẢ" },
        { id: "vpop", title: "VIỆT NAM" },
        { id: "others", title: "QUỐC TẾ" },
    ];
    const [title, setTitle] = useState(titles[0].id);
    const dispatch = useDispatch();
    let newReleaseArray;

    switch (title) {
        case "all":
            newReleaseArray = newReleaseSelector?.items?.all;
            break;
        case "vpop":
            newReleaseArray = newReleaseSelector?.items?.vPop;
            break;
        case "others":
            newReleaseArray = newReleaseSelector?.items?.others;
            break;
        default:
            newReleaseArray = null;
    }
    return (
        <div className="flex flex-col gap-5">
            <div className="font-bold">MỚI PHÁT HÀNH</div>
            <div className="flex justify-between">
                <div className="flex gap-[15px]">
                    {titles.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setTitle(item.id)}
                            className={`px-6 py-1 cursor-pointer rounded-[100px] border-[1px] border-[rgba(0,0,0,0.1)]  text-[12px]   ${
                                item.id === title
                                    ? "bg-[#0e8080] text-white"
                                    : "bg-transparent"
                            }`}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
                <div className="flex items-center text-[12px] hover:text-[#0f7070] cursor-pointer">
                    <div>TẤT CẢ </div>
                    <div className="p-[5px]">
                        <NextIcon2 size={14} />
                    </div>
                </div>
            </div>
            <div className={`grid  text-[14px] ${width >1225 ? "grid-cols-3" : width > 800 ?"grid-cols-2" :" grid-cols-1"}`}>
                {newReleaseArray?.slice(0, 12).map((item) => (
                    <div
                        key={item.encodeId}
                        className="flex flex-col min-w-[308px]"
                    >
                        <div className="relative flex items-center cursor-pointer p-[10px] rounded-[5px] gap-[10px] hover:bg-[hsla(0,0%,100%,0.3)] group">
                            <div className="w-[60px] h-[60px] relative flex-none">
                                <img
                                    src={item.thumbnailM}
                                    alt=""
                                    className="rounded-[5px] w-full h-full"
                                />
                                <div className="w-full h-full rounded-[5px] absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] hidden group-hover:block">
                                    <PlayIcon
                                        size={32}
                                        className="text-white  border-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                        onClick={() => {
                                            dispatch(
                                                setCurrentSong(item.encodeId)
                                            );
                                            dispatch(
                                                setPlaylist({
                                                    title: "Mới phát hành",
                                                    songs: newReleaseArray,
                                                })
                                            );
                                            dispatch(play(true));
                                        }}
                                    />
                                </div>
                            </div>
                            <div className=" h-[60px] truncate flex flex-col justify-center">
                                <div>
                                    {item.title}
                                </div>
                                <div>
                                    {item.artistsNames}
                                </div>
                                <div>
                                    {" "}
                                    {moment(item.releaseDate * 1000).fromNow()}
                                </div>
                            </div>
                            <div
                                className="absolute right-4 hidden group-hover:block"
                                title="khac"
                            >
                                <MoreIcon size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewRelease;
