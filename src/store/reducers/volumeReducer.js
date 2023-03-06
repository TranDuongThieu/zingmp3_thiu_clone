import actionTypes from "../actions/actionTypes";

const initialState = {
    volume: 50,
    volumeBeforeMute: 0,
};
export default function volumeReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_VOLUME:
            return { ...state, volume: action.volume };
        case actionTypes.MUTE_VOLUME:
            return {...state, volumeBeforeMute: action.volume}
        default:
            return state;
    }
}
