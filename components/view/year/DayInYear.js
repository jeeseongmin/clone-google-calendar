import React from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

const DayInYear = (props) => {
	const dayData = props.dayData;
	const month = props.month;
	const focusDate = useSelector((state) => state.setting.focusDate);

	if (dayjs().format("YYYY-MM-DD") === dayData.format("YYYY-MM-DD")) {
		return (
			<div class="w-6 h-6 cursor-pointer flex justify-center rounded-full items-center bg-blue-600 text-white">
				{dayData.date()}
			</div>
		);
	} else if (
		month === focusDate.month() &&
		dayData.format("YYYY-MM-DD") === focusDate.format("YYYY-MM-DD")
	) {
		return (
			<div class="w-6 h-6 cursor-pointer flex justify-center rounded-full items-center bg-blue-100 text-blue-600">
				{dayData.date()}
			</div>
		);
	} else {
		return (
			<div class="w-6 h-6 cursor-pointer flex justify-center rounded-full items-center hover:bg-gray-100">
				{dayData.date()}
			</div>
		);
	}
};

export default DayInYear;
