import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, LeftSidebar, Player } from "../../components";
import RightSidebar from "../../components/RightSidebar";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
const Public = () => {
    const currentWidth = useSelector(state=>state.app.width)
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <div className="w-full  h-screen flex flex-col item-center justify-center  bg-main-300 overflow-hidden">
            <div className="relative w-full  h-full flex   ">
                <div className={`h-full flex-none pb-[90px] ${currentWidth >1131 ? "w-[240px]" : "w-[70px]"}`}>
                    <LeftSidebar />
                </div>
                <div className=" flex-auto w-full ">
                    <div className="h-[70px] py-0  flex items-center px-[59px]">
                        <Header />
                    </div>
                    <Scrollbars>
                        <Outlet />
                    </Scrollbars>
                </div>
                {showSidebar && (
                    <div
                        className={`w-[330px] h-full flex-none pb-[90px] animate-slide-left  shadow-lg bg-[#ced9d9] right-0 z-10 ${currentWidth <1725 ? "absolute" : ""}`}
                    >
                        <RightSidebar />
                    </div>
                )}
            </div>
            <div className=" w-full fixed  bottom-0  h-[90px] border-t-[1px] z-10 border-t-[rgba(0,0,0,0.05)]">
                <Player setShowSidebar={setShowSidebar} />
            </div>
        </div>
    );
};

export default Public;
