import React from "react";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CloseIcon,
    DesktopIcon,
    SearchIcon,
} from "../ultis/icons";
import SearchInput from "./home/SearchInput";

const Header = () => {
    return (
        <div className="w-full h-full flex justify-between items-center">
            <div className="flex justify-between items-center gap-[20px] w-full">
                <div className="flex gap-[20px]">
                    <ArrowLeftIcon size={20} />
                    <ArrowRightIcon size={20} />
                </div>
                <div className="w-full">
                    <SearchInput/>
                </div>
            </div>
        </div>
    );
};

export default Header;
