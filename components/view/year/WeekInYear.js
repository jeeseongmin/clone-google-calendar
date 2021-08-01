import React, { useState, useEffect,useLayoutEffect } from "react";
import DayInYear from "./DayInYear";

const WeekInYear = (props) => {
	const [dayArr, setDayArr] = useState([]);
	const weekData = props.weekData;
	const month = props.month;

	useLayoutEffect(() => {
		const dayData = weekData;
		const arr = [];
		for (var i = 0; i < 7; i++) {
			arr.push(dayData.add(i, "day"));
		}
		setDayArr(arr);
	}, []);

	return (
		<div class="pt-2 px-1 grid grid-flow-row grid-cols-7 grid-rows-1 gap-1">
			{dayArr.map((element, index) => {
				return <DayInYear key={element} dayData={element} month={month} />;
			})}
		</div>
	);
};

export default WeekInYear;
