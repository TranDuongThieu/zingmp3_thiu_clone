import actionTypes from "./actionTypes";
export const setCurrentSong = (songId) => ({
    type: actionTypes.SET_CURRENT_SONG_ID,
    songId,
});
export const setPlaylist = (data) => ({
    type: actionTypes.SET_PLAYLIST,
    data,
});
export const setPlaylistId = (playlistId) => ({
    type: actionTypes.SET_PLAYLIST_ID,
    playlistId,
});
export const setCurrentSongInfo = (songInfo) => ({
    type: actionTypes.SET_CURRENT_SONG_INFO,
    songInfo,
});
