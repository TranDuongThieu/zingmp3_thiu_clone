import React from "react";
import { useSelector } from "react-redux";
import { HomePlaylist } from "../../../components";
import SearchSong from "../../../components/Search/SearchAllSong";
import { AddFriendsIcon } from "../../../ultis/icons";
import unfind from '../../../assets/unfind.svg'
const SearchAll = () => {
    const { searchData } = useSelector((state) => state.searchReSults);
    const formatNum = (num) => {
        return num > Math.pow(10, 6)
            ? Math.round(num / Math.pow(10, 5)) / 10 + "M"
            : num > 1000
            ? Math.round(num / 100) * 10 + "k"
            : num;
    };
    const {width} = useSelector(state=> state.app);
    let length = width > 700 ? 4 : width >500 ? 3 :2
    return (
        <div>
            {searchData?.counter?.artist === 0 && searchData?.counter?.artist ===0 && searchData?.counter?.song ===0   ? (
                <div className="w-full h-[220px] flex flex-col items-center justify-center text-[#696969] bg-[#dde4e4]">
                    <img src={unfind} alt="" />
                    <span className="text-[16px]">Không có kết quả được tìm thấy</span>
                </div>
            ) : (
                <div className="w-full  flex flex-col gap-[40px]">
                    <div className="w-full">
                        <div className="font-bold mb-5 text-[20px]">
                            Playlist/Album
                        </div>
                        <div className="w-full">
                            <HomePlaylist list={searchData?.playlists} search />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="font-bold mb-5 text-[20px]">
                            Bài Hát
                        </div>
                        <div className={`w-full gap-8 grid  ${ width > 700 ? "grid-cols-2" : "grid-cols-1"}`}>
                            <div className="flex flex-col">
                                {searchData?.songs
                                    ?.filter(
                                        (item, index) =>
                                            index < 6 && index % 2 === 0
                                    )
                                    ?.map((item) => (
                                        <SearchSong
                                            key={item.encodeId}
                                            song={item}
                                        />
                                    ))}
                            </div>
                            <div className="flex flex-col">
                                {searchData?.songs
                                    ?.filter(
                                        (item, index) =>
                                            index % 2 !== 0 && index < 6
                                    )
                                    ?.map((item) => (
                                        <SearchSong
                                            key={item.encodeId}
                                            song={item}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>

                    {searchData?.artists && (
                        <div className="w-full flex flex-col">
                            <div className="font-bold text-[20px]  mb-5">
                                Nghệ Sĩ/OA
                            </div>
                            <div className="w-full flex gap-2">
                                {searchData?.artists
                                    ?.slice(0, length)
                                    .map((artist) => (
                                        <div
                                            key={artist.encodeId}
                                            className="flex flex-col justify-center items-center gap-2"
                                        >
                                            <div className="mx-[14px] group overflow-hidden text-center rounded-full">
                                                <img
                                                    src={artist.thumbnail}
                                                    alt="thumbnailM"
                                                    className="w-full h-full group-hover:scale-110 transition duration-700"
                                                />
                                            </div>
                                            <div className="text-[14px]">
                                                {artist.name}
                                            </div>
                                            <div className="text-[12px] text-[#696969]">{`${formatNum(
                                                artist.totalFollow
                                            )} quan tâm`}</div>
                                            <div className="cursor-pointer flex text-[12px] items-center justify-center gap-1 px-[19px] py-[6px] text-white bg-[#0e8080] rounded-full">
                                                <AddFriendsIcon />
                                                QUAN TÂM
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchAll;
