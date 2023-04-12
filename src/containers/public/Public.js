import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Header, LeftSidebar, Player } from "../../components";
import RightSidebar from "../../components/RightSidebar";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import { setShowSidebarAction } from "../../store/actions";
import { bottomSidebarMenu } from "../../ultis/menu";
import { CloseIcon } from "../../ultis/icons";
import logo from "../../assets/logo.svg";
const Public = () => {
    const currentWidth = useSelector((state) => state.app.width);
    const [showSidebar, setShowSidebar] = useState(false);
    const currentSongInfo = useSelector(
        (state) => state.storagesong.currentSongInfo
    );
    const dispatch = useDispatch();

    const showSidebarSelector = useSelector((state) => state.app.sidebar);
    useEffect(() => {
        if (currentWidth > 700) {
            dispatch(setShowSidebarAction(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWidth]);
    return (
        <div className="w-full  h-screen flex flex-col item-center justify-center  bg-main-300 overflow-hidden">
            <div className="relative w-full  h-full flex   ">
                <div
                    className={`h-full flex-none  ${
                        currentWidth > 1131
                            ? "w-[240px]"
                            : currentWidth > 700
                            ? "w-[70px]"
                            : ""
                    } ${currentSongInfo && "pb-[90px]"}`}
                >
                    <LeftSidebar />
                </div>

                <div className=" flex-auto w-full ">
                    <div
                        className={`h-[70px] py-0  flex items-center jcenter ${
                            currentWidth > 700 ? "px-[59px]" : "px-3"
                        }`}
                    >
                        <Header />
                    </div>
                    <Scrollbars>
                        <Outlet />
                    </Scrollbars>
                </div>
                {showSidebar && (
                    <div
                        className={`w-[330px] h-full flex-none pb-[90px] animate-slide-left  shadow-lg bg-[#ced9d9] right-0 z-10 ${
                            currentWidth < 1725 ? "absolute" : ""
                        }`}
                    >
                        <RightSidebar />
                    </div>
                )}
            </div>
            <div
                className={`w-full fixed  bottom-0  h-[90px] border-t-[1px] z-50 border-t-[rgba(0,0,0,0.05)] ${
                    currentSongInfo === null && "hidden"
                }`}
            >
                <Player setShowSidebar={setShowSidebar} />
            </div>

            <div
                className={`fixed top-0  h-screen w-[200px] bg-[#dde4e4]  z-40 flex flex-col gap-5 justify-start pt-[50px] pl-[20px] ${
                    showSidebarSelector ? "left-0 duration-500" : "left-[-200px] duration-500"
                }`}
            >
                <CloseIcon
                    size={25}
                    className="absolute top-[10px] right-[10px] cursor-pointer"
                    onClick={() => dispatch(setShowSidebarAction(false))}
                />
                <NavLink
                    to=""
                    className="w-[100px] h-[50px] cursor-pointer flex items-center px-[5px] "
                >
                    <img src={logo} alt="logo" />
                </NavLink>
                {bottomSidebarMenu.map((item) => (
                    <NavLink
                        key={item.path}
                        end={item.end}
                        to={item.path}
                        className="font-medium hover:text-[#0f7070]"
                    >
                        <div className="flex items-center gap-2  ">
                            <span>{item.icon}</span>
                            <span>{item.text}</span>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Public;
