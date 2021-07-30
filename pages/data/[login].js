import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Head from "next/head";
import { useRouter } from "next/router";

import { setUser } from "../../reducers/userSlice";
import { setCurrentUser } from "../../reducers/settingSlice";
import { setEvent } from "../../reducers/eventSlice";
import Elephant from "../../public/image/elephant.jpg";
import Giraffe from "../../public/image/giraffe.jpg";
import Dog1 from "../../public/image/dog1.jpeg";
import Dog2 from "../../public/image/dog2.jpg";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { route } from "next/dist/next-server/server/router";

const init = () => {
	dayjs.locale("ko"); // global로 한국어 locale 사용

	const router = useRouter();
	const { login } = router.query;

	const dispatch = useDispatch();
	useEffect(() => {
		try {
			const event_uuid = uuidv4();

			const Tom_calendar = {};
			Tom_calendar[uuidv4()] = {
				name: "Tom",
				color: "red",
				isChecked: true,
			};

			const Pery_calendar = {};
			Pery_calendar[uuidv4()] = {
				name: "Pery",
				color: "yellow",
				isChecked: true,
			};

			const Steve_calendar = {};
			Steve_calendar[uuidv4()] = {
				name: "Steve",
				color: "green",
				isChecked: true,
			};

			const Bucky_calendar = {};
			Bucky_calendar[uuidv4()] = {
				name: "Bucky",
				color: "purple",
				isChecked: true,
			};

			const user = {};
			user[uuidv4()] = {
				name: "Tom",
				email: "tom0422@gmail.com",
				profileUrl: Dog1,
				myCalendar: Tom_calendar,
				event: {},
			};
			user[uuidv4()] = {
				name: "Steve",
				email: "steve0120@gmail.com",
				profileUrl: Dog2,
				myCalendar: Steve_calendar,
				event: {},
			};
			user[uuidv4()] = {
				name: "Pery",
				email: "perry0113@gmail.com",
				profileUrl: Giraffe,
				myCalendar: Pery_calendar,
				event: {},
			};
			user[uuidv4()] = {
				name: "Bucky",
				email: "bucky0422@gmail.com",
				profileUrl: Elephant,
				myCalendar: Bucky_calendar,
				event: {},
			};

			const host_arr = Object.keys(user).filter(function (element, index) {
				return user[element].name === login;
			});

			const host_uuid = host_arr[0];
			// event 추가하기
			const host = user[host_uuid];

			const nameArr = Object.keys(user).filter(function (element, index) {
				return user[element].name !== login;
			});
			const guest_uuid = nameArr[0];

			const participants = {};
			participants[host_uuid] = {
				status: "accept",
				isRequire: true,
			};
			participants[guest_uuid] = {
				status: "waiting",
				isRequired: true,
			};

			const event = {};
			event[event_uuid] = {
				title: "Ringle 멘토링",
				description: "꼭 참석하기",
				period: {
					start: dayjs("2021-07-19").add(13, "hour"),
					end: dayjs("2021-07-19").add(15, "hour"),
				},
				type: "default",
				participants: participants,
				host: {
					uuid: host_uuid,
					myCalendar: Object.keys(host.myCalendar)[0],
				},
				color: host.myCalendar[Object.keys(host.myCalendar)[0]].color,
				repeat: {
					type: "repeat",
					day: ["monday", "tuesday", "wednseday", "Thursday", "Friday"],
					end: dayjs("2021-07-31"),
					rejected: {},
					deleted: {},
				},
				isDeleted: false,
				authority: ["view"],
				created: dayjs(),
				deleted: null,
			};

			user[host_uuid].event[event_uuid] = {
				title: event[event_uuid].title,
				description: event[event_uuid].description,
				color: event[event_uuid].color,
				isDeleted: false,
				rejected: {},
			};
			user[guest_uuid].event[event_uuid] = {
				title: event[event_uuid].title,
				description: event[event_uuid].description,
				color: event[event_uuid].color,
				isDeleted: false,
				rejected: {},
			};
			const currentUser = { ...user[host_uuid], uuid: host_uuid };

			dispatch(setUser(user));
			dispatch(setCurrentUser(currentUser));
			dispatch(setEvent(event));
			Router.push("/main");
		} catch (error) {
			console.log(error);
			// location.reload();
			Router.push("/");
		}
	}, []);

	return (
		<>
			<Head>
				<title>Loading</title>
			</Head>
			<div></div>
		</>
	);
};

export default init;
