import axios from "../axios";
export const apiGetSong = (songId) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/song",
                method: "get",
                params: { id: songId },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apigetDetailSong = (songId) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/infosong",
                method: "get",
                params: { id: songId },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetPlaylist = (playlistId) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/detailplaylist",
                method: "get",
                params: { id: playlistId },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiSearch = (keyword) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: "/search",
                method: "get",
                params: { keyword },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

