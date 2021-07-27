import React, { useEffect, useState } from "react";

const searchUserInput = (props) => {
	const bgColor = props.bgColor;

	const [active, setActive] = useState(false);
	return (
		<div className="customInputwrapper">
			<input
				type="text"
				placeholder="사용자 검색"
				className={"customInput " + bgColor}
				onFocus={(e) => setActive(true)}
				onBlur={(e) => setActive(false)}
			/>
			<div className="customInputDefaultBottomBorder"></div>
			<div
				className={
					"customInputBottomBorder " +
					(active ? "customInputBottomBorder_active" : "")
				}
			></div>
		</div>
	);
};

export default searchUserInput;
