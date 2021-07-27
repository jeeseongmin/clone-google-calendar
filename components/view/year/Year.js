import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarInYear from "./CalendarInYear";

const Year = () => {
	const [yearArr, setYearArr] = useState([]);
	const isToggled = useSelector((state) => state.setting.isToggled);
	const focusDate = useSelector((state) => state.setting.focusDate);

	// 해당 년도에 따른 달의 첫 날들을 arr에 담아서 element로 보낸다.
	useEffect(() => {
		const monthData = focusDate.startOf("year");
		const arr = [];
		for (var i = 0; i < 12; i++) {
			arr.push(monthData.add(i, "month"));
		}
		setYearArr(arr);
	}, []);
	return (
		<div
			class={
				"select-none px-8 pr-16 py-2 w-full h-full border border-black grid grid-flow-row grid-cols-4 grid-rows-3 gap-y-16 gap-x-16 " +
				(isToggled ? "" : "pl-24")
			}
		>
			{yearArr.map((element, index) => {
				return <CalendarInYear key={element} monthData={element} />;
			})}
		</div>
	);
};

export default Year;
