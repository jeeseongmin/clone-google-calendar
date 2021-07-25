import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiOutlineCamera } from "react-icons/hi";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import Calendar_Week from "./Calendar_Week";

const Calendar = (props) => {
	const selectDate = props.date;
	console.log("selectDate", selectDate);

	return (
		<table class="w-full">
			<thead>
				<tr class="w-56 text-xs font-light text-gray-500 flex flex-row justify-start">
					<th class="flex-grow-1 w-8">일</th>
					<th class="flex-grow-1 w-8">월</th>
					<th class="flex-grow-1 w-8">화</th>
					<th class="flex-grow-1 w-8">수</th>
					<th class="flex-grow-1 w-8">목</th>
					<th class="flex-grow-1 w-8">금</th>
					<th class="flex-grow-1 w-8">토</th>
				</tr>
			</thead>
			<tbody class="">
				{[0, 1, 2, 3, 4, 5].map((element, index) => {
					return <Calendar_Week week={element} date={selectDate} />;
				})}
			</tbody>
		</table>
	);
};

export default Calendar;
