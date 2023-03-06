import React from "react";
import { Outlet } from "react-router-dom";
import PlaylistLibrary from "./PlaylistLibrary";
import SongLibrary from "./SongLibrary";
const Library = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <div>
                {<Outlet /> || <SongLibrary/>}
            </div>
        </div>
    );
};

export default Library;
