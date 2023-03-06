import actionTypes from "../actions/actionTypes";

const initialState = {
    isRepeat: false,
    isShuffle: false,
} 
export default function isRepeatReducer(state = initialState, action){
    switch (action.type) {
        case actionTypes.REPEAT:
            return { ...state, isRepeat: action.flag };
        case actionTypes.SHUFFLE:
            return {...state, isShuffle: action.flag}
        default:
            return state;
    }
}
