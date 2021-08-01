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
import Default from "../public/image/default-img.png";
import Elephant from "../public/image/elephant.jpg";
import Giraffe from "../public/image/giraffe.jpg";
import Dog1 from "../public/image/dog1.jpeg";
import Dog2 from "../public/image/dog2.jpg";
import { HiCheck } from "react-icons/hi";

const AddCalendarModal = (props) => {
	const dispatch = useDispatch();

	const [calendarList, setCalendarList] = useState([]);

	const [colorModal, setColorModal] = useState(false);
	const [calendarNameModal, setCalendarNameModal] = useState(false);
	const [modalDate, setModalDate] = useState(dayjs());
	const [startdateModal, setStartdateModal] = useState(false);
	const [enddateModal, setEnddateModal] = useState(false);
	// const [isAllDay, setIsAllDay] = useState(false);
	const colorRef = useRef(null);
	const calendarNameRef = useRef(null);
	const startRef = useRef(null);
	const endRef = useRef(null);
	const titleRef = useRef(null);
	const otherRef = useRef(null);
	const dayText = ["일", "월", "화", "수", "목", "금", "토"];
	const user = useSelector((state) => state.user.user);
	const focusDate = useSelector((state) => state.setting.focusDate);
	const currentUser = useSelector((state) => state.setting.currentUser);
	const calendarModal = useSelector((state) => state.setting.calendarModal);
	const startDate = useSelector((state) => state.setting.startDate);
	const endDate = useSelector((state) => state.setting.endDate);
	const { isClicked, week, date } = calendarModal;
	let myColor = "bg-red-400 ";
	myColor = getColor(
		currentUser.myCalendar[Object.keys(currentUser.myCalendar)[0]].color
	);

	useEffect(() => {
		titleRef.current.focus();
	}, []);

	useEffect(() => {
		// console.log("mycalendar List", Object.keys(currentUser.myCalender));
		console.log("mycalendar list", Object.keys(currentUser.myCalendar));
		setCalendarList(Object.keys(currentUser.myCalendar));
	}, []);

	// useEffect(() => {
	// 	if (!startdateModal || !enddateModal) return;
	// }, [startdateModal, enddateModal]);

	const onStartModaltoggle = () => {
		if (startdateModal) {
			setStartdateModal(false);
		} else {
			setStartdateModal(true);
		}
	};

	const onToggleAllDay = () => {
		console.log("onToggleAllDay");
		const cp = { ...eventInfo };
		if (cp.type === "allDay") {
			cp.type = "default";
		} else {
			cp.type = "allDay";
		}
		setEventInfo(cp);
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
		type: "allDay",
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
		participants: [currentUser.uuid],
		repeat: {
			type: "none",
			day: [],
			end: null,
			rejected: {},
			deleted: {},
		},
	});

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
		if (!calendarNameModal) return;
		function handleClick(e) {
			if (calendarNameRef.current === null) {
				return;
			} else if (!calendarNameRef.current.contains(e.target)) {
				setCalendarNameModal(false);
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [calendarNameModal]);

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

	const chooseName = (uid) => {
		const cp = { ...eventInfo };
		cp.host.myCalendar = uid;
		setEventInfo(cp);
		console.log(eventInfo);
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
							<div></div>
						</div>
					</div>
					<div class="z-40 w-full flex flex-row items-center">
						<div class="w-16"></div>
						<div class="flex-1 flex flex-col  ">
							<div class="flex flex-row items-center mr-6 mb-2">
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
							<div class="pl-2 text-gray-700 text-xs flex flex-row items-center justify-center select-none">
								{eventInfo.type === "allDay" ? (
									<div
										onClick={onToggleAllDay}
										class="cursor-pointer w-5 h-5 mr-2 rounded-sm bg-blue-500 flex justify-center items-center"
									>
										<HiCheck size={24} color="white" />
									</div>
								) : (
									<div
										onClick={onToggleAllDay}
										class="cursor-pointer w-5 h-5 mr-2 rounded-sm border border-blue-500 bg-white flex justify-center items-center"
									>
										<HiCheck size={24} color="white" />
									</div>
								)}

								<span>종일</span>
							</div>
						</div>
						{/* <button class="mr-6 px-2 py-1 text-xs rounded-md border border-gray-400">
							시간 추가
						</button> */}
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
						<div
							ref={calendarNameRef}
							class="pl-1 flex flex-row items-center justify-start relative"
						>
							<div
								onClick={() => setCalendarNameModal(!calendarNameModal)}
								class="px-2 py-1 cursor-pointer w-42 mr-6 flex-1 flex flex-row items-center relative text-sm hover:bg-gray-100"
							>
								<p class="pr-1 w-42 text-sm text-gray-800 font-medium">
									{currentUser.myCalendar[eventInfo.host.myCalendar].name}
								</p>
								<RiArrowDropDownFill size={28} color={"#5f6368"} />
							</div>
							{calendarNameModal && (
								<div class="z-40 py-2 w-46 h-auto border border-gray-200 shadow-2xl absolute  top-0 bg-white justify-center items-center">
									{/* currentUser.myCalendar[Object.keys(currentUser.myCalendar)[0]] */}
									{calendarList.map((element, index) => {
										return (
											<p
												onClick={() => chooseName(element)}
												class="px-3 py-2 cursor-pointer text-sm text-gray-800 font-medium hover:bg-gray-100"
											>
												{currentUser.myCalendar[element].name}
											</p>
										);
									})}
								</div>
							)}
						</div>
						<div
							ref={colorRef}
							class="pl-2 flex flex-row items-center justify-start relative"
						>
							<div
								onClick={() => setColorModal(!colorModal)}
								class="px-2 py-1 cursor-pointer w-16 mr-6 flex-1 flex flex-row items-center relative text-sm	 hover:bg-gray-100"
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
						<div ref={otherRef}></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddCalendarModal;
