import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Image from "next/image";
import calendar from "../public/image/google-calendar.png";
import {
	toggleSidebar,
	updateFocusDate,
	updateLeftbarDate,
} from "../reducers/settingSlice";
import dayjs from "dayjs";
import Profile from "./Profile";
import SelectView from "./SelectView";

const navbar = () => {
	const dispatch = useDispatch();
	const [dateText, setDateText] = useState("");
	// left sidebar toggle
	const isToggled = useSelector((state) => state.setting.isToggled);
	// current focus date
	const focusDate = useSelector((state) => state.setting.focusDate);
	// current viewType
	const viewType = useSelector((state) => state.setting.viewType);

	const setToday = () => {
		dispatch(updateFocusDate(dayjs()));
		dispatch(updateLeftbarDate(dayjs()));
	};

	useEffect(() => {
		if (viewType === "Year") {
			setDateText(focusDate.format("YYYY년"));
		} else if (viewType === "Month") {
			setDateText(focusDate.format("YYYY년 M월"));
		} else if (viewType === "Week") {
			setDateText(focusDate.format("YYYY년 M월"));
		} else if (viewType === "Day") {
			setDateText(focusDate.format("YYYY년 M월 D일"));
		}
	}, [viewType, focusDate]);
	// ref 이외의 다른 부분을 클릭했을 때에 일어나야 하는 일

	const onToggleSidebar = () => {
		console.log(isToggled);
		dispatch(toggleSidebar(!isToggled));
	};

	const changeFocusDate = (type) => {
		const num = viewType === "Week" ? 7 : 1;
		const view = viewType === "Week" ? "Day" : viewType;
		const payload =
			type === 1 ? focusDate.add(num, view) : focusDate.subtract(num, view);
		dispatch(updateFocusDate(payload));
		dispatch(updateLeftbarDate(payload));
	};

	return (
		<div class="z-100 h-30 flex flex-row justify-start items-center shadow-mg border-b border-gray-300 ">
			<div class="w-64 mr-2 pr-4 pl-4 flex flex-row items-center flex-shrink-0">
				<FiMenu
					size={36}
					color={"#5f6368"}
					class="mr-6 p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
					onClick={onToggleSidebar}
				/>
				<Image
					src={calendar}
					width={33}
					height={33}
					class="object-contain cursor-pointer"
					onClick={() => Router.push("/main")}
					alt="Picture of the author"
				/>
				<h1 class="ml-4 text-xl text-gray-600">캘린더</h1>
			</div>
			<div class="w-full flex my-2 flex-row items-center">
				<div class="my-2 flex justify-center items-center">
					<button
						onClick={setToday}
						class="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
					>
						오늘
					</button>
				</div>
				<IoIosArrowBack
					onClick={() => changeFocusDate(-1)}
					size={35}
					color={"#5f6368"}
					class="ml-3 p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
				/>
				<IoIosArrowForward
					onClick={() => changeFocusDate(1)}
					size={35}
					color={"#5f6368"}
					class="mr-3 p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
				/>
				<label class="text-xl p-2 select-none">{dateText}</label>
			</div>
			<SelectView />
			<Profile />
		</div>
	);
};

export default navbar;
