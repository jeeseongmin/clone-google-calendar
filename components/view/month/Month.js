import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeekInMonth from "./WeekInMonth";
import AddCalendarModal from "../../AddCalendarModal";
import {
	toggleCalendarModal,
	setTempColor,
} from "../../../reducers/settingSlice";

const Month = () => {
	const dispatch = useDispatch();
	const [weekArr, setWeekArr] = useState([]);
	const focusDate = useSelector((state) => state.setting.focusDate);
	const isToggled = useSelector((state) => state.setting.isToggled);
	const calendarModal = useSelector((state) => state.setting.calendarModal);

	const event = useSelector((state) => state.event);
	const monthData = focusDate.startOf("Month");
	const month = focusDate.month() + 1;
	console.log(month, monthData);
	const addModalRef = useRef(null);

	useEffect(() => {
		console.log("event", event);
		const weekData = monthData.day(0);
		const arr = [];
		for (var i = 0; i < 5; i++) {
			arr.push(weekData.add(i * 7, "day"));
		}
		setWeekArr(arr);
	}, [focusDate]);

	useEffect(() => {
		if (!calendarModal.isClicked) return;
		dispatch(setTempColor("default"));
	}, [calendarModal.isClicked]);

	useEffect(() => {
		if (!calendarModal.isClicked) return;
		function handleClick(e) {
			if (addModalRef.current === null) {
				return;
			} else if (!addModalRef.current.contains(e.target)) {
				dispatch(
					toggleCalendarModal({
						isClicked: false,
						week: null,
						date: null,
					})
				);
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [calendarModal.isClicked]);

	return (
		<div class={"w-full h-screen flex flex-col justify-start "}>
			<div
				class={
					" text-xs font-light text-gray-600 w-full select-none grid h-4 grid-flow-row grid-cols-7 grid-rows-1 "
				}
			>
				<div class="pt-2 flex justify-center items-center border-l border-gray-300">
					일
				</div>
				<div class="pt-2 flex justify-center items-center border-l border-gray-300">
					월
				</div>
				<div class="pt-2 flex justify-center items-center border-l border-gray-300">
					화
				</div>
				<div class="pt-2 flex justify-center items-center border-l border-gray-300">
					수
				</div>
				<div class="pt-2 flex justify-center items-center border-l border-gray-300">
					목
				</div>
				<div class="pt-2 flex justify-center items-center border-l border-gray-300">
					금
				</div>
				<div class="pt-2 flex justify-center items-center border-l border-gray-300">
					토
				</div>
			</div>
			<div
				class={
					"w-full select-none h-full grid grid-flow-row grid-cols-1 grid-row-5 relative"
				}
			>
				{weekArr.map((element, index) => {
					return (
						<WeekInMonth
							key={element}
							weekData={element}
							month={monthData.month()}
							week={index}
						/>
					);
				})}
			</div>
			<div class="w-full h-20"></div>
			<div class="" ref={addModalRef}>
				{calendarModal.isClicked && <AddCalendarModal />}
			</div>
		</div>
	);
};

export default Month;
