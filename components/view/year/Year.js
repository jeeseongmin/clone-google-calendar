import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarInYear from "./CalendarInYear";

const Year = () => {
	const [monthArr, setMonthArr] = useState([]);
	const isToggled = useSelector((state) => state.setting.isToggled);
	const focusDate = useSelector((state) => state.setting.focusDate);

	// 해당 년도에 따른 달의 첫 날들을 arr에 담아서 element로 보낸다.
	useEffect(() => {
		const yearData = focusDate.startOf("year");
		const arr = [];
		for (var i = 0; i < 12; i++) {
			arr.push(yearData.add(i, "month"));
		}
		setMonthArr(arr);
	}, [focusDate]);

	return (
		<div class={"w-full h-screen flex flex-col " + (isToggled ? "" : "pl-16")}>
			<div
				class={
					"select-none px-8 pr-16 py-2 w-full h-full overflow-auto grid grid-flow-row lg:grid-cols-4 lg:grid-rows-3 md:grid-cols-2  md:grid-rows-10 lg:gap-y-36 gap-x-16 md:gap-y-24" +
					(isToggled ? "" : "pl-24")
				}
			>
				{monthArr.map((element, index) => {
					return <CalendarInYear key={element} monthData={element} />;
				})}
			</div>
			<div class="w-full h-20"></div>
		</div>
	);
};

export default Year;
