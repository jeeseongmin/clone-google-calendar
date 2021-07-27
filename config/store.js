import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "../reducers/settingSlice";

export const store = configureStore({
	reducer: {
		setting: settingReducer,
	},
});
