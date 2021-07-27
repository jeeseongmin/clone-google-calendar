import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import reducers from "../reducers";

import settingReducer from "../reducers/settingSlice";
import { composeWithDevTools } from "redux-devtools-extension";
// 새로고침해도 state가 유지되도록 redux-persist를 사용.
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import settingSlice from "./settingSlice";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	settingSlice,
});

export default persistReducer(persistConfig, rootReducer);
