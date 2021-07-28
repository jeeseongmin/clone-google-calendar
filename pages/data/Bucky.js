import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Elephant from "../../public/image/elephant.jpg";
import Giraffe from "../../public/image/giraffe.jpg";
import Dog1 from "../../public/image/dog1.jpeg";
import Dog2 from "../../public/image/dog2.jpg";
import { setUser } from "../../reducers/userSlice";
import { setCurrentUser } from "../../reducers/settingSlice.js";
import Head from "next/head";
import Router from "next/router";

const Bucky = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const uid = uuidv4();
		const calendar_uid = uuidv4();
		const calendar = {};
		calendar[calendar_uid] = {
			name: "Bucky",
			color: "purple",
			isChecked: true,
		};
		const payload = {
			name: "Bucky",
			email: "bucky0422@gmail.com",
			profileUrl: Elephant,
			myCalendar: calendar,
			Event: {},
		};
		const user = {};
		user[uid] = payload;
		console.log("user", user);

		dispatch(setUser(user));
		dispatch(setCurrentUser(payload));
		Router.push("/main");
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

export default Bucky;
