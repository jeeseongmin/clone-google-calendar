import React from "react";
import Navbar from "../components/navbar";
import Leftbar from "../components/Leftbar";
import { useDispatch, useSelector } from "react-redux";
import AddEvent from "../components/AddEvent";
import { toggleCalendarModal } from "../reducers/settingSlice";

const Layout = (props) => {
	const dispatch = useDispatch();
	const calendarModal = useSelector((state) => state.setting.calendarModal);

	return (
		<div class="z-20 max-h-screen w-full flex flex-col relative">
			<Navbar />
			<div class="z-80 w-full h-auto flex relative">
				<AddEvent />
				<Leftbar />
				{props.children}
			</div>
		</div>
	);
};

export default Layout;
