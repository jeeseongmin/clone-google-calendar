import React from "react";
import Image from "next/image";
import Logo from "../public/image/google.png";
import Logo2 from "../public/image/logo2.png";
import Router from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import "tailwindcss/tailwind.css";
import Elephant from "../public/image/elephant.jpg";
import Giraffe from "../public/image/giraffe.jpg";
import Dog1 from "../public/image/dog1.jpeg";
import Dog2 from "../public/image/dog2.jpg";

export default function login() {
	// const dispatch = useDispatch();

	const enterMain = async function () {
		// const login_payload = {
		// 	uuid: "bRPleP6CYGMgNqWTEFzjdEpAQYZ2",
		// 	email: "peration0422@gmail.com",
		// 	name: "sungmin jee",
		// 	photoUrl:
		// 		"https://lh3.googleusercontent.com/a-/AOh14Gjwk0opSq_YqsaT_N72cgQkMpItkgk1PhBV01Ze=s96-c",
		// 	threadKeys: [],
		// 	myThread: {},
		// 	temp: [],
		// };

		Router.push("/main");
	};

	return (
		<>
			<Head>
				<title>gmail-clone login</title>
				<meta
					name="google-site-verification"
					content="5OoTdfiuCbpvW90pjrj64IgiDszvnTSYT0qm9PUEluY"
				/>
			</Head>
			<div class="w-full min-h-screen border flex justify-center flex-col items-center">
				<div class="py-12  mb-4 border border-gray-300 rounded-lg flex flex-col justify-center text-center relative">
					<div class="w-full mb-4">
						<Image
							src={Logo}
							width={80}
							height={30}
							alt="Picture of the author"
						/>
					</div>
					<h2 class="mb-2 text-xl font-medium">로그인(clone 사이트)</h2>
					<p class="mb-8">Google 계정 사용</p>
					<div class="w-full mb-8 relative flex justify-center flex-col">
						<div
							class="border px-4 py-3 mb-0 w-96 mx-12 rounded-mg border-gray-300 shadow-md flex flex-row items-center cursor-pointer"
							onClick={enterMain}
						>
							<Image
								src={Dog1}
								width={40}
								height={40}
								class="flex-1 rounded-full object-cover"
								alt="Picture of the author"
							/>
							<div class="w-full flex-shrink text-center">Tom으로 로그인</div>
						</div>
						<div
							class="border px-4 py-3 w-96 mb-0 mx-12 rounded-mg border-gray-300 shadow-md flex flex-row items-center cursor-pointer"
							onClick={enterMain}
						>
							<Image
								src={Dog2}
								width={40}
								height={40}
								class="flex-1 rounded-full object-cover"
								alt="Picture of the author"
							/>
							<div class="w-full flex-shrink text-center">Steve로 로그인</div>
						</div>
						<div
							class="border px-4 py-3 w-96 mb-0 mx-12 rounded-mg border-gray-300 shadow-md flex flex-row items-center cursor-pointer"
							onClick={enterMain}
						>
							<Image
								src={Giraffe}
								width={40}
								height={40}
								class="flex-1 rounded-full object-cover"
								alt="Picture of the author"
							/>
							<div class="w-full flex-shrink text-center">Pery로 로그인</div>
						</div>
						<div
							class="border px-4 py-3 w-96 mb-8 mx-12 rounded-mg border-gray-300 shadow-md flex flex-row items-center cursor-pointer"
							onClick={enterMain}
						>
							<Image
								src={Elephant}
								width={40}
								height={40}
								class="flex-1 rounded-full object-cover"
								alt="Picture of the author"
							/>
							<div class="w-full flex-shrink text-center">Bucky로 로그인</div>
						</div>
						<div class="w-96 mx-12 text-left mb-8">
							내 컴퓨터가 아닌가요? 게스트 모드를 사용하여 비공개로
							로그인하세요.{" "}
							<span class="text-blue-600 cursor-pointer">
								<a href="https://support.google.com/chrome/answer/6130773?hl=ko">
									자세히 알아보기
								</a>
							</span>
						</div>
						<div class="w-96 mx-12 text-left">
							<span class="text-blue-600 cursor-pointer">
								<a href="https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp">
									계정 만들기
								</a>
							</span>
						</div>
					</div>
					<div class="w-96 rounded-lg flex justify-end text-right absolute -bottom-12 -right-2">
						<div class="flex flex-row justify-end">
							<p class="ml-4">
								<a href="https://support.google.com/accounts?hl=ko#topic=3382296">
									도움말
								</a>
							</p>
							<p class="ml-4">
								<a href="https://policies.google.com/privacy?gl=KR&hl=ko">
									개인정보 보호
								</a>
							</p>
							<p class="ml-4">
								<a href="https://policies.google.com/terms?gl=KR&hl=ko">약관</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
