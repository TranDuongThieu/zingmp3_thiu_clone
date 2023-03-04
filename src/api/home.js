import axios from "../axios";
export const getHome = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/home",
                method: "get",
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
    export const getNewRelease = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/newreleasechart",
                method: "get",
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

    export const getTop100 = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/top100",
                method: "get",
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

    export const getZingChartHome = () =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/charthome",
                method: "get",
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });