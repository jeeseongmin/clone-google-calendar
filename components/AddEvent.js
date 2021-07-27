import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import plus from "../public/image/plus.png";

const AddEvent = () => {
	const isToggled = useSelector((state) => state.setting.isToggled);

	return (
		<div class="z-50 my-3 mb-4 ml-1 absolute select-none">
			<div
				class={
					"bg-white w-auto flex flex-row ml-1 pl-2 py-2 justify-center items-center cursor-pointer shadow-lg rounded-full border border-gray-300 hover:shadow-2xl " +
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
				{isToggled && <button class="ml-2 text-sm font-medium">만들기</button>}
			</div>
		</div>
	);
};

export default AddEvent;
