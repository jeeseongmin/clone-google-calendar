import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Year from "./view/year/Year";
import Month from "./view/month/Month";
import Week from "./view/week/Week";
import Day from "./view/day/Day";

const ViewContainer = () => {
	const dispatch = useDispatch();
	const viewType = useSelector((state) => state.setting.viewType);
	if (viewType === "Year") {
		return <Year />;
	} else if (viewType === "Month") {
		return <Month />;
	} else if (viewType === "Week") {
		return <Week />;
	} else if (viewType === "Day") {
		return <Day />;
	}
};

export default ViewContainer;
