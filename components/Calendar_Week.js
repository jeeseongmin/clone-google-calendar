import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Calendar_Day from "./Calendar_Day";

const Calendar_Week = (props) => {
	const [week, setWeek] = useState([]);
	const _week = props.week;
	const _date = props.date;
	console.log("week", _week);
	console.log("date", _date);

	// 주차별
	useEffect(() => {
		let weekArr = [];

		const firstDayInWeek = _date.startOf("month").add(7 * _week, "day");

		for (var i = 0; i < 7; i++) {
			var cp = {
				date: firstDayInWeek.day(i),
				day: firstDayInWeek.day(i).date(),
				currentMonth: _date.month(),
			};
			weekArr[i] = cp;
		}
		setWeek(weekArr);
	}, []);

	return (
		<tr class="mt-2 w-56 text-xs font-light text-gray-500 flex flex-row justify-start">
			{week.map((element, index) => {
				return <Calendar_Day obj={element} />;
			})}
		</tr>
	);
};

export default Calendar_Week;
