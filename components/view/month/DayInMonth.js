import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getColor } from "../../color";
import {
	toggleCalendarModal,
	updateFocusDate,
	updateStartDate,
	updateEndDate,
} from "../../../reducers/settingSlice";
import AddCalendarModal from "../../AddCalendarModal";

const DayInMonth = (props) => {
	const dispatch = useDispatch();
	const addModalRef = useRef(null);
	const [addModal, setAddModal] = useState(false);
	const dayData = props.dayData;
	const week = props.week;
	const month = props.month;
	const focusDate = useSelector((state) => state.setting.focusDate);
	const calendarModal = useSelector((state) => state.setting.calendarModal);
	const currentUser = useSelector((state) => state.setting.currentUser);
	const tempColor = useSelector((state) => state.setting.tempColor);
	const startDate = useSelector((state) => state.setting.startDate);
	const endDate = useSelector((state) => state.setting.endDate);
	console.log(tempColor);
	let myColor = "bg-red-400 ";
	myColor = getColor(
		currentUser.myCalendar[Object.keys(currentUser.myCalendar)[0]].color
	);
	const toggleAddModal = () => {
		if (!addModal && !calendarModal.isClicked) {
			dispatch(
				toggleCalendarModal({
					isClicked: true,
					week: week,
					date: dayData,
				})
			);
			dispatch(updateStartDate(dayData));
			dispatch(updateEndDate(dayData));
			setAddModal(!addModal);
		} else if (addModal) {
			const payload = {
				isClicked: false,
				week: null,
				date: null,
			};
			dispatch(toggleCalendarModal(payload));
			setAddModal(!addModal);
		}
	};

	useEffect(() => {
		if (calendarModal.isClicked === false) {
			setAddModal(false);
		}
	}, [calendarModal.isClicked]);

	const dateText =
		dayData.date() === 1
			? dayData.month() + "월 " + dayData.date() + "일"
			: dayData.date();

	let dateComponent;
	if (dayjs().format("YYYY-MM-DD") === dayData.format("YYYY-MM-DD")) {
		dateComponent = (
			<div class="z-30 w-auto h-auto p-1 cursor-pointer rounded-full bg-blue-600 text-white flex justify-center items-center">
				{dateText}
			</div>
		);
	} else if (
		month === focusDate.month() &&
		dayData.format("YYYY-MM-DD") === focusDate.format("YYYY-MM-DD")
	) {
		dateComponent = (
			<div class="z-30 hover:bg-gray-100 w-auto h-auto p-1 cursor-pointer rounded-full bg-blue-100 text-blue-600 flex justify-center items-center">
				{dateText}
			</div>
		);
	} else if (month === dayData.month()) {
		dateComponent = (
			<div class="z-30 hover:bg-gray-100 w-auto h-auto p-1 cursor-pointer rounded-full text-black flex justify-center items-center">
				{dateText}
			</div>
		);
	} else {
		dateComponent = (
			<div class="z-30 hover:bg-gray-100 w-auto h-auto p-1 cursor-pointer rounded-full text-gray-400 flex justify-center items-center">
				{dateText}
			</div>
		);
	}

	return (
		<div
			onClick={toggleAddModal}
			class={
				"z-40 pt-1 text-gray-700 text-xs font-medium w-full h-full flex flex-col justify-start items-start border-l border-b border-gray-300 relative "
			}
		>
			<div class=" w-full flex justify-center items-center">
				{dateComponent}
			</div>
			<div class="w-full h-full "></div>
			{/* {addModal && (
				<div class="" ref={addModalRef}>
					<AddCalendarModal week={week} month={month} dayData={dayData} />
				</div>
			)} */}
			{addModal && calendarModal.isClicked && (
				<div
					class={
						"cursor-pointer pl-3 w-10/12 h-6 font-semibold absolute shadow-xl rounded-md top-8 flex justify-start items-center text-white " +
						(tempColor !== "default" ? getColor(tempColor) : myColor)
					}
				>
					(제목 없음)
				</div>
			)}
		</div>
	);
};

export default DayInMonth;
