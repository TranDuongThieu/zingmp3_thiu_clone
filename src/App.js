import { Routes, Route } from "react-router-dom";
import {
    Home,
    Login,
    Public,
    Album,
    ZingChartPage,
    Top100,
} from "./containers/public";
import path from "./ultis/path";
import * as actions from "./store/actions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { WeekRank } from "./containers/public";
import NewReleasePage from "./containers/public/NewReleasePage";
import { Search, SearchAll } from "./containers/public/Search";
function App() {
    const dispatch = useDispatch();
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
    const setWidth = (e) => {
        setCurrentWidth(e.target.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", setWidth);
        return () => {
            window.removeEventListener("resize", setWidth);
        };
    });
    useEffect(() => {
        dispatch(actions.setCurrentWidth(currentWidth));
    }, [currentWidth]);
    useEffect(()=>{
        dispatch(actions.getHome())
    },[])

    return (
        <div>
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
                        <Route path={path.SEARCH_ALL} element={<SearchAll />} />
                    </Route>

                    <Route path={path.STAR} element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
