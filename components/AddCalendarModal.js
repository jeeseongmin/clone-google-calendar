import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getColor } from "./color";
import SearchUserInput from "./input/searchUserInput";
import TitleInput from "./input/titleInput";
import DescriptionInput from "./input/descriptionInput";
import { ImEnlarge } from "react-icons/im";
import Calendar from "./Calendar";

import {
	IoMdClose,
	IoMdCalendar,
	IoIosArrowBack,
	IoIosArrowForward,
} from "react-icons/io";
import { IoPeopleOutline } from "react-icons/io5";
import { BsTextLeft } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BiCheck } from "react-icons/bi";
import { setTempColor, toggleCalendarModal } from "../reducers/settingSlice";

const AddCalendarModal = (props) => {
	const dispatch = useDispatch();
	// const dayData = props.dayData;
	// const week = props.week;
	// const month = props.month;

	const [colorModal, setColorModal] = useState(false);
	const [modalDate, setModalDate] = useState(dayjs());
	const [startdateModal, setStartdateModal] = useState(false);
	const [enddateModal, setEnddateModal] = useState(false);
	const colorRef = useRef(null);
	const startRef = useRef(null);
	const endRef = useRef(null);
	const titleRef = useRef(null);
	const dayText = ["일", "월", "화", "수", "목", "금", "토"];
	const focusDate = useSelector((state) => state.setting.focusDate);
	const currentUser = useSelector((state) => state.setting.currentUser);
	const calendarModal = useSelector((state) => state.setting.calendarModal);
	const startDate = useSelector((state) => state.setting.startDate);
	const endDate = useSelector((state) => state.setting.endDate);
	const { isClicked, week, date } = calendarModal;
	console.log(calendarModal);
	let myColor = "bg-red-400 ";
	myColor = getColor(
		currentUser.myCalendar[Object.keys(currentUser.myCalendar)[0]].color
	);

	useEffect(() => {
		titleRef.current.focus();
	}, []);

	// useEffect(() => {
	// 	if (!startdateModal || !enddateModal) return;
	// }, [startdateModal, enddateModal]);

	const onStartModaltoggle = () => {
		console.log("start Click!!!!!!!!!!!");
		if (startdateModal) {
			setStartdateModal(false);
		} else {
			setStartdateModal(true);
		}
	};

	const onEndModaltoggle = () => {
		if (enddateModal) {
			setEnddateModal(false);
		} else {
			setEnddateModal(true);
		}
	};

	const ManipulateMonth = (num) => {
		if (num === 1) {
			setModalDate(modalDate.add(1, "month"));
		} else {
			setModalDate(modalDate.subtract(1, "month"));
		}
	};

	const [eventInfo, setEventInfo] = useState({
		title: "",
		description: "",
		participants: {},
		period: {
			start: dayjs().startOf("day"),
			end: dayjs().startOf("day"),
		},
		host: {
			uuid: currentUser.uuid,
			myCalendar: Object.keys(currentUser.myCalendar)[0],
		},
		color: currentUser.myCalendar[Object.keys(currentUser.myCalendar)[0]].color,
		repeat: {
			type: "none",
			day: [],
			end: null,
			rejected: {},
			deleted: {},
		},
	});

	useEffect(() => {
		if (colorModal) return;
	}, [colorModal]);

	useEffect(() => {
		if (!colorModal) return;
		function handleClick(e) {
			if (colorRef.current === null) {
				return;
			} else if (!colorRef.current.contains(e.target)) {
				setColorModal(false);
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [colorModal]);

	useEffect(() => {
		if (!startdateModal) return;
		function handleClick(e) {
			if (startRef.current === null) {
				return;
			} else if (!startRef.current.contains(e.target)) {
				setStartdateModal(false);
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [startdateModal]);

	useEffect(() => {
		if (!enddateModal) return;
		function handleClick(e) {
			if (endRef.current === null) {
				return;
			} else if (!endRef.current.contains(e.target)) {
				setEnddateModal(false);
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [enddateModal]);

	const onChangeEvent = (e, text) => {
		console.log(text);
		const cp = { ...eventInfo };
		if (text === "title" || text === "description") cp[text] = e.target.value;
		else if (text === "start" || text === "end")
			cp.period[text] = e.target.value;
		console.log(cp);
		setEventInfo(cp);
	};

	const chooseColor = (text) => {
		dispatch(setTempColor(text));
		const cp = { ...eventInfo };
		cp.color = text;
		setEventInfo(cp);
	};

	const onCloseModal = () => {
		dispatch(
			toggleCalendarModal({
				isClicked: false,
				week: null,
				date: null,
			})
		);
	};

	// 모달창 위치
	let posX = "left-48 ";
	let posY = "bottom-48 ";

	if (week === 0) {
		posY = "top-0 ";
	} else if (week === 1) {
		posY = "top-1/4 ";
	} else if (week === 2) {
		posY = "top-1/3 ";
	} else {
		posY = "bottom-48 ";
	}
	if (date.day() === 0) {
		posX = "left-1/3 ";
	}
	if (date.day() === 1) {
		posX = "left-2/4 ";
	} else if (date.day() === 2) {
		posX = "left-2/3 ";
	} else if (date.day() === 3) {
		posX = "left-2/3 ";
	} else if (date.day() === 4) {
		posX = "right-2/4 ";
	} else if (date.day() === 5) {
		posX = "right-1/3 ";
	} else if (date.day() === 6) {
		posX = "right-1/4 ";
	}

	return (
		<>
			<div
				class={
					"z-40 w-auto h-96 shadow-2xl border border-gray-200 rounded-lg absolute flex flex-col items-center justify-start " +
					posX +
					posY
				}
			>
				<div class=" w-96 h-10 flex justify-between bg-gray-100 items-center">
					<div class="mx-4 my-4 cursor-pointer">
						<ImEnlarge size={16} color="gray" />
					</div>
					<div onClick={onCloseModal} class="mx-4 my-4 cursor-pointer">
						<IoMdClose size={24} color="gray" />
					</div>
				</div>
				<div class="w-96 h-full flex flex-col bg-white ">
					<div class="z-40 w-full flex flex-row">
						<div class="w-16"></div>
						<div class="mr-6 flex-1 relative text-xl">
							<TitleInput
								placeholder={"제목 및 시간 추가"}
								name={"title"}
								value={eventInfo.title}
								changeFunction={onChangeEvent}
								titleRef={titleRef}
							/>
						</div>
					</div>
					<div class="z-40 w-full flex flex-row items-center">
						<div class="w-16"></div>
						<div class="flex-1 flex flex-col  ">
							<div class="flex flex-row items-center ">
								<div ref={startRef} class="w-1/2 relative ">
									<div onClick={onStartModaltoggle} class="cursor-pointer">
										<SearchUserInput
											value={
												startDate.format("M월 DD일") +
												"(" +
												dayText[startDate.day()] +
												")"
											}
										/>
									</div>
									{startdateModal && (
										<div class="z-40 px-4 pb-2 absolute border border-gray-200 w-auto h-auto shadow-2xl bg-white">
											<div class="ml-1 w-full mb-1 flex justify-between flex-row items-center">
												<div class="text-sm font-semibold select-none">
													{modalDate.format("YYYY년 M월")}
												</div>
												<div class="flex flex-row">
													<IoIosArrowBack
														size={35}
														color={"#5f6368"}
														onClick={() => ManipulateMonth(-1)}
														class="p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
													/>
													<IoIosArrowForward
														size={35}
														color={"#5f6368"}
														onClick={() => ManipulateMonth(1)}
														class="p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
													/>
												</div>
											</div>
											<Calendar
												date={modalDate}
												key={modalDate}
												type={"modalStartDate"}
											/>
										</div>
									)}
								</div>
								<p>-</p>
								<div ref={endRef} class="w-1/2 relative">
									<div onClick={onEndModaltoggle} class="cursor-pointer">
										<SearchUserInput
											onClick={onEndModaltoggle}
											value={
												endDate.format("M월 DD일") +
												"(" +
												dayText[endDate.day()] +
												")"
											}
										/>
									</div>
									{enddateModal && (
										<div class="z-40 px-4 pb-2 absolute border border-gray-200 w-auto h-auto shadow-2xl bg-white">
											<div class="ml-1 w-full mb-1 flex justify-between flex-row items-center">
												<div class="text-sm font-semibold select-none">
													{modalDate.format("YYYY년 M월")}
												</div>
												<div class="flex flex-row">
													<IoIosArrowBack
														size={35}
														color={"#5f6368"}
														onClick={() => ManipulateMonth(-1)}
														class="p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
													/>
													<IoIosArrowForward
														size={35}
														color={"#5f6368"}
														onClick={() => ManipulateMonth(1)}
														class="p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
													/>
												</div>
											</div>
											<Calendar
												date={modalDate}
												key={modalDate}
												type={"modalEndDate"}
											/>
										</div>
									)}
								</div>
							</div>
							<div class="py-1 pl-4 text-gray-700 text-xs">반복 안함</div>
						</div>
						<button class="mr-6 px-2 py-1 text-xs rounded-md border border-gray-400">
							시간 추가
						</button>
					</div>
					<div class="z-30 w-full flex flex-row">
						<div class="w-16  flex justify-center items-center">
							<IoPeopleOutline size={24} />
						</div>
						<div class="mr-6 flex-1 relative text-lg">
							<DescriptionInput
								placeholder={"참석자 추가"}
								name={""}
								changeFunction={onChangeEvent}
							/>
						</div>
					</div>

					<div class="z-30 w-full flex flex-row">
						<div class="w-16 flex justify-center items-center">
							<GiPositionMarker size={24} />
						</div>
						<div class="mr-6 flex-1 relative text-lg">
							<DescriptionInput
								placeholder={"회의실 또는 위치 추가 "}
								changeFunction={onChangeEvent}
							/>
						</div>
					</div>
					<div class="z-30 w-full flex flex-row">
						<div class="w-16 flex justify-center items-center">
							<BsTextLeft size={24} />
						</div>
						<div class="mr-6 flex-1 relative text-lg">
							<DescriptionInput
								placeholder={"설명 추가"}
								name={"description"}
								value={eventInfo.description}
								changeFunction={onChangeEvent}
							/>
						</div>
					</div>
					<div class="z-30 w-full flex flex-row">
						<div class="w-16 py-2 flex justify-center items-center">
							<IoMdCalendar size={24} />
						</div>
						<div class="pl-1 flex flex-row items-center justify-start">
							<div class="px-2 py-1 cursor-pointer w-24 mr-6 flex-1 flex flex-row items-center relative text-sm hover:bg-gray-100">
								<p class="pr-1 text-sm text-gray-800 font-medium">지성민</p>
								<RiArrowDropDownFill size={28} color={"#5f6368"} />
							</div>
						</div>
						<div
							ref={colorRef}
							class="pl-2 flex flex-row items-center justify-start relative"
						>
							<div
								onClick={() => setColorModal(!colorModal)}
								class="px-2 py-1 cursor-pointer w-16 mr-6 flex-1 flex flex-row items-center relative text-sm hover:bg-gray-100"
							>
								<div
									class={
										"w-4 h-4 mr-2 rounded-full font-medium " +
										getColor(eventInfo.color)
									}
								></div>
								<RiArrowDropDownFill size={28} color={"#5f6368"} />
							</div>
							{colorModal && (
								<div class="z-40 px-2 w-14 h-28 border border-gray-200 shadow-2xl absolute  top-0 bg-white grid grid-flow-row grid-cols-2 grid-rows-4 justify-center items-center gap-1">
									<div
										onClick={() => chooseColor("red")}
										class="cursor-pointer w-4 h-4 rounded-full bg-red-400"
									>
										{eventInfo.color === "red" && <BiCheck color={"white"} />}
									</div>
									<div
										onClick={() => chooseColor("blue")}
										class="cursor-pointer w-4 h-4 rounded-full bg-blue-400"
									>
										{eventInfo.color === "blue" && <BiCheck color={"white"} />}
									</div>
									<div
										onClick={() => chooseColor("green")}
										class="cursor-pointer w-4 h-4 rounded-full bg-green-400"
									>
										{eventInfo.color === "green" && <BiCheck color={"white"} />}
									</div>
									<div
										onClick={() => chooseColor("yellow")}
										class="cursor-pointer w-4 h-4 rounded-full bg-yellow-400"
									>
										{eventInfo.color === "yellow" && (
											<BiCheck color={"white"} />
										)}
									</div>
									<div
										onClick={() => chooseColor("purple")}
										class="cursor-pointer w-4 h-4 rounded-full bg-purple-400"
									>
										{eventInfo.color === "purple" && (
											<BiCheck color={"white"} />
										)}
									</div>
									<div
										onClick={() => chooseColor("pink")}
										class="cursor-pointer w-4 h-4 rounded-full bg-pink-400"
									>
										{eventInfo.color === "pink" && <BiCheck color={"white"} />}
									</div>
									<div
										onClick={() => chooseColor("gray")}
										class="cursor-pointer w-4 h-4 rounded-full bg-gray-400"
									>
										{eventInfo.color === "gray" && <BiCheck color={"white"} />}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddCalendarModal;
