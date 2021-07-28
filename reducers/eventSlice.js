import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const name = "event";

const initialState = {
	event: {},
};

export const eventSlice = createSlice({
	name: name,
	initialState,
	reducers: {
		// 초기 Event 세팅
		setEvent: (state, action) => {
			state.event = action.payload;
		},
		// 새로운 Event 추가
		addEvent: (state, action) => {},

		//
		updateEvent: (state, action) => {},
	},
});

export const { setEvent, addEvent, updateEvent, deleteEvent } =
	eventSlice.actions;

export default eventSlice.reducer;
