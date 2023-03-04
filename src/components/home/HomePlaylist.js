import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    play,
    setCurrentSong,
    setPlaylist,
    setPlaylistId,
} from "../../store/actions";
import { HeartIcon, MoreIcon, PlayIcon, SpinerIcon } from "../../ultis/icons";
import * as apis from "../../api";
const HomePlaylist = ({ title = "", list, search }) => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(true);
    const dispatch = useDispatch();
    const {width} = useSelector(state=>state.app)
    const [col, setCol] = useState();
    useEffect(()=>{
        setCol(width > 1350? 5: width > 680 ? 4 : 3)
    },[width])
    return (
        <div className="w-full">
            {!list ? (
                <></>
            ) : (
                <div className="flex flex-col gap-[20px] w-full justify-center ">
                    <div className="text-[20px] font-bold ">{title}</div>
                    <div className={`grid justify-between ${col === 4 ? "grid-cols-4" : col===5?  "grid-cols-5":"grid-cols-3"}`}>
                        {list?.slice(0, col).map((item) => (
                            <div
                                key={item.encodeId}
                                onClick={() =>
                                    navigate(item?.link?.split(".")[0], {
                                        state: { playAlbum: false },
                                    })
                                }
                                className="ml-0 text-[14px] flex flex-col gap-[10px] mx-[20px] "
                            >
                                <div className={`relative text-center overflow-hidden shadow-black rounded-[8px]  group `}>
                                    <img
                                        src={item.thumbnailM}
                                        alt=""
                                        className={`  rounded-[8px]  group-hover:scale-110 transition duration-700`}
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10 cursor-pointer hidden group-hover:block ">
                                        <div className="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center gap-[25px]">
                                            <HeartIcon className="w-[20px] h-[20px]" />
                                            {loaded ? (
                                                <PlayIcon
                                                    onClick={(e) => {
                                                        dispatch(
                                                            setPlaylistId(
                                                                item?.encodeId
                                                            )
                                                        );
                                                        navigate(
                                                            item?.link?.split(
                                                                "."
                                                            )[0],
                                                            {
                                                                state: {
                                                                    playAlbum: true,
                                                                },
                                                            }
                                                        );
                                                        e.stopPropagation();
                                                    }}
                                                    className=" w-[45px] h-[45px] rounded-[99px] border-white border-[1px] "
                                                />
                                            ) : (
                                                <SpinerIcon className="animate-spin w-[30px] h-[30px]" />
                                            )}
                                            <MoreIcon className="w-[20px] h-[20px]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="font-bold  truncate">
                                    {item.title.length > 27
                                        ? item.title.slice(0, 24) + "..."
                                        : item.title}
                                </div>
                                {!search ? (
                                    <div className="text-[#696969]  h-[40px] truncate">
                                        {item.sortDescription.length > 30
                                            ? item.sortDescription.slice(
                                                  0,
                                                  27
                                              ) + "..."
                                            : item.sortDescription}
                                    </div>
                                ) : (
                                    <div className="text-[#696969]  h-[40px] truncate">
                                        {item.userName.toString().length > 30
                                            ? item.userName.slice(
                                                  0,
                                                  27
                                              ) + "..."
                                            : item.userName}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePlaylist;
//
