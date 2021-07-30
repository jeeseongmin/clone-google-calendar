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
		addEvent: (state, action) => {
			const event_key = uuidv4();
			const event = action.payload.event;
			state.event[event_key] = event;
		},

		// event 내용 수정
		// (title, description, period, type, participants, repeat)
		updateEvent: (state, action) => {},

		deleteEvent: (state, action) => {
			const event_key = action.payload.event_key;
			state.event[event_key].isDeleted = true;
		},
	},
});

export const { setEvent, addEvent, updateEvent, deleteEvent } =
	eventSlice.actions;

export default eventSlice.reducer;
