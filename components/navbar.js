import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FiMenu, FiUserPlus } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";

import Image from "next/image";
import calendar from "../public/image/google-calendar.png";
import {
	toggleSidebar,
	toggleProfile,
	changeView,
	updateFocusDate,
	updateLeftbarDate,
	updateOption,
	toggleViewModal,
} from "../reducers/settingSlice";
import dayjs from "dayjs";
import Dog1 from "../public/image/dog1.jpeg";
import { HiOutlineCamera } from "react-icons/hi";

const navbar = () => {
	const dispatch = useDispatch();
	const [dateText, setDateText] = useState("");
	const profileRef = useRef(null);
	const viewRef = useRef(null);
	// left sidebar toggle
	const isToggled = useSelector((state) => state.setting.isToggled);
	// current focus date
	const focusDate = useSelector((state) => state.setting.focusDate);
	// profile modal toggle
	const profileModal = useSelector((state) => state.setting.profileModal);
	// viewModal toggle
	const viewModal = useSelector((state) => state.setting.viewModal);
	// current viewType
	const viewType = useSelector((state) => state.setting.viewType);
	// weekend or rejected
	const option = useSelector((state) => state.setting.option);

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
	useEffect(() => {
		if (!profileModal) return;
		function handleClick(e) {
			if (profileRef.current === null) {
				return;
			} else if (!profileRef.current.contains(e.target)) {
				dispatch(toggleProfile(false));
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [profileModal]);

	useEffect(() => {
		if (!viewModal) return;
		function handleClick(e) {
			if (viewRef.current === null) {
				return;
			} else if (!viewRef.current.contains(e.target)) {
				dispatch(toggleViewModal(false));
			}
		}
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, [viewModal]);

	const onChangeViewType = (text) => {
		dispatch(changeView(text));
		dispatch(toggleViewModal(false));
	};

	const onToggleProfile = () => {
		dispatch(toggleProfile(!profileModal));
	};

	const onToggleViewModal = () => {
		dispatch(toggleViewModal(!viewModal));
	};

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

	const logOut = () => {
		alert("로그아웃 되었습니다.");
		dispatch(toggleProfile(false));

		Router.push("/");
	};

	const onOptionClick = (text) => {
		const cp = [...option];
		if (cp.includes(text)) {
			const newCp = cp.filter(function (element, index) {
				return element != text;
			});
			dispatch(updateOption(newCp));
		} else {
			cp.push(text);
			dispatch(updateOption(cp));
		}
	};

	return (
		<div class="h-30 flex flex-row justify-start items-center shadow-mg border-b-2 border-gray-100 ">
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

			<div ref={viewRef} class="h-full relative mr-16 select-none">
				<button
					onClick={onToggleViewModal}
					class="pl-3 p-1 cursor-pointer rounded-md flex flex-row items-center justify-center border border-gray-200 hover:bg-gray-100 focus:text-gray-300 focus:bg-gray-300"
				>
					<p class="pr-2 text-sm text-gray-800 font-medium">{viewType}</p>
					<RiArrowDropDownFill size={28} color={"#5f6368"} />
				</button>
				<div
					class={
						"z-40 h-auto w-56 py-4 absolute top-12 -left-4 flex flex-col bg-white border border-gray-200 shadow-2xl duration-300 ease-out " +
						(viewModal ? "block" : "hidden")
					}
				>
					<div
						onClick={() => onChangeViewType("Day")}
						class="cursor-pointer flex flex-row items-center justify-between hover:bg-gray-100"
					>
						<div class="ml-2 px-2 py-2 text-sm font-medium">Day</div>
						<div class="w-8 px-2 text-center mr-2 text-sm text-gray-600">D</div>
					</div>
					<div
						onClick={() => onChangeViewType("Week")}
						class="cursor-pointer flex flex-row items-center justify-between hover:bg-gray-100"
					>
						<div class="ml-2 px-2 py-2 text-sm">Week</div>
						<div class="w-8 px-2 text-center mr-2 text-sm text-gray-600">W</div>
					</div>
					<div
						onClick={() => onChangeViewType("Month")}
						class="cursor-pointer flex flex-row items-center justify-between hover:bg-gray-100"
					>
						<div class="ml-2 px-2 py-2 text-sm">Month</div>
						<div class="w-8 px-2 text-center mr-2 text-sm text-gray-600">M</div>
					</div>
					<div
						onClick={() => onChangeViewType("Year")}
						class="cursor-pointer mb-2 flex flex-row items-center justify-between hover:bg-gray-100"
					>
						<div class="ml-2 px-2 py-2 text-sm">Year</div>
						<div class="w-8 px-2 text-center mr-2 text-sm text-gray-600">Y</div>
					</div>
					<div class="border-t border-gary-200">
						<div
							onClick={() => onOptionClick("weekend")}
							class="cursor-pointer mt-2 flex flex-row items-center justify-start hover:bg-gray-100"
						>
							<div class="w-8 ml-2 px-2 pl-2 text-sm">
								{option && option.includes("weekend") && (
									<BsCheck size={20} color={"#5f6368"} />
								)}
							</div>
							<div class="ml-2 px-2 py-2 text-sm">Show weekends</div>
						</div>
						<div
							onClick={() => onOptionClick("rejected")}
							class="cursor-pointer flex flex-row items-center justify-start hover:bg-gray-100"
						>
							<div class="w-8 ml-2 px-2 pl-2 text-sm">
								{option && option.includes("rejected") && (
									<BsCheck size={20} color={"#5f6368"} />
								)}
							</div>
							<div class="ml-2 px-2 py-2 text-sm">Show declined events</div>
						</div>
					</div>
				</div>
			</div>

			<div ref={profileRef} class="relative ml-8 z-30 select-none">
				{
					<img
						src="https://images.unsplash.com/photo-1491604612772-6853927639ef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
						width={40}
						// height={40}
						class="z-30 mr-8 object-contain cursor-pointer rounded-full focus:shadow-mg "
						onClick={onToggleProfile}
						alt="Picture of the author"
					/>
				}
				{profileModal && (
					<div class="z-30 absolute m-4 pt-8 shadow-lg bg-white rounded-lg w-96 h-auto top-19 right-0 border border-gray-300">
						<div class="w-full flex flex-col justify-content items-center text-center border-b-2 border-gray-100 ">
							<div class="relative mb-4">
								<img
									src="https://images.unsplash.com/photo-1491604612772-6853927639ef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGRvZ3N8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
									width={80}
									height={80}
									class="object-contain cursor-pointer rounded-full"
									alt="Picture of the author"
								/>
								<div class="absolute p-1 cursor-pointer bg-white -bottom-1 -right-1 shadow-lg rounded-full">
									<HiOutlineCamera size={20} />
								</div>
							</div>
							<p class="font-bold">Tom</p>
							<p class="text-#5f6368 mb-4">peration0422@gmail.com</p>
							<div class="rounded-3xl px-4 mb-4 py-1 border border-gray-300 shadow-sm text-semibold">
								Google 계정 관리
							</div>
						</div>
						<div class="w-full flex px-16 py-4 flex-row justify-content items-center border-b-2 border-gray-100 cursor-pointer">
							<FiUserPlus size={20} color={"#5f6368"} class="mr-4" />
							<p class="font-medium">다른 계정 추가</p>
						</div>
						<div class="w-full py-4 flex flex-col justify-content items-center text-center border-b-2 border-gray-100 ">
							<button
								class="border border-gray-300 rounded-lg px-6 py-2 cursor-pointer"
								onClick={logOut}
							>
								로그아웃
							</button>
						</div>
						<div class="w-full py-6 flex flex-col justify-content items-center text-center ">
							<p class="text-xs">
								<a
									class="cursor-pointer"
									href="https://policies.google.com/privacy?hl=ko"
								>
									개인정보처리방침
								</a>{" "}
								·{" "}
								<a
									class="cursor-pointer"
									href="https://policies.google.com/terms?hl=ko"
								>
									서비스 약관
								</a>
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default navbar;
