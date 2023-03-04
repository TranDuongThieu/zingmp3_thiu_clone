import { Routes, Route } from "react-router-dom";
import {
    Home,
    Public,
    Album,
    Top100,
} from "./containers/public";
import * as apis from "./api";
import path from "./ultis/path";
import * as actions from "./store/actions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { WeekRank } from "./containers/public";
import NewReleasePage from "./containers/public/NewReleasePage";
import { Search, SearchAll } from "./containers/public/Search";
import { getHome } from "./store/actions";
import { Loading } from "./ultis/icons";
function App() {
    const dispatch = useDispatch();
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
    const setWidth = (e) => {
        setCurrentWidth(e.target.innerWidth);
    };
    const [loaded, setLoaded] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoaded(false);
            const response = await apis.getHome();
            if (response?.data?.err === 0) {
                dispatch(getHome(response?.data?.data?.items));
            } else {
                dispatch(getHome(null));
            }
            setLoaded(true);
        };
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        window.addEventListener("resize", setWidth);
        return () => {
            window.removeEventListener("resize", setWidth);
        };
    });
    useEffect(() => {
        dispatch(actions.setCurrentWidth(currentWidth));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWidth]);
    useEffect(() => {
        dispatch(actions.getHome());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-w-[700px]">
            {loaded ? (
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.ALBUM} element={<Album />} />
                        <Route path={path.PLAYLIST} element={<Album />} />
                        <Route
                            path={path.WEEK_RANK_TITLE_PID}
                            element={<WeekRank />}
                        />
                        <Route
                            path={path.NEW_RELEASE}
                            element={<NewReleasePage />}
                        />
                        <Route path={path.TOP_100} element={<Top100 />} />
                        <Route path={path.SEARCH} element={<Search />}>
                            <Route
                                path={path.SEARCH_ALL}
                                element={<SearchAll />}
                            />
                        </Route>

                        <Route path={path.STAR} element={<Home />} />
                    </Route>
                </Routes>
            ) : (
                <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"><Loading /></div>
            )}
        </div>
    );
}

export default App;
