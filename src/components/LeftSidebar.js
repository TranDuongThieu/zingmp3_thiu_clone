import React from "react";
import logo from "../assets/logo.svg";
import zingmp3logo from "../assets/zingmp3logo.svg";
import { bottomSidebarMenu, libraryMenu, sidebarMenu } from "../ultis/menu";
import { NavLink } from "react-router-dom";
import { PlusIcon } from "../ultis/icons";
import "./scrollbar-settings.css";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
const LeftSidebar = () => {
    const currentWidth = useSelector((state) => state.app.width);
    const active =
        "py-2 flex items-center text-[#0f7070] px-[25px] bg-main-100 hover:text-[#0f7070] ";
    const notActive =
        "py-2 flex items-center text-[#32323d] px-[25px] hover:text-[#0f7070]";
    return (
        <div className="flex flex-col bg-main-200 h-full text-[13px] font-bold">
            <Scrollbars autoHide>
                <div className="w-full flex items-center px-[25px] py-[15px] h-[70px]">
                    <NavLink to="" className="w-[120px] h-full cursor-pointer">
                        {currentWidth > 1131 ? (
                            <img src={logo} alt="logo" />
                        ) : (
                            <img src = {zingmp3logo} alt="logo" className="scale-150 w-[50px] h-[50px]"/>
                        )}
                    </NavLink>
                </div>
                <div className="flex flex-col pb-[15px] border-b-[1px] border-[#ccc]  ">
                    {sidebarMenu.map((item) => (
                        <NavLink
                            key={item.path}
                            end={item.end}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? active : notActive
                            }
                        >
                            <div>
                                <div className="gap-[10px] flex">
                                    {item.icon}
                                    {currentWidth > 1131 && (
                                        <span className=" font-bold ">
                                            {item.text}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
                <div className="mt-[10px] ">
                    <div>
                        {bottomSidebarMenu.map((item) => (
                            <NavLink
                                key={item.path}
                                end={item.end}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive ? active : notActive
                                }
                            >
                                <div>
                                    <div className="gap-[10px] flex">
                                        {item.icon}
                                        {currentWidth > 1131 && (
                                            <span className=" font-bold ">
                                                {item.text}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    {currentWidth > 1131 && (
                        <div className="mx-5 my-[10px] px-2 py-[15px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-[8px] flex flex-col items-center text-white">
                            <span>Nghe nhạc không quảng cáo</span>
                            <span> cùng kho nhạc VIP</span>
                            <div className="px-[35px] py-[6px] bg-[#ffdb00] border-[#ffdb00] rounded-[999px] mt-1 text-black cursor-pointer hover:bg-[#978616]">
                                Nâng cấp vip
                            </div>
                        </div>
                    )}
                    <div className="pt-5">
                        {currentWidth > 1131 && (
                            <h3 className="px-[25px] pb-3 ">THƯ VIỆN</h3>
                        )}
                        {libraryMenu.map((item) => (
                            <NavLink
                                key={item.path}
                                end={item.end}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive ? active : notActive
                                }
                            >
                                <div>
                                    <div className="gap-[10px] flex">
                                        {item.icon}
                                        {currentWidth > 1131 && (
                                            <span className=" font-bold ">
                                                {item.text}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
                {currentWidth > 1131 && (
                    <div className="flex  items-center gap-[10px] px-[25px] h-[54px] cursor-pointer hover:text-[#0f7070] border-t-[1px] border-[#ccc] ">
                        <PlusIcon size={18} />
                        <span>Tạo playlist mới</span>
                    </div>
                )}
            </Scrollbars>
        </div>
    );
};

export default LeftSidebar;
