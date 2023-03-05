import actionTypes from "./actionTypes";

export const setLoaded = (flag)=> ({
    type : actionTypes.SET_LOADED,
    flag,
})