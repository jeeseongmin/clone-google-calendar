import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FiMenu, FiUserPlus } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiOutlineCamera } from "react-icons/hi";

import gmailLogo from "../public/image/gmailLogo.png";
import Image from "next/image";
import calendar from "../public/image/google-calendar.png";

const navbar = () => {
	// const dispatch = useDispatch();
	// // const userAuth = firebase.auth().currentUser;
	// const profileModal = useSelector((state) => state.modal.profileModal);
	// const isLongSide = useSelector((state) => state.modal.isLongSide);
	// const userList = useSelector((state) => state.user);
	// const profileRef = useRef(null);

	// // ref 이외의 다른 부분을 클릭했을 때에 일어나야 하는 일
	// useEffect(() => {
	// 	if (!profileModal) return;
	// 	function handleClick(e) {
	// 		if (profileRef.current.contains(e.target)) {
	// 		} else {
	// 			dispatch(setProfileModal(false));
	// 		}
	// 	}
	// 	window.addEventListener("click", handleClick);

	// 	return () => window.removeEventListener("click", handleClick);
	// }, [profileModal]);

	// // 일단 임시로
	// const user = useSelector((state) => state.current_user);

	// const onToggleProfile = () => {
	// 	dispatch(setProfileModal(!profileModal));
	// };

	// const onToggleSidebar = () => {
	// 	dispatch(setIsLongSide(!isLongSide));
	// };

	// const logOut = () => {
	// 	alert("로그아웃 되었습니다.");
	// 	Router.push("/");
	// 	dispatch(resetModal());
	// 	// dispatch(resetUser());
	// };

	return (
		<div class="h-30 flex flex-row justify-start items-center shadow-mg border-b-2 border-gray-100 ">
			<div class="w-64 mr-2 pr-4 pl-4 flex flex-row items-center flex-shrink-0">
				<FiMenu
					size={36}
					color={"#5f6368"}
					class="mr-6 p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
					// onClick={onToggleSidebar}
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
					<button class="px-3 py-1.5 border border-gray-300 rounded-md text-sm">
						오늘
					</button>
				</div>
				<IoIosArrowBack
					size={35}
					color={"#5f6368"}
					class="ml-3 p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
				/>
				<IoIosArrowForward
					size={35}
					color={"#5f6368"}
					class="mr-3 p-2 cursor-pointer hover:rounded-full hover:bg-gray-300"
				/>
				<label class="text-xl p-2">2021년 7월</label>
			</div>
			{/* <div ref={profileRef} class="relative ml-8 z-30">
				{user && (
					<img
						src={user.photoUrl}
						width={40}
						height={40}
						class="z-30 mr-8 object-contain cursor-pointer rounded-full focus:shadow-mg "
						onClick={onToggleProfile}
						alt="Picture of the author"
					/>
				)}
				{profileModal && (
					<div class="z-30 absolute m-4 pt-8 shadow-lg bg-white rounded-lg w-96 h-auto top-19 right-0 border border-gray-300">
						<div class="w-full flex flex-col justify-content items-center text-center border-b-2 border-gray-100 ">
							<div class="relative mb-4">
								<img
									src={user.photoUrl}
									width={80}
									height={80}
									class="object-contain cursor-pointer rounded-full"
									alt="Picture of the author"
								/>
								<div class="absolute p-1 cursor-pointer bg-white -bottom-1 -right-1 shadow-lg rounded-full">
									<HiOutlineCamera size={20} />
								</div>
							</div>
							<p class="font-bold">{user.name}</p>
							<p class="text-#5f6368 mb-4">{user.email}</p>
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
			</div> */}
		</div>
	);
};

export default navbar;
