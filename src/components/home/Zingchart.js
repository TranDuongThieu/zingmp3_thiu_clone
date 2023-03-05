import React, { memo, useEffect, useRef, useState } from "react";
import bgChart from "../../assets/bg-chart.jpg";
import { PlayIconFill } from "../../ultis/icons";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import lodash from "lodash";
import SongInChart from "./SongInChart";
import { Link } from "react-router-dom";
import path from "../../ultis/path";
const Zingchart = () => {
    const [data, setData] = useState();
    const { chart, rank } = useSelector((state) => state.app);
    const [selected, setSelected] = useState();
    const chartRef = useRef();
    const { width } = useSelector((state) => state.app);

    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: { display: false },
                grid: { color: "rgba(255,255,255,0.1)", drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: "white" },
                grid: { color: "transparent" },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return;
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0)
                            setTooltipState((prev) => ({
                                ...prev,
                                opacity: 0,
                            }));
                        return;
                    }
                    const counter = [];
                    for (let i = 0; i < 3; i++) {
                        counter.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]
                                ?.filter((time) => +time.hour % 2 === 0)
                                ?.map((item) => item?.counter),
                            encodeId: Object.keys(chart?.items)[i],
                        });
                    }

                    const rs = counter.find((item) =>
                        item.data.some(
                            (i) =>
                                i ===
                                +tooltip?.body[0]?.lines[0].replace(",", "")
                        )
                    );
                    setSelected(rs.encodeId);
                    const newTooltip = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    };
                    if (!lodash.isEqual(tooltipState, newTooltip))
                        setTooltipState(newTooltip);
                },
            },
        },

        hover: {
            mode: "dataset",
            intersect: false,
        },
    };
    useEffect(() => {
        const labels = chart?.times
            ?.filter((time) => +time?.hour % 2 === 0)
            ?.map((item) => item?.hour + ":00");
        const datasets = [];
        if (chart?.items)
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]
                        ?.filter((time) => +time.hour % 2 === 0)
                        ?.map((item) => item?.counter),
                    borderColor:
                        i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
                    tension: 0.3,
                    borderWidth: 2,
                    pointBackgroundColor: "white",
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 5,
                    pointBorderColor:
                        i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
                });
                setData({ labels, datasets });
            }
    }, [chart]);
    return (
        <div className="w-full ">
            {chart && rank && (
                <div className={`w-full relative rounded-[10px] ${width <1280 ? "h-[750px]": "h-[410px]"}`}>
                    <img
                        src={bgChart}
                        alt=""
                        className="w-full object-cover max-h-[800px] h-full  rounded-[10px]"
                    />

                    <div className=" rounded-[10px] absolute  top-0 left-0 bottom-0 right-0  bg-gradient-to-t from-[#740091] to-[#2d1a4c] opacity-[0.95]"></div>
                    <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col ">
                        <div className="flex text-white text-[28px] items-center gap-2 m-[20px] mb-0">
                            <Link
                                to={path.ZING_CHART}
                                className="font-bold hover:text-[#0f7070] cursor-pointer"
                            >
                                #zingchart
                            </Link>
                            <PlayIconFill className="cursor-pointer hover:text-[#0f7070]" />
                        </div>
                        <div
                            className={`flex text-white text m-[20px] gap-4   ${
                                width < 1280 ? "flex-col h-[750px]" : "flex-row"
                            }`}
                        >
                            <div className={`w-[5/12] flex flex-col gap-[20px] items-center ${width>1280 ? "order1" :"order-2"}`}>
                                <div className="flex flex-col gap-[10px] w-full">
                                    {rank?.slice(0, 3).map((item, index) => (
                                        <SongInChart
                                            key={item?.encodeId}
                                            encodeId={item?.encodeId}
                                            index={index + 1}
                                            thumbnail={item?.thumbnail}
                                            title={item?.title}
                                            artistsNames={item?.artistsNames}
                                            percent={Math.round(
                                                (item?.score /
                                                    chart?.totalScore) *
                                                    100
                                            )}
                                        />
                                    ))}
                                </div>
                                <div className=" cursor-pointer hover:bg-[hsla(0,0%,100%,.1)] text-center w-fit whitespace-nowrap text-white px-[25px] py-[5px]  rounded-2xl border border-white">
                                    Xem thêm
                                </div>
                            </div>
                            <div className={` max-h-[300px] relative ${width <1280 ? "w-full order-1":"w-7/12 order-2"}`}>
                                {data && (
                                    <Line
                                    className="w-full"
                                        data={data}
                                        options={options}
                                        ref={chartRef}
                                    />
                                )}
                                <div
                                    className="tooltip absolute"
                                    style={{
                                        top: tooltipState.top,
                                        left: tooltipState.left,
                                        opacity: tooltipState.opacity,
                                    }}
                                >
                                    <SongInChart
                                        thumbnail={
                                            rank?.find(
                                                (i) => i.encodeId === selected
                                            )?.thumbnail
                                        }
                                        title={
                                            rank?.find(
                                                (i) => i.encodeId === selected
                                            )?.title
                                        }
                                        artistsNames={
                                            rank?.find(
                                                (i) => i.encodeId === selected
                                            )?.artistsNames
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(Zingchart);
