import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FiUserPlus } from "react-icons/fi";

import Image from "next/image";
import { toggleProfile } from "../reducers/settingSlice";
import { HiOutlineCamera } from "react-icons/hi";
import Default from "../public/image/default-img.png";
import Elephant from "../public/image/elephant.jpg";
import Giraffe from "../public/image/giraffe.jpg";
import Dog1 from "../public/image/dog1.jpeg";
import Dog2 from "../public/image/dog2.jpg";

const Profile = () => {
	const [profileImg, setProfileImg] = useState(Default);
	const dispatch = useDispatch();
	const profileRef = useRef(null);
	// profile modal toggle
	const profileModal = useSelector((state) => state.setting.profileModal);

	const currentUser = useSelector((state) => state.setting.currentUser);
	useEffect(() => {
		console.log("profile");

		if (currentUser.name === "Tom") setProfileImg(Dog1);
		else if(currentUser.name === "Steve") setProfileImg(Dog2);
		else if(currentUser.name === "Pery") setProfileImg(Giraffe);
		else if(currentUser.name === "Bucky") setProfileImg(Elephant);
	}, []);
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

	const onToggleProfile = () => {
		dispatch(toggleProfile(!profileModal));
	};

	const logOut = () => {
		alert("로그아웃 되었습니다.");
		dispatch(toggleProfile(false));

		Router.push("/");
	};

	return (
		<div ref={profileRef} class="z-30 ml-8 mr-2 select-none relative">
			{
				<div class="w-10 flex items-center">
					<Image
						src={profileImg || Default}
						width={55}
						height={55}
						class="z-30 cursor-pointer mr-8 flex-1 rounded-full object-cover focus:shadow-mg "
						onClick={onToggleProfile}
						alt="Picture of the author"
					/>
				</div>
			}
			{profileModal && (
				<div class="z-30 absolute m-4 pt-8 shadow-lg bg-white rounded-lg w-96 h-auto top-19 right-0 border border-gray-300">
					<div class="w-full flex flex-col justify-content items-center text-center border-b-2 border-gray-100 ">
						<div class="relative mb-4">
							<Image
								src={profileImg || Default}
								width={80}
								height={80}
								class="object-cover cursor-pointer rounded-full"
								alt="Picture of the author"
							/>
							<div class="absolute p-1 cursor-pointer bg-white -bottom-1 -right-1 shadow-lg rounded-full">
								<HiOutlineCamera size={20} />
							</div>
						</div>
						<p class="font-bold">{currentUser.name}</p>
						<p class="text-#5f6368 mb-4">{currentUser.email}</p>
						<div class="rounded-3xl px-4 mb-4 py-1 border border-gray-300 shadow-sm text-semibold">
							Google 계정 관리
						</div>
					</div>
					<div class="w-full flex px-16 py-4 flex-row justify-content items-center border-b-2 border-gray-100 cursor-pointer">
						<FiUserPlus size={20} color={"#5f6368"} class="mr-4" />
						<p class="font-medium">다른 계정 추가</p>
					</div>
					<div class="z-50 w-full py-4 flex flex-col justify-content items-center text-center border-b-2 border-gray-100 ">
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
	);
};

export default Profile;
