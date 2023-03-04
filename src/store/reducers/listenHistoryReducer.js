import actionTypes from "../actions/actionTypes";
const initialState = {
    listenHistory:[]
}

export default function ListenHistoryReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.PUSH_LISTEN_HISTORY:
            {
                const newListenHistory = state.listenHistory.filter(item => item?.encodeId !== action.data.encodeId)
                return {...state, listenHistory : [action.data, ...newListenHistory]}
                
            }
        default:
            return state;
    }
}
