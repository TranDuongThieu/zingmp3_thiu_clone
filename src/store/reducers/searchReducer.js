import actionTypes from "../actions/actionTypes";
const initialState = {
    searchData: null,
    searchSongData: null,
    searchId: null,
};
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH:
            return { ...state, searchData: action.data || null };
        case actionTypes.SEARCH_SONGS_ARTIST: {
            return { ...state, searchSongData: action.data || null };
        }
        case actionTypes.SET_SEARCH_ID:
            return {...state, searchId : action.id}
        default:
            return { ...state };
    }
};

export default searchReducer;
