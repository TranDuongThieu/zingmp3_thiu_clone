import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { apiSearch } from "../../../api";
import actionTypes from "../../../store/actions/actionTypes";
import { Loading } from "../../../ultis/icons";
import path from "../../../ultis/path";
import SearchAll from "./SearchAll";

const Search = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const keyword = useSelector((state) => state.searchReSults.searchId);
    useEffect(() => {
        const fetchData = async () => {
            setLoaded(false);
            const res = await apiSearch(keyword);
            if (res.data.err === 0) {
                dispatch({
                    type: actionTypes.SEARCH,
                    data: res.data.data,
                });
            } else
                dispatch({
                    type: actionTypes.SEARCH,
                    data: 0,
                });
                setLoaded(true);
        };
        fetchData();

    }, [keyword]);
    return (
        <div className="max-w-[1442px] mb-[200px] px-[59px]">
            <div className="text-[24px] font-bold pr-5 border-b-[1px] border-b-[rgba(0,0,0,0.1)]  mb-[20px]">
                Kết Quả Tìm Kiếm
            </div>
            {loaded ? <SearchAll /> : <Loading />}
        </div>
    );
};

export default Search;
