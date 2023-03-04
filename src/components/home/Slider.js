import { useSelector, useDispatch } from "react-redux";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import { ArrowLeftIcon, ArrowRightIcon } from "../../ultis/icons";
import * as actions from "../../store/actions";
import { play, setPlaylist } from "../../store/actions";
import { useNavigate } from "react-router-dom";
const SliderComponent = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch();
    const bannerSelector = useSelector((state) => state.app);
    const swiperRef = useRef();
    const {width} = useSelector(state=>state.app);
    let i ;
    if (width > 1024 ) 
        i = 3;
    else if (width >768 ) i =2;
    else i =1;
    const handleClickBanner = (item) => {
        if (item?.type === 1) {
            dispatch(actions.setCurrentSong(item.encodeId));
            dispatch(play(true));
            dispatch(setPlaylist({}))
        }
        if (item?.type === 4){
            const link = item.link.split('.')[0]
            navigation(link)
        }
    };
    return (
        <div className=" relative group h-[188px] w-full">
            <div
                onClick={() => swiperRef.current?.slidePrev()}
                className="cursor-pointer shadow-md prev-button w-[55px] h-[55px] left-2 bg-[hsla(0,0%,100%,.15)]  justify-center items-center rounded-[50%] absolute z-10 top-[50%] transform translate-y-[-50%] hidden group-hover:flex"
            >
                <ArrowLeftIcon className="w-[25.6px] h-[25.6px] text-white " />
            </div>
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 1500,
                }}
                loop={true}
                spaceBetween={24}
                slidesPerView={i}
                className="h-full"
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                allowTouchMove={false}
            >
               
                {bannerSelector.banner.map((banner) =>
                    banner.items.map((item) => (
                        <SwiperSlide className="cursor-pointer">
                            <img
                                src={item.banner}
                                alt=""
                                className="h-full w-full object-cover rounded-[5px]"
                                onClick={() => handleClickBanner(item)}
                            />
                        </SwiperSlide>
                    ))
                )} 
            </Swiper>
            <div
                onClick={() => swiperRef.current?.slideNext()}
                className="shadow-md next-button cursor-pointer w-[55px] h-[55px] right-2 bg-[hsla(0,0%,100%,.15)]  justify-center items-center rounded-[50%] absolute z-10 top-[50%] transform translate-y-[-50%] hidden group-hover:flex "
            >
                <ArrowRightIcon className="w-[25.6px] h-[25.6px] text-white" />
            </div>
            
        </div>
    );
};

export default SliderComponent;
