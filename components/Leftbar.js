import React, { useState } from "react";
import Image from "next/image";
import plus from "../public/image/plus.png";
import {
	IoMdMailOpen,
	IoMdSend,
	IoMdDocument,
	IoMdTrash,
	IoIosArrowBack,
	IoIosArrowForward,
} from "react-icons/io";
import Router from "next/router";
import { MdSend } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BsPeopleFill } from "react-icons/bs";
import Calendar from "./Calendar";
import SearchUserInput from "./input/searchUserInput";
import { updateLeftbarDate } from "../reducers/settingSlice";
import dayjs from "dayjs";

const Leftbar = () => {
	// 나중에 redux에서 전역으로 관리해보기.
	// const [selectDate, setSelectDate] = useState(dayjs());

	const [hoverMenu, setHoverMenu] = useState(0);
	const [isLongSide, setIsLongSide] = useState(true);
	const isToggled = useSelector((state) => state.setting.isToggled);
	const leftbarDate = useSelector((state) => state.setting.leftbarDate);

	const dispatch = useDispatch();
	// const menuType = useSelector((state) => state.modal.menuType);
	// const isLongSide = useSelector((state) => state.modal.isLongSide);
	// const onRefresh = () => {
	// 	dispatch(resetCheckThread());
	// };
	// const onHoverMenu = (num) => {
	// 	setHoverMenu(num);
	// };

	// const onMenuClick = (type) => {
	// 	dispatch(setMenuType(type));
	// 	Router.push("/main");
	// 	onRefresh();
	// };

	const ManipulateMonth = (num) => {
		if (num === 1) {
			// setSelectDate(selectDate.add(1, "month"));
			dispatch(updateLeftbarDate(leftbarDate.add(1, "month")));
		} else {
			// setSelectDate(selectDate.subtract(1, "month"));
			dispatch(updateLeftbarDate(leftbarDate.subtract(1, "month")));
		}
	};

	return (
		<div
			class={
				" flex-grow-0 flex flex-col items-start flex-shrink-0 " +
				(isToggled ? "w-64 mr-2 pr-4" : "w-19 relative mr-1")
			}
		>
			<div class="my-3 mb-4 ml-1">
				<div
					// onClick={() => dispatch(setSendMail("open"))}
					class={
						"w-auto flex flex-row ml-1 pl-2 py-2 justify-center items-center cursor-pointer shadow-lg rounded-full border border-gray-300 hover:shadow-2xl " +
						(isToggled ? "pr-4" : "pr-2")
					}
				>
					<Image
						src={plus}
						width={35}
						height={35}
						class="object-contain"
						alt="Picture of the author"
					/>
					{isToggled && (
						<button class="ml-2 text-sm font-medium">만들기</button>
					)}
				</div>
			</div>
			<div class={"w-full flex flex-col pb-4 " + (isToggled ? "" : "hidden")}>
				<div class="w-full mx-4 px-2 mb-4 h-60 ">
					<div class="w-full flex justify-between flex-row items-center">
						<div class="text-sm font-semibold">
							{leftbarDate.format("YYYY년 M월")}
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
					<Calendar date={leftbarDate} key={leftbarDate} />
				</div>
				<div class="px-3">
					<div class="w-full mx-4 relative">
						<div class="mb-2 text-sm text-gray-700">참석자 추가...</div>
						<SearchUserInput bgColor={"gray"} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Leftbar;
