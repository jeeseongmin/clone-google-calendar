import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const name = "setting";

//viewType : "Week", "Year", "Month", "Day"

const initialState = {
	currentUser: {},
	isToggled: true,
	profileModal: false,
	calendarModal: {
		isClicked: false,
		week: null,
		date: null,
		start: dayjs(),
		end: dayjs(),
	},
	viewModal: false,
	viewType: "Year",
	fontColor: "black",
	option: ["weekend", "rejected"],
	participant: [],
	focusDate: dayjs(),
	leftbarDate: dayjs(),
	tempColor: "default",
	startDate: dayjs(),
	endDate: dayjs(),
};

export const settingSlice = createSlice({
	name: name,
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
		toggleSidebar: (state, action) => {
			state.isToggled = action.payload;
		},
		updateStartDate: (state, action) => {
			state.startDate = action.payload;
		},
		updateEndDate: (state, action) => {
			state.endDate = action.payload;
		},
		toggleProfile: (state, action) => {
			state.profileModal = action.payload;
		},
		toggleCalendarModal: (state, action) => {
			state.calendarModal.isClicked = action.payload.isClicked;
			state.calendarModal.week = action.payload.week;
			state.calendarModal.date = action.payload.date;
		},
		toggleViewModal: (state, action) => {
			console.log(action.payload);
			state.viewModal = action.payload;
		},
		changeView: (state, action) => {
			state.viewType = action.payload;
		},
		updateFontColor: (state, action) => {
			state.fontColor = action.payload;
		},
		updateOption: (state, action) => {
			state.option = action.payload;
		},
		updateParticipant: (state, action) => {
			state.participant = action.payload;
		},
		updateFocusDate: (state, action) => {
			state.focusDate = action.payload;
		},
		updateLeftbarDate: (state, action) => {
			state.leftbarDate = action.payload;
		},
		setTempColor: (state, action) => {
			state.tempColor = action.payload;
		},
		resetSetting: (state) => {
			state = initialState;
		},
	},
});
// Action creators are generated for each case reducer function
export const {
	setCurrentUser,
	toggleSidebar,
	toggleProfile,
	toggleCalendarModal,
	toggleViewModal,
	changeView,
	updateFontColor,
	updateOption,
	updateParticipant,
	updateFocusDate,
	updateLeftbarDate,
	resetSetting,
	setTempColor,
	updateStartDate,
	updateEndDate,
} = settingSlice.actions;

export default settingSlice.reducer;
