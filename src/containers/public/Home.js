import { useSelector } from "react-redux";
import {
    Zingchart,
    HomePlaylist,
    NewRelease,
    HomeRadio,
    Slider,
} from "../../components";
const Home = () => {
    const homeDataSelector = useSelector((state) => state.app.homedata);
    const playlist = homeDataSelector?.filter(
        (item) => item.sectionType === "playlist"
    );
    const radio = useSelector((state) => state?.app?.home_radio);
    const { width } = useSelector((state) => state?.app);
    const weekChart = useSelector((state) => state?.app?.week_chart[0]);
    let col = width > 700 ? 3 : 2;
    return (
        <div className="w-full flex justify-center pt-8">
            <div
                className={`flex flex-col justify-center w-full max-w-[1442px] gap-12 mb-[160px] ${
                    width > 700 ? " px-[59px]" : "px-3"
                }`}
            >
                <Slider />
                <NewRelease />
                <HomePlaylist
                    title={playlist[0]?.title}
                    list={playlist[0]?.items}
                />
                <HomePlaylist
                    title={playlist[1]?.title}
                    list={playlist[1]?.items}
                />
                {width > 400 && <HomeRadio list={radio[0]} />}

                <HomePlaylist
                    title={playlist[2]?.title}
                    list={playlist[2]?.items}
                />
                {width > 400 && <Zingchart />}
                <div className="flex gap-[12px]">
                    {weekChart?.items?.slice(0, col).map((item, index) => (
                        <div
                            key={item?.link}
                            className={`${col === 2 ? "w-1/2" : "w-1/3"}`}
                        >
                            <img
                                src={item?.cover}
                                alt="cover"
                                className="w-full object rounded-md"
                            />
                        </div>
                    ))}
                </div>
                <HomePlaylist
                    title={playlist[3]?.title}
                    list={playlist[3]?.items}
                />
                <HomePlaylist
                    title={playlist[4]?.title}
                    list={playlist[4]?.items}
                />
            </div>
        </div>
    );
};

export default Home;
