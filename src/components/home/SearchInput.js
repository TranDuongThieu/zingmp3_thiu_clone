import React, { useEffect, useState } from "react";
import { CloseIcon, SearchIcon } from "../../ultis/icons";
import path from "../../ultis/path";
import { apiSearch } from "../../api";
import { useRef } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { search, searchID } from "../../store/actions";
const SearchInput = () => {
    const inputRef = useRef();
    const [keyword, setKeyWord] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setKeyWord(e.target.value);
    };
    useEffect(() => {
        if (keyword) setIsSearching(true);
        else setIsSearching(false);
    }, [keyword]);

    const handleCloseSearch = () => {
        setKeyWord("");
        inputRef.current.focus();
    };
    const handleCheckEnter = (e) => {
        if (e.key === "Enter" && keyword.trim() !== "") {
            dispatch(searchID(keyword.trim()));
            navigate({
                pathname: `${path.SEARCH}/${path.SEARCH_ALL}`,
                search: createSearchParams({
                    q: keyword,
                }).toString(),
            });
        }
    };
    const handleSearch = () => {
        dispatch(searchID(keyword.trim()));
        navigate({
            pathname: `${path.SEARCH}/${path.SEARCH_ALL}`,
            search: createSearchParams({
                q: keyword,
            }).toString(),
        });
    };
    return (
        <div className="flex items-center bg-[hsla(0,0%,100%,0.3)] rounded-[20px] w-[70%] h-[40px] px-[10px] gap-1 truncate">
            <SearchIcon
                size={24}
                className="my-[5px] hover:cursor-pointer flex-none"
                onClick={handleSearch}
            />
            <input
                ref={inputRef}
                value={keyword}
                onChange={handleChange}
                type="text"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                className="bg-transparent outline outline-none w-full flex-auto"
                onKeyDown={handleCheckEnter}
            />
            {isSearching && (
                <CloseIcon
                    onClick={handleCloseSearch}
                    className="cursor-pointer text-[#757575] flex-none"
                />
            )}
        </div>
    );
};

export default SearchInput;