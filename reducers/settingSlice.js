import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const name = "setting";

//viewType : "Week", "Year", "Month", "Day"

const initialState = {
	isToggled: true,
	profileModal: false,
	viewModal: false,
	viewType: "Year",
	fontColor: "black",
	option: ["weekend", "rejected"],
	participant: [],
	focusDate: dayjs(),
	leftbarDate: dayjs(),
};

export const settingSlice = createSlice({
	name: name,
	initialState,
	reducers: {
		toggleSidebar: (state, action) => {
			state.isToggled = action.payload;
		},
		toggleProfile: (state, action) => {
			state.profileModal = action.payload;
		},
		toggleViewModal: (state, action) => {
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
		resetSetting: (state) => {
			state = initialState;
		},
	},
});
// Action creators are generated for each case reducer function
export const {
	toggleSidebar,
	toggleProfile,
	toggleViewModal,
	changeView,
	updateFontColor,
	updateOption,
	updateParticipant,
	updateFocusDate,
	updateLeftbarDate,
	resetSetting,
} = settingSlice.actions;

export default settingSlice.reducer;
