import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const name = "user";

const initialState = {
	user: {},
};

export const userSlice = createSlice({
	name: name,
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		addUser: (state, action) => {
			const key = action.payload.key;
			const obj = action.payload.obj;
			state.user[key] = obj;
		},
		// 일정을 추가할 때 혹은 초대될 때
		addUserEvent: (state, action) => {
			const event_key = action.payload.event_uuid;
			const user_key = action.payload.user;
			const event = action.payload.event;
			state.user[user_key].event[event_key] = event;
		},
		updateUserEvent: (state, action) => {
			const event_key = action.payload.event_key;
			const user_key = action.payload.user;
			const event = action.payload.event;
			state.user[user_key].event[event_key].title = event.title;
			state.user[user_key].event[event_key].description = event.description;
		},
		deleteUserEvent: (state, action) => {
			const event_key = action.payload.event_key;
			const user_key = action.payload.user;
			state.user[user_key].event[event_key].isDeleted = true;
		},
		// 게스트가 자신의 일정 중에 삭제하고 싶을 때
		rejectEvent: (state, action) => {
			const event_key = action.payload.event_key;
			const user_key = action.payload.user;
			const rejected = action.payload.rejected;
			const rejected_key = action.payload.rejected_key;
			state.user[user_key].event[event_key].rejected[rejected_key] = rejected;
		},
		addMyCalendar: (state, action) => {
			const calendar_key = uuidv4();
			const user_key = action.payload.user;
			const calendar = action.payload.calendar;
			state.user[user_key].myCalendar[calendar_key] = calendar;
		},
		deleteMyCalendar: (state, action) => {
			const calendar_key = action.payload.calendar_key;
			const user_key = action.payload.user;
			delete state.user[user_key].myCalendar[calendar_key];
		},
		toggleMyCalendar: (state, action) => {
			const calendar_key = action.payload.calendar_key;
			const user_key = action.payload.user;
			const isChecked = state.user[user_key].myCalendar[calendar_key].isChecked;
			state.user[user_key].myCalendar[calendar_key].isChekced = !isChecked;
		},
		changeMyCalendarColor: (state, action) => {
			const calendar_key = action.payload.calendar_key;
			const user_key = action.payload.user;
			const color = action.payload.color;
			state.user[user_key].myCalendar[calendar_key].color = color;
		},
		changeMyCalendarName: (state, action) => {
			const calendar_key = action.payload.calendar_key;
			const user_key = action.payload.user;
			const name = action.payload.name;
			state.user[user_key].myCalendar[calendar_key].name = name;
		},
	},
});

export const {
	setUser,
	addUser,
	addUserEvent,
	updateUserEvent,
	deleteUserEvent,
	rejectEvent,
	addMyCalendar,
	deleteMyCalendar,
	toggleMyCalendar,
	changeMyCalendarColor,
	changeMyCalendarName,
} = userSlice.actions;

export default userSlice.reducer;
