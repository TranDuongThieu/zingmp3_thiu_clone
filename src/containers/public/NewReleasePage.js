
import React, { useEffect, useState } from "react";
import { getNewRelease } from "../../api";
import { Loading,  PlayIconFill } from "../../ultis/icons";
import { SongInPlaylist } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { play, setCurrentSong, setPlaylist } from "../../store/actions";
const NewReleasePage = () => {
    const [pageData, setPageData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const {width} = useSelector(state=> state.app)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoaded(false);
            const res = await getNewRelease();
            if (res?.data?.err === 0) setPageData(res?.data?.data);
            setIsLoaded(true);
        };
        fetchData();
    }, []);

    const dispatch = useDispatch();
    return (
        <div>
            {isLoaded ? (
                <div className={` w-full  mb-[200px] ${width > 700 ? "px-[59px]" : "px-3"}`}>
                    <div className="flex items-center gap-[5px]  text-[40px] text-[#0e8080] font-bold mb-[25px]">
                        Nhạc Mới
                        <PlayIconFill
                            className="cursor-pointer"
                            onClick={() => {
                                dispatch(
                                    setCurrentSong(pageData?.items[0]?.encodeId)
                                );
                                dispatch(
                                    setPlaylist({
                                        title: "#zingchart New Release",
                                        songs: pageData?.items,
                                    })
                                );
                                dispatch(play(true));
                            }}
                        />
                    </div>
                    <div className="w-full">
                        {pageData?.items?.map((item, index) => (
                            <SongInPlaylist
                                key={item.encodeId}
                                song={item}
                                newReleasePage
                                index={index + 1}
                                rak={item.rakingStatus}
                                playlistTitle={"#zingchart New Release"}
                                playlist={pageData?.items}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default NewReleasePage;
