import React from "react";
import { HeartIcon, MoreIcon, SpinerIcon } from "../ultis/icons";

const LeftPlayer = ({ songInfo, isLoaded }) => {
    return (
        <div className=" min-w-[200px] w-[30%] flex-auto truncate">
            {isLoaded ? (
                <div className="flex gap-[12px] text-sm items-center">
                    {songInfo ? (
                        <img
                            src={songInfo.thumbnail}
                            alt="thumbnail"
                            className="w-16 h-16 rounded-[4px]"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-[4px] bg-slate-500"></div>
                    )}
                    <div className="flex items-center gap-[12px] max-w-[155px]">
                        {songInfo ? (
                            <div className="flex flex-col  truncate">
                                <span className="font-semibold ">
                                    {songInfo.title}
                                </span>
                                <p className="text-[12px] text-gray-600 ">
                                    {songInfo.artistsNames}
                                </p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="flex items-center">
                        <div className="w-8 h-8 flex justify-center items-center px-[5px] py-[5px] cursor-pointer">
                            <HeartIcon size={16} />
                        </div>
                        <div className="w-8 h-8 flex justify-center items-center px-[5px] py-[5px] cursor-pointer">
                            <MoreIcon size={16} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-16 h-16 rounded-[4px] bg-slate-500 flex justify-center items-center"><SpinerIcon className="text-white animate-spin"/></div>
            )}
        </div>
    );
};

export default LeftPlayer;
