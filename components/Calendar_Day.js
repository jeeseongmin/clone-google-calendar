import React from "react";
import dayjs from "dayjs";
import {
	updateFocusDate,
	toggleCalendarModal,
	updateStartDate,
	updateEndDate,
} from "../reducers/settingSlice";
import { useDispatch, useSelector } from "react-redux";

const Calendar_Day = (props) => {
	const dispatch = useDispatch();
	const focusDate = useSelector((state) => state.setting.focusDate);
	const calendarModal = useSelector((state) => state.setting.calendarModal);
	const obj = props.obj;
	const date = obj.date;
	const type = props.type;
	const realMonth = obj.date.month();
	const currentMonth = obj.currentMonth;

	const onFocusDate = () => {
		console.log(type);
		if (type === "modalStartDate") {
			dispatch(updateStartDate(obj.date.startOf("day")));
			dispatch(updateEndDate(obj.date.startOf("day").add(30, "minute")));
			dispatch(updateFocusDate(date));
		} else if (type === "modalEndDate") {
			dispatch(updateEndDate(obj.date.endOf("day")));
			dispatch(updateFocusDate(date));
		} else {
			dispatch(updateFocusDate(date));
		}
	};

	if (
		type === "leftbar" &&
		dayjs().format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
	) {
		return (
			<th
				onClick={onFocusDate}
				class="flex-grow-1 w-6 h-6 p-1 font-medium text-white cursor-pointer rounded-full bg-blue-600"
			>
				{obj.day}
			</th>
		);
	} else if (date.format("YYYY-MM-DD") === focusDate.format("YYYY-MM-DD")) {
		return (
			<th
				onClick={onFocusDate}
				class="flex-grow-1 w-6 h-6 p-1 cursor-pointer rounded-full bg-blue-100 text-blue-600 font-semibold"
			>
				{obj.day}
			</th>
		);
	} else if (realMonth === currentMonth) {
		return (
			<th
				onClick={onFocusDate}
				class="flex-grow-1 w-6 h-6 p-1 font-medium text-black cursor-pointer rounded-full hover:bg-gray-100"
			>
				{obj.day}
			</th>
		);
	} else {
		return (
			<th
				onClick={onFocusDate}
				class="flex-grow-1 w-6 h-6 p-1 font-medium text-gray-400 cursor-pointer rounded-full hover:bg-gray-100"
			>
				{obj.day}
			</th>
		);
	}
};

export default Calendar_Day;

// const areEqual = (prevProps, nextProps) => {
// 	console.log(prevProps);
// 	return prevProps.obj === nextProps.obj;
// };

// export default React.memo(Calendar_Day, areEqual);
