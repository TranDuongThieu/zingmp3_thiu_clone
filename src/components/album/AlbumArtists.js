import React from "react";
import {v4 as uuid} from "uuid"
const AlbumArtists = ({ artists }) => {
    return (
        <div className="w-full">
            <div className="font-bold text-[20px] mb-[20px]">
                NGHỆ SĨ THAM GIA
            </div>
            <div className="flex ">
                {artists?.map((artirst) => (
                    <div key={uuid()} className="mx-[14px] group w-[210px] h-[210px] overflow-hidden text-center rounded-full">
                        <img src={artirst.thumbnail} alt="thumbnailM" className="w-full h-full group-hover:scale-110 transition duration-700"/>
                    </div>
                    
                ))}
            </div>
        </div>
    );
};

export default AlbumArtists;
