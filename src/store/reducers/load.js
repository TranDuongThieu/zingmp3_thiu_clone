import actionTypes from "../actions/actionTypes";

const initialState = {
    loaded: false,
};

export const loadReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADED:
            return { ...state, loaded: action.flag };

        default:
            return state;
    }
};
