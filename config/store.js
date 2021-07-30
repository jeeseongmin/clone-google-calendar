import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "../reducers/settingSlice";
import userReducer from "../reducers/userSlice";
import eventReducer from "../reducers/eventSlice";

export const store = configureStore({
	reducer: {
		setting: settingReducer,
		user: userReducer,
		event: eventReducer,
	},
});
