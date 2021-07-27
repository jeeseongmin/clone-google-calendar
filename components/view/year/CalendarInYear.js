import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeekInYear from "./WeekInYear";

const CalendarInYear = (props) => {
	const [monthArr, setMonthArr] = useState([]);
	const monthData = props.monthData;
	const focusDate = useSelector((state) => state.setting.focusDate);
	const year = focusDate.year();

	// 달의 첫날이 있는 주의 첫째 날 data를 기준으로 배열로 만든다.
	useEffect(() => {
		const weekData = monthData.day(0);
		const arr = [];
		for (var i = 0; i < 6; i++) {
			arr.push(weekData.add(i * 7, "day"));
		}
		setMonthArr(arr);
	}, []);

	return (
		<div class="w-full text-xs text-gray-700">
			<div class="mb-2 w-full flex flex-row justify-start items-center font-medium text-gray-700 ">
				<p>{monthData.month() + 1}월</p>
			</div>
			<div class="text-xs px-1 grid grid-flow-row grid-cols-7 grid-rows-1 gap-1">
				<div class="w-6 flex justify-center items-center">일</div>
				<div class="w-6 flex justify-center items-center">월</div>
				<div class="w-6 flex justify-center items-center">화</div>
				<div class="w-6 flex justify-center items-center">수</div>
				<div class="w-6 flex justify-center items-center">목</div>
				<div class="w-6 flex justify-center items-center">금</div>
				<div class="w-6 flex justify-center items-center">토</div>
			</div>
			{monthArr.map((element, index) => {
				return (
					<WeekInYear
						key={element}
						weekData={element}
						month={monthData.month()}
					/>
				);
			})}
		</div>
	);
};

export default CalendarInYear;
