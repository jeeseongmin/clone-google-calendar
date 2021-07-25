import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		//여기에 다른 리듀서를 추가 하면 됩니다.
	},
});
