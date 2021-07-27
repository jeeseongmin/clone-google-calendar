import React from "react";
import Navbar from "../components/navbar";
import Leftbar from "../components/Leftbar";
import AddEvent from "../components/AddEvent";

const Layout = (props) => {
	return (
		<div class="z-20 min-h-screen w-full flex flex-col relative overflow-hidden">
			<Navbar />
			<div class="w-full h-full flex relative">
				<AddEvent />
				<Leftbar />
				{props.children}
			</div>
		</div>
	);
};

export default Layout;
