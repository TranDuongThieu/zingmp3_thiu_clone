import actionTypes from "./actionTypes";
export const getHome = (homeData) => {
    return { type : actionTypes.GET_HOME, homeData};
};
export const setCurrentWidth = (width) => {
    return {
        type: actionTypes.SET_CURRENT_WIDTH,
        width,
    };
};

export const setShowSidebarAction = (data) => {
    return { type : actionTypes.SHOW_LEFT_SIDEBAR, data};
};