import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiOutlineCamera } from "react-icons/hi";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import Calendar_Week from "./Calendar_Week";

const Calendar = (props) => {
	const selectDate = props.date;
	const type = props.type;

	return (
		<table class="w-full select-none">
			<thead>
				<tr class="w-full text-xs font-light text-gray-500 flex flex-row justify-between">
					<th class="flex-grow-1 w-6 h-6">일</th>
					<th class="flex-grow-1 w-6 h-6">월</th>
					<th class="flex-grow-1 w-6 h-6">화</th>
					<th class="flex-grow-1 w-6 h-6">수</th>
					<th class="flex-grow-1 w-6 h-6">목</th>
					<th class="flex-grow-1 w-6 h-6">금</th>
					<th class="flex-grow-1 w-6 h-6">토</th>
				</tr>
			</thead>
			<tbody class="">
				{[0, 1, 2, 3, 4, 5].map((element, index) => {
					return (
						<Calendar_Week
							key={element}
							week={element}
							date={selectDate}
							type={type}
						/>
					);
				})}
			</tbody>
		</table>
	);
};

export default Calendar;
