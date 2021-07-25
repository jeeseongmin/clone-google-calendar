import React from "react";

const Calendar_Day = (props) => {
	const obj = props.obj;
	console.log("obj", obj);
	const realMonth = obj.date.month();
	const currentMonth = obj.currentMonth;

	if (realMonth === currentMonth) {
		return <th class="flex-grow-1 w-8 text-black">{obj.day}</th>;
	} else {
		return <th class="flex-grow-1 w-8 text-gray-400">{obj.day}</th>;
	}
};

export default Calendar_Day;
