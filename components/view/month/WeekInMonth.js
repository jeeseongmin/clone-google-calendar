import React, { useState, useEffect } from "react";
import DayInMonth from "./DayInMonth";
import { useDispatch, useSelector } from "react-redux";
import { toggleCalendarModal } from "../../../reducers/settingSlice";

const WeekInMonth = (props) => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.setting.currentUser);
	const calendarModal = useSelector((state) => state.setting.calendarModal);
	console.log(calendarModal);
	const user = useSelector((state) => state.user.user);
	const userInfo = user[currentUser.uuid];
	const week = props.week;
	const myEvent = userInfo.event;
	console.log("myEvent", myEvent);
	const [dayArr, setDayArr] = useState([]);

	const weekData = props.weekData;
	const month = props.month;
	const weekStart = weekData.day(0).date();
	const weekEnd = weekData.day(7).date();

	/* 
		* 필터링하기.
		* type에 따라 두 개의 어레이에 나눠서 추가 한다. (allDay / default)
		- weekEnd보다 period.start가 뒤인 것은 제외 (이후 일어날 일)
		1. 종일 이벤트 아닐 떄 (type === default) 
			(1) 반복이벤트인 경우 (repeat.type === "repeat")
				_1. repeat.end가 weekStart보다 뒤에 있는 경우 : default에 추가
				_2. repeat.end가 없는 경우 : default에 추가
			(2) 반복이벤트 아닌 경우 (repeat.type === "none") : default에 추가
		2. 종일 이벤트일 때 (type === "allDay")
			(1) 반복이벤트인 경우 (repeat.type === "repeat")
				_1. repeat.end가 weekStart보다 뒤에 있는 경우 : 추가
				_2. repeat.end가 없는 경우 : 추가

		* 정렬하기

		


		종일 이벤트 일 때 (type === allDay)
		2. weekStart보다 period.start가 
		1. 먼저 이번주 안에 있는지 확인.



	*/

	useEffect(() => {
		const dayData = weekData;
		const arr = [];
		for (var i = 0; i < 7; i++) {
			arr.push(dayData.add(i, "day"));
		}
		setDayArr(arr);
	}, []);

	return (
		<div class="z-20 grid grid-flow-row grid-cols-7 grid-rows-1 relative">
			{dayArr.map((element, index) => {
				return (
					<DayInMonth
						key={element}
						dayData={element}
						month={month}
						week={week}
					/>
				);
			})}
			{/* block 리스트를 추린다음에 여기에 차곡차곡 렌더링하면 될듯! */}
			<div class="bg-pink w-full h-full pb-8 absolute top-8">
				{calendarModal.week === week && calendarModal.isClicked && (
					<div class="w-full h-6 "></div>
				)}
				{/* <div class="w-full h-6  rounded-md bg-blue-300"></div> */}
				{/* <div class="w-full h-6 border border-black"></div> */}
			</div>
		</div>
	);
};

export default WeekInMonth;
