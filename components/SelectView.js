import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import {
	changeView,
	updateOption,
	toggleViewModal,
} from "../reducers/settingSlice";

const SelectView = () => {
	const dispatch = useDispatch();
	const viewRef = useRef(null);
	// viewModal toggle
	const viewModal = useSelector((state) => state.setting.viewModal);
	// current viewType
	const viewType = useSelector((state) => state.setting.viewType);
	// weekend or rejected
	const option = useSelector((state) => state.setting.option);

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

	const onToggleViewModal = () => {
		dispatch(toggleViewModal(!viewModal));
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
		<div ref={viewRef} class="h-full relative mr-10 select-none">
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
	);
};

export default SelectView;
