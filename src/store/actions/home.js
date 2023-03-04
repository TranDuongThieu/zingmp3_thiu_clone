import actionTypes from "./actionTypes";

import * as api from "../../api";
// export const getHome = () => async (dispatch) => {
//     try {
//         const response = await api.getHome();
//         if (response?.data.err === 0) {
//             dispatch({
//                 type: actionTypes.GET_HOME,
//                 homeData: response.data.data.items,
//             });
//         } else {
//             dispatch({
//                 type: actionTypes.GET_HOME,
//                 homeData: null,
//             });
//         }
//     } catch (error) {
//         dispatch({
//             type: actionTypes.GET_HOME ,
//             homeData: null,
//         });
//     }
// };
export const getHome = (homeData) => {
    return { type : actionTypes.GET_HOME, homeData};
};
export const setCurrentWidth = (width) => {
    return {
        type: actionTypes.SET_CURRENT_WIDTH,
        width,
    };
};
