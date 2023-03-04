import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { ClockOutlineIcon, MoreIcon } from "../ultis/icons";
import SongInRightSidebar from "./SongInRightSidebar";
import * as apis from "../api";
import { setPlaylist } from "../store/actions";
const RightSidebar = () => {
    const dispatch = useDispatch();
    const [header, setHeader] = useState("danh_sach_phat");
    const currentSongId = useSelector(
        (state) => state.storagesong.currentSongId
    );
    const currentSongInfo = useSelector(
        (state) => state.storagesong.currentSongInfo
    );
    const playlistData = useSelector((state) => state.storagesong.playlistData);
    const { listenHistory } = useSelector((state) => state.listenHistory);

    useEffect(() => {
        setHeader("danh_sach_phat");
    }, [currentSongId]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-none py-[17px] px-2 gap-2 items-center  text-[13px] justify-between text-[#32323d]">
                <div className="flex bg-[hsla(0,0%,100%,0.3)] p-[3px] rounded-full flex-1  justify-between">
                    <div
                        onClick={() => {
                            setHeader("danh_sach_phat");
                        }}
                        className={`py-[5px] px-[10px] rounded-full cursor-pointer flex-1 text-center  ${
                            header === "danh_sach_phat" &&
                            "bg-[#e7ecec] text-[#0f7070] font-semibold "
                        }`}
                    >
                        Danh sách phát
                    </div>
                    <div
                        onClick={() => {
                            setHeader("nghe_gan_day");
                        }}
                        className={`py-[5px] px-[10px] rounded-full cursor-pointer flex-1 text-center ${
                            header === "nghe_gan_day" &&
                            "bg-[#e7ecec] text-[#0f7070] font-semibold"
                        }`}
                    >
                        Nghe gần đây
                    </div>
                </div>
                <div className="flex gap-2">
                    <div>
                        <ClockOutlineIcon
                            size={30}
                            className="p-[7px] rounded-full bg-[hsla(0,0%,100%,0.3)] cursor-pointer"
                        />
                    </div>
                    <div>
                        <MoreIcon
                            size={30}
                            className="p-[7px] rounded-full bg-[hsla(0,0%,100%,0.3)] cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            <div className=" flex-auto w-full h-full">
                {header === "danh_sach_phat" ? (
                    <div className="w-full h-full">
                        {!(playlistData?.songs === undefined) ? (
                            <Scrollbars autoHide>
                                <div className="h-full px-2 overflow-x-clip">
                                    {playlistData?.songs?.map((item) => (
                                        <div key={item.encodeId}>
                                            {item.encodeId !== currentSongId ? (
                                                <SongInRightSidebar
                                                    song={item}
                                                />
                                            ) : (
                                                <div>
                                                    <SongInRightSidebar
                                                        song={item}
                                                    />
                                                    <div className="px-2 text-[14px] flex flex-col py-[10px] truncate">
                                                        <span className="font-bold">
                                                            Tiếp theo
                                                        </span>
                                                        <div className="flex gap-1">
                                                            <span className="text-[rgba(20,20,20,0.4)]">
                                                                Từ playlist
                                                            </span>
                                                            <span className="text-[#0f7070]">
                                                                {
                                                                    playlistData?.title
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Scrollbars>
                        ) : (
                            <div className="w-full h-full">
                                <SongInRightSidebar song={currentSongInfo} />
                            </div>
                        )}
                    </div>
                ) : (
                    <Scrollbars autoHide>
                        <div className="h-full px-2 overflow-x-clip">
                            {listenHistory.slice(0, 100).map((item) => (
                                <div key={item.encodeId}>
                                    <div>
                                        <SongInRightSidebar song={item} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Scrollbars>
                )}
            </div>
        </div>
    );
};

export default RightSidebar;
