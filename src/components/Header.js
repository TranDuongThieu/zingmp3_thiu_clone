import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon, MenuIcon } from "../ultis/icons";
import SearchInput from "./home/SearchInput";
import logo from "../assets/logo.svg";
import { bottomSidebarMenu, sidebarMenu } from "../ultis/menu";
import { setShowSidebar, setShowSidebarAction } from "../store/actions";
const Header = () => {
    const currentWidth = useSelector((state) => state.app.width);
    const dispatch = useDispatch();
    const active =
        "py-2 flex border h-full items-center text-[#0f7070] px-[10px] bg-main-100 hover:text-[#0f7070] ";
    const notActive =
        "py-2 flex border h-full items-center text-[#32323d] px-[10px] hover:text-[#0f7070]";
    return (
        <div className="w-full h-full flex justify-between items-center max-w-[1442px] grid-cols-2 gap-3">
            {currentWidth < 700 && (
                <div className="flex h-full ">
                    <div className="w-full flex items-center my-[15px] h-[40px] gap-3  cursor-pointer">
                        <MenuIcon
                            size={25}
                            onClick={() => dispatch(setShowSidebarAction(true))}
                        />
                        <NavLink
                            to=""
                            className="w-[100px] h-full cursor-pointer flex items-center px-[5px] "
                        >
                            <img src={logo} alt="logo" />
                        </NavLink>
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
            {/* <div className="fixed top-0 left-0  h-full bg-black z-40 flex flex-col gap-3">
                {bottomSidebarMenu.map((item) => (
                    <NavLink
                        key={item.path}
                        end={item.end}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? active : notActive
                        }
                    >
                        {item.text}
                    </NavLink>
                ))}
            </div> */}
        </div>
    );
};

export default Header;
