import actionTypes from "../actions/actionTypes";

const initialState = {
    currentSongId: null,
    currentSongInfo: null,
    playlistData: null,
    playlistId:null,
};
export default function musicReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CURRENT_SONG_ID:
            return { ...state, currentSongId: action.songId || null };
        case actionTypes.SET_PLAYLIST_ID:
            return { ...state, playlistId: action.playlistId}
        case actionTypes.SET_CURRENT_SONG_INFO: {
            return { ...state, currentSongInfo: action.songInfo };
        }
        case actionTypes.SET_PLAYLIST:{
            return {...state, playlistData: action.data}
        }
        default:
            return state;
    }
}
