import actionTypes from "./actionTypes";
export const play = (flag) => ({
    type: actionTypes.PLAY,
    flag,
});
export const repeat = (flag) => ({
    type: actionTypes.REPEAT,
    flag,
});
