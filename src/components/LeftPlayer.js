import React from "react";
import { useSelector } from "react-redux";
import { HeartIcon, MoreIcon, SpinerIcon } from "../ultis/icons";
const LeftPlayer = ({ songInfo, isLoaded }) => {
    const { width } = useSelector((state) => state.app);
    return (
        <div
            className={`flex-auto truncate ${
                width > 700 ? " w-[30%]" : "w-[10%]"
            }`}
        >
            {isLoaded ? (
                <div className="flex gap-[12px] text-sm items-center">
                    {songInfo && width > 700 ? (
                        <img
                            src={songInfo.thumbnail}
                            alt="thumbnail"
                            className={`w-16 h-16 rounded-[4px] ${
                                width < 700 && "hidden"
                            }`}
                        />
                    ) : (
                        <div
                            className={`w-16 h-16 rounded-[4px] ${
                                width < 700 && "hidden"
                            }`}
                        ></div>
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

                </div>
            ) : (
                <div className="w-16 h-16 rounded-[4px] bg-slate-500 flex justify-center items-center">
                    <SpinerIcon className="text-white animate-spin" />
                </div>
            )}
        </div>
    );
};

export default LeftPlayer;
