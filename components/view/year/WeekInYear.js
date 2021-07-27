import React, { useState, useEffect } from "react";
import DayInYear from "./DayInYear";

const WeekInYear = (props) => {
	const [weekArr, setWeekArr] = useState([]);
	const weekData = props.weekData;
	const month = props.month;
	console.log(weekData);

	useEffect(() => {
		const dayData = weekData;
		const arr = [];
		for (var i = 0; i < 7; i++) {
			arr.push(dayData.add(i, "day"));
		}
		setWeekArr(arr);
	}, []);

	return (
		<div class="pt-2 px-1 grid grid-flow-row grid-cols-7 grid-rows-1 gap-1">
			{weekArr.map((element, index) => {
				return <DayInYear key={element} dayData={element} month={month} />;
			})}
		</div>
	);
};

export default WeekInYear;
