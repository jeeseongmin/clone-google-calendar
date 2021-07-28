import React, { useState, useEffect } from "react";
import DayInMonth from "./DayInMonth";

const WeekInMonth = (props) => {
	const [dayArr, setDayArr] = useState([]);

	const weekData = props.weekData;
	const month = props.month;

	useEffect(() => {
		const dayData = weekData;
		const arr = [];
		for (var i = 0; i < 7; i++) {
			arr.push(dayData.add(i, "day"));
		}
		setDayArr(arr);
	}, []);

	return (
		<div class="grid grid-flow-row grid-cols-7 grid-rows-1 relative">
			{dayArr.map((element, index) => {
				return <DayInMonth key={element} dayData={element} month={month} />;
			})}
			<div class="w-full h-full pb-8 absolute top-8">
				
			</div>
		</div>
	);
};

export default WeekInMonth;
