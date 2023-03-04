
import actionTypes from "./actionTypes";

// export const search = (keyword) => async (dispatch) => {
//     try {
//         const res = await apiSearch(keyword);
//         if (res.data.err === 0) {
//             dispatch({
//                 type: actionTypes.SEARCH,
//                 data: res.data.data,
//             });
//         } else
//             dispatch({
//                 type: actionTypes.SEARCH,
//                 data: null,
//             });
//     } catch (error) {
//         dispatch({
//             type: actionTypes.SEARCH,
//             data: null,
//         });
//     }
// };
export const searchID = (id)=>({
    type: actionTypes.SET_SEARCH_ID,
    id
})