import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getColor } from "./color";
import SearchUserInput from "./input/searchUserInput";
import TitleInput from "./input/titleInput";
import DescriptionInput from "./input/descriptionInput";
import { ImEnlarge } from "react-icons/im";
import Calendar from "./Calendar";
import { v4 as uuidv4 } from "uuid";

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
import {
	setTempColor,
	toggleCalendarModal,
	updateStartDate,
	updateEndDate,
} from "../reducers/settingSlice";
import { addEvent } from "../reducers/eventSlice";
import { addUserEvent } from "../reducers/userSlice";
import { HiCheck } from "react-icons/hi";

const AddCalendarModal = (props) => {
	const dispatch = useDispatch();

	const totalEvent = useSelector((state) => state.event.event);

	const [calendarList, setCalendarList] = useState([]);
	const [timeList, setTimeList] = useState([]);

	const [colorModal, setColorModal] = useState(false);
	const [calendarNameModal, setCalendarNameModal] = useState(false);
	const [modalDate, setModalDate] = useState(dayjs());
	const [startdateModal, setStartdateModal] = useState(false);
	const [enddateModal, setEnddateModal] = useState(false);
	const [startTimeModal, setStartTimeModal] = useState(false);
	const [endTimeModal, setEndTimeModal] = useState(false);
	// const [isAllDay, setIsAllDay] = useState(false);
	const colorRef = useRef(null);
	const calendarNameRef = useRef(null);
	const startRef = useRef(null);
	const endRef = useRef(null);
	const startTimeRef = useRef(null);
	const endTimeRef = useRef(null);
	const titleRef = useRef(null);
	const otherRef = useRef(null);
	const dayText = ["???", "???", "???", "???", "???", "???", "???"];
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

		let arr = [];
		const day = dayjs().startOf("day");
		for (let i = 0; i < 96; i++) {
			const newDay = day.add(15 * i, "minute");

			arr.push(newDay);
		}
		setTimeList(arr);
	}, []);

	useEffect(() => {
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
		period: {
			start: dayjs().startOf("day"),
			end: dayjs().startOf("day"),
		},
		host: {
			uuid: currentUser.uuid,
			myCalendar: Object.keys(currentUser.myCalendar)[0],
		},
		color: currentUser.myCalendar[Object.keys(currentUser.myCalendar)[0]].color,
		participants: {},
		repeat: {
			type: "none",
			day: [],
			end: null,
			rejected: {},
			deleted: {},
		},
	});
	useEffect(() => {
		const cp = { ...eventInfo };
		const obj = {};
		obj[currentUser.uuid] = {
			isRequire: true,
			status: "accept",
		};
		cp.participants = obj;
		setEventInfo(cp);
	}, []);

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

	useEffect(() => {
		if (!startTimeModal) return;
		function handleClick(e) {
			if (startTimeRef.current === null) {
				return;
			} else if (!startTimeRef.current.contains(e.target)) {
				setStartTimeModal(false);
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [startTimeModal]);

	useEffect(() => {
		if (!endTimeModal) return;
		function handleClick(e) {
			if (endTimeRef.current === null) {
				return;
			} else if (!endTimeRef.current.contains(e.target)) {
				setEndTimeModal(false);
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [endTimeModal]);

	const onChangeEvent = (e, text) => {
		const cp = { ...eventInfo };
		if (text === "title" || text === "description") cp[text] = e.target.value;
		else if (text === "start" || text === "end")
			cp.period[text] = e.target.value;
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
	};

	const chooseTime = (type, date) => {
		if (type === "start") {
			const start = startDate;
			const day = start
				.startOf("day")
				.add(date.hour(), "hour")
				.add(date.minute(), "minute");
			dispatch(updateStartDate(day));
			const cp = { ...eventInfo };
			const time = cp.period.start
				.startOf("day")
				.add(date.hour(), "hour")
				.add(date.minute(), "minute");
			cp.period.start = time;
			setEventInfo(cp);
		} else if (type === "end") {
			const end = endDate;
			const day = end
				.startOf("day")
				.add(date.hour(), "hour")
				.add(date.minute(), "minute");
			dispatch(updateEndDate(day));
			const cp = { ...eventInfo };
			const time = cp.period.end
				.startOf("day")
				.add(date.hour(), "hour")
				.add(date.minute(), "minute");
			cp.period.end = time;
			setEventInfo(cp);
		}
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

	const onSubmitEvent = () => {
		console.log("onSubmitEvent");
		console.log(eventInfo);
		const event_uuid = uuidv4();
		const Event = {
			title: eventInfo.title,
			description: eventInfo.description,
			period: eventInfo.period,
			type: eventInfo.type,
			participants: eventInfo.participants,
			host: eventInfo.host,
			color: eventInfo.color,
			created: dayjs(),
			deleted: null,
			authority: ["view"],
		};
		dispatch(addEvent({ event: Event, event_uuid: event_uuid }));

		const UserEvent = {
			title: eventInfo.title,
			description: eventInfo.description,
			color: eventInfo.color,
			isDeleted: false,
			rejected: {},
		};
		dispatch(
			addUserEvent({
				user: currentUser.uuid,
				event: UserEvent,
				event_uuid: event_uuid,
			})
		);

		console.log("finish!");
		console.log(totalEvent);
		console.log(user);
		const payload = {
			isClicked: false,
			week: null,
			date: null,
		};
		dispatch(toggleCalendarModal(payload));
	};

	// ????????? ??????
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
				<div class=" w-full h-10 flex justify-between bg-gray-100 items-center">
					<div class="mx-4 my-4 cursor-pointer">
						<ImEnlarge size={16} color="gray" />
					</div>
					<div onClick={onCloseModal} class="mx-4 my-4 cursor-pointer">
						<IoMdClose size={24} color="gray" />
					</div>
				</div>
				<div class="w-auto h-full flex flex-col bg-white ">
					<div class="z-40 w-full flex flex-row">
						<div class="w-16"></div>
						<div class="mr-6 flex-1 relative text-xl">
							<TitleInput
								placeholder={"?????? ??? ?????? ??????"}
								name={"title"}
								value={eventInfo.title}
								changeFunction={onChangeEvent}
								titleRef={titleRef}
							/>
							<div></div>
						</div>
					</div>
					<div class="z-40 my-2 w-auto flex flex-row items-center">
						<div class="w-16"></div>
						<div class="flex-1 flex flex-col">
							<div class="flex flex-row items-center mr-6 mb-2">
								<div
									ref={startRef}
									class="w-auto relative flex flex-row items-center text-xs"
								>
									<div class="px-2 py-2 cursor-pointer hover:bg-gray-100 relative">
										<div onClick={onStartModaltoggle}>
											{startDate.format("M??? DD???") +
												"(" +
												dayText[startDate.day()] +
												")"}
										</div>
										{startdateModal && (
											<div class="z-40 px-4 pb-2 absolute border border-gray-200 w-auto h-auto shadow-2xl bg-white">
												<div class="ml-1 w-full mb-1 flex justify-between flex-row items-center">
													<div class="text-sm font-semibold select-none">
														{modalDate.format("YYYY??? M???")}
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
									{eventInfo.type !== "allDay" && (
										<div
											// onClick={onStartModaltoggle}
											ref={startTimeRef}
											class="cursor-pointer  mx-2 relative"
										>
											<div
												onClick={() => setStartTimeModal(!startTimeModal)}
												class="px-2 py-2 hover:bg-gray-100"
											>
												{startDate.format("HH:mm")}
											</div>

											{startTimeModal && (
												<div class="absolute w-16 h-48 overflow-y-auto">
													{timeList.map((element, index) => {
														return (
															<p
																onClick={() => chooseTime("start", element)}
																class="px-2 py-2 cursor-pointer text-sm bg-white text-gray-800 font-medium hover:bg-gray-100"
															>
																{element.format("HH:mm")}
															</p>
														);
													})}
												</div>
											)}
										</div>
									)}
								</div>
								<p class="mx-2">-</p>
								<div
									ref={endRef}
									class="w-auto relative flex flex-row items-center text-xs"
								>
									{eventInfo.type !== "allDay" && (
										<div
											// onClick={onEndModaltoggle}
											ref={endTimeRef}
											class="w-auto cursor-pointer  mx-2 relative"
										>
											<div
												onClick={() => setEndTimeModal(!endTimeModal)}
												class="px-2 py-2 hover:bg-gray-100"
											>
												{endDate.format("HH:mm")}
											</div>
											{endTimeModal && (
												<div class="absolute w-16 h-48 overflow-y-auto">
													{timeList.map((element, index) => {
														return (
															<p
																onClick={() => chooseTime("end", element)}
																class="px-2 py-2 cursor-pointer text-sm bg-white text-gray-800 font-medium hover:bg-gray-100"
															>
																{element.format("HH:mm")}
															</p>
														);
													})}
												</div>
											)}
										</div>
									)}
									<div class="px-2 py-2 cursor-pointer hover:bg-gray-100 relative">
										<div onClick={onEndModaltoggle}>
											{endDate.format("M??? DD???") +
												"(" +
												dayText[endDate.day()] +
												")"}
										</div>
										{enddateModal && (
											<div class="z-40 px-4 pb-2 right-0 absolute border border-gray-200 w-auto h-auto shadow-2xl bg-white">
												<div class="ml-1 w-full mb-1 flex justify-between flex-row items-center">
													<div class="text-sm font-semibold select-none">
														{modalDate.format("YYYY??? M???")}
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
							</div>
							<div class="pl-2 text-gray-700 text-xs flex flex-row items-center select-none">
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
										class="cursor-pointer w-5 h-5 mr-2 rounded-sm border-2 border-blue-500 bg-white flex justify-center items-center"
									>
										<HiCheck size={24} color="white" />
									</div>
								)}

								<span>??????</span>
							</div>
						</div>
						{/* <button class="mr-6 px-2 py-1 text-xs rounded-md border border-gray-400">
							?????? ??????
						</button> */}
					</div>
					<div class="z-30 w-full flex flex-row">
						<div class="w-16  flex justify-center items-center">
							<IoPeopleOutline size={24} />
						</div>
						<div class="mr-6 flex-1 relative text-lg">
							<DescriptionInput
								placeholder={"????????? ??????"}
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
								placeholder={"????????? ?????? ?????? ?????? "}
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
								placeholder={"?????? ??????"}
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
								class="px-2 py-1 cursor-pointer w-46 mr-6 flex-1 flex flex-row items-center relative text-sm hover:bg-gray-100"
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
					<div class="pr-4 mt-2 mb-4 w-full flex flex-row justify-end items-center">
						<div
							onClick={onSubmitEvent}
							class="cursor-pointer px-4 py-2 text-white text-sm rounded-md bg-blue-400"
						>
							??????
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddCalendarModal;
