import React, { useEffect, useState } from "react";
import { getTop100 } from "../../api";
import {
    HeartIcon,
    Loading,
    MoreIcon,
    PlayIcon,
    SpinerIcon,
} from "../../ultis/icons";

import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Top100 = () => {
    const navigate = useNavigate();
    const [top100, setTop100] = useState();
    const [loaded, setLoaded] = useState(true);
    const { width } = useSelector((state) => state.app);
    const [col, setCol] = useState();
    useEffect(() => {
        if (width > 1350) setCol(5);
        else if (width > 768) setCol(4);
        else setCol(3);
    }, [width]);
    useEffect(() => {
        const fetchData = async () => {
            setLoaded(false);
            const res = await getTop100();
            if (res?.data?.err === 0) setTop100(res.data.data);
            setLoaded(true);
        };
        fetchData();
    }, []);
    return (
        <div className="w-full flex justify-center">
            {loaded ? (
                <div className="w-full flex flex-col gap-[30px] max-w-[1442px] pb-[200px] px-[59px]">
                    {top100?.map((item, index) => (
                        <div className="flex flex-col " key={index}>
                            <div className="text-[20px] font-bold mb-[10px]">
                                {item?.title}
                            </div>
                            <div
                                className={`grid justify-between gap-5 ${
                                    col === 4
                                        ? "grid-cols-4"
                                        : col === 5
                                        ? "grid-cols-5"
                                        : "grid-cols-3"
                                }`}
                            >
                                {item?.items.map((song) => (
                                    <div
                                        key={song.encodeId}
                                        onClick={() =>
                                            navigate(
                                                song?.link?.split(".")[0],
                                                {
                                                    state: { playAlbum: false },
                                                }
                                            )
                                        }
                                        className="ml-0 text-[14px] flex flex-col  "
                                    >
                                        <div className="relative  text-center overflow-hidden shadow-black rounded-[8px]  group ">
                                            <img
                                                src={song.thumbnailM}
                                                alt=""
                                                className=" rounded-[8px]  group-hover:scale-110 transition duration-700"
                                            />
                                            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10 cursor-pointer hidden group-hover:block ">
                                                <div className="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center gap-[25px]">
                                                    <HeartIcon className="w-[20px] h-[20px]" />
                                                    {loaded ? (
                                                        <PlayIcon
                                                            onClick={(e) => {
                                                                navigate(
                                                                    song?.link?.split(
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
                                            {song.title}
                                        </div>
                                        <div className="  h-[40px] truncate">
                                            {song?.artists
                                                ?.map((item) => item.name)
                                                .toString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default Top100;
