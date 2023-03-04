import { combineReducers } from "redux";
import appReducer from "./appReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import musicReducer from "./musicReducer";
import isPlayingReducer from "./isPlayingReducer";
import volumeReducer from "./volumeReducer";
import isRepeatReducer from "./isRepeatReducer";
import ListenHistoryReducer from "./listenHistoryReducer";
import searchReducer from "./searchReducer";
const commonCofig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};
const musicConfig = {
    ...commonCofig,
    key: "current-music",
    whilelist: ["currentSongId"],
};

const listenHistoryStorage = {
    ...commonCofig,
    key : 'listen-history',
    whitelist:["listenHistory"],
}
const volumeStorage = {
    ...commonCofig,
    key: "current-volume",
    blacklist: ["currentVolume"],
};
const isRepeatStorage = {
    ...commonCofig,
    key: "current-is-repeat",
    blacklist: ["currentIsRepeat"],
};
const rootReducer = combineReducers({
    app: appReducer,
    isPlaying: isPlayingReducer,
    searchReSults: searchReducer,
    storagevolume: persistReducer(volumeStorage, volumeReducer),
    storagesong: persistReducer(musicConfig, musicReducer),
    storageRepeat: persistReducer(isRepeatStorage, isRepeatReducer),
    listenHistory: persistReducer(listenHistoryStorage, ListenHistoryReducer),
});
export default rootReducer;
