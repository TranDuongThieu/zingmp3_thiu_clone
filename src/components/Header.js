import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "../ultis/icons";
import SearchInput from "./home/SearchInput";
import logo from "../assets/logo.svg";
import { bottomSidebarMenu, sidebarMenu } from "../ultis/menu";
const Header = () => {
    const currentWidth = useSelector((state) => state.app.width);
    const active =
        "py-2 flex border h-full items-center text-[#0f7070] px-[10px] bg-main-100 hover:text-[#0f7070] ";
    const notActive =
        "py-2 flex border h-full items-center text-[#32323d] px-[10px] hover:text-[#0f7070]";
    return (
        <div className="w-full h-full flex justify-between items-center max-w-[1442px] grid-cols-2 gap-3">
            {currentWidth < 700 && (
                <div className="flex h-full ">
                    <div className="w-full flex items-center my-[15px] h-[40px] ">
                        <NavLink
                            to=""
                            className="w-[100px] h-full cursor-pointer flex items-center px-[5px] "
                        >
                            <img src={logo} alt="logo" />
                        </NavLink>

                        {bottomSidebarMenu.map((item) => (
                            <NavLink
                                key={item.path}
                                end={item.end}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive ? active : notActive
                                }
                            >
                                <div className="gap-[10px] flex ">
                                    {item.icon}
                                    {currentWidth > 1131 && (
                                        <span className=" font-bold ">
                                            {item.text}
                                        </span>
                                    )}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center gap-[20px] w-full">
                {currentWidth > 700 && (
                    <div className="flex gap-[20px]">
                        <ArrowLeftIcon size={20} />
                        <ArrowRightIcon size={20} />
                    </div>
                )}
                <div className="w-full">
                    <SearchInput />
                </div>
            </div>
        </div>
    );
};

export default Header;
