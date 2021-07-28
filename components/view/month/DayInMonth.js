import React from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

const DayInMonth = (props) => {
	const dayData = props.dayData;
	const month = props.month;
	const focusDate = useSelector((state) => state.setting.focusDate);

	const dateText =
		dayData.date() === 1
			? dayData.month() + "월 " + dayData.date() + "일"
			: dayData.date();

	let dateComponent;
	if (dayjs().format("YYYY-MM-DD") === dayData.format("YYYY-MM-DD")) {
		dateComponent = (
			<div class="w-auto h-auto p-1 cursor-pointer rounded-full bg-blue-600 text-white flex justify-center items-center">
				{dateText}
			</div>
		);
	} else if (
		month === focusDate.month() &&
		dayData.format("YYYY-MM-DD") === focusDate.format("YYYY-MM-DD")
	) {
		dateComponent = (
			<div class="hover:bg-gray-100 w-auto h-auto p-1 cursor-pointer rounded-full bg-blue-100 text-blue-600 flex justify-center items-center">
				{dateText}
			</div>
		);
	} else if (month === dayData.month()) {
		dateComponent = (
			<div class="hover:bg-gray-100 w-auto h-auto p-1 cursor-pointer rounded-full text-black flex justify-center items-center">
				{dateText}
			</div>
		);
	} else {
		dateComponent = (
			<div class="hover:bg-gray-100 w-auto h-auto p-1 cursor-pointer rounded-full text-gray-400 flex justify-center items-center">
				{dateText}
			</div>
		);
	}

	return (
		<div class="pt-1 text-gray-700 text-xs font-medium w-full h-full flex justify-center items-start border-l border-b border-gray-300">
			{dateComponent}
			<div></div>
		</div>
	);
};

export default DayInMonth;
