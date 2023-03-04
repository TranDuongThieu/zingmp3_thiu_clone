import actionTypes from "../actions/actionTypes";

const initialState = {
    isPlaying: false,
};
export default function isPlayingReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.PLAY:
            return { ...state, isPlaying: action.flag };
        default:
            return state;
    }
}
