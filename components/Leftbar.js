import React, { useState } from "react";
import Image from "next/image";
import plus from "../public/image/plus.png";
import {
	IoMdMailOpen,
	IoMdSend,
	IoMdDocument,
	IoMdTrash,
} from "react-icons/io";
import Router from "next/router";
import { MdSend } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const Leftbar = () => {
	const [hoverMenu, setHoverMenu] = useState(0);
	const [isLongSide, setIsLongSide] = useState(true);

	// const dispatch = useDispatch();
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

	return (
		<div
			class={
				" flex-grow-0 flex flex-col items-start flex-shrink-0 " +
				(isLongSide ? "w-64 mr-2 pr-4" : "w-19 relative mr-1")
			}
		>
			<div class="my-3 mb-4 ml-1">
				<div
					// onClick={() => dispatch(setSendMail("open"))}
					class={
						"w-auto flex flex-row ml-1 pl-2 py-2 justify-center items-center cursor-pointer shadow-lg rounded-full border border-gray-300 hover:shadow-2xl " +
						(isLongSide ? "pr-4" : "pr-2")
					}
				>
					<Image
						src={plus}
						width={35}
						height={35}
						class="object-contain"
						alt="Picture of the author"
					/>
					{isLongSide && (
						<button class="ml-2 text-sm font-medium">만들기</button>
					)}
				</div>
			</div>
			<div class="w-full flex flex-col pb-4 border-b-2 border-gray-100"></div>
		</div>
	);
};

export default Leftbar;
