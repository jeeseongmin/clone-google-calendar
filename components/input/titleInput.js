import React, { useEffect, useState, useRef } from "react";

const titleInput = (props) => {
	const text = props.placeholder;
	const name = props.name;
	const value = props.value;
	const changeFunction = props.changeFunction;
	const titleRef = props.titleRef;

	const [active, setActive] = useState(false);
	return (
		<div className="customInputwrapper">
			<input
				type="text"
				placeholder={text}
				className="customInput titleText"
				value={value}
				ref={titleRef}
				onChange={(e) => changeFunction(e, name)}
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

export default titleInput;
