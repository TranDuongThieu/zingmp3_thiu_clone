import actionTypes from "./actionTypes";
export const setCurrentVolume = (volume) => ({
    type: actionTypes.SET_VOLUME,
    volume,
});
export const muteVolume = (volume) => ({
    type: actionTypes.MUTE_VOLUME,
    volume,
})