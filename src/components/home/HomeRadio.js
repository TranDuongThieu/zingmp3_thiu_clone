import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { NextIcon2, PlayIcon } from "../../ultis/icons";

const HomeRadio = ({ list }) => {
    const {width} = useSelector(state=>state.app)
    const i = width >1350 ? 7: width >1220 ? 6 : 5
    return (
        <div className="relative">
            <div className="flex justify-between mb-[20px]">
                <div className="font-bold text-[20px]">{list?.title}</div>
                <div className="flex gap-[5px] items-center cursor-pointer text-[#696969] hover:text">
                    TẤT CẢ <NextIcon2 />
                </div>
            </div>
            <Swiper
                loop={true}
                spaceBetween={24}
                slidesPerView={i}
                className="h-full"
                // ve={false}
            >
                {list?.items?.map((item) => (
                    <SwiperSlide
                        className="cursor-pointer "
                        key={item?.encodeId}
                    >
                        <div className="flex flex-col items-center gap-[5px]">
                            <div className="relative">
                                <div className=" rounded-full relative group overflow-hidden border-[4px] border-red-600">
                                    {item?.program?.thumbnail ? (
                                        <img
                                            src={item?.program?.thumbnail}
                                            alt=""
                                            className="h-full object-cover rounded-full  group-hover:scale-110 transition duration-700"
                                        />
                                    ) : (
                                        <img
                                            src={item?.thumbnail}
                                            alt=""
                                            className="h-full object-cover rounded-full  group-hover:scale-110 transition duration-700"
                                        />
                                    )}

                                    <div className=" bg-[rgba(0,0,0,0.5)] rounded-full absolute z-2 top-0 bottom-0 left-0 right-0  justify-center items-center hidden group-hover:flex">
                                        <PlayIcon className="w-[45px] h-[45px] text-white rounded-[99px] border-white border-[1px] absolute " />
                                    </div>
                                </div>
                                <img
                                    src={item?.host?.thumbnail}
                                    alt=""
                                    className="z-10 w-[47px] h-[47px] absolute border-[2px] border-white rounded-full right-0 bottom-[2px]"
                                />
                                <div className="px-[5px]  bg-red-600 rounded-[5px] z-10 text-white absolute text-[10px] font-semibold bottom-[-7px] left-[50%] translate-x-[-50%]">
                                    LIVE
                                </div>
                            </div>
                            <div className="text-[16px] font-semibold">
                                {item?.host?.name}
                            </div>
                            <div className="text-[12px] text-[#696969] ">
                                {item?.activeUsers} đang nghe
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeRadio;
