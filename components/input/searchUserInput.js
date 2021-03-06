import React, { useEffect, useState } from "react";

const searchUserInput = (props) => {
	const text = props.placeholder;
	const name = props.name;
	const value = props.value;
	const changeFunction = props.changeFunction;

	const [active, setActive] = useState(false);
	return (
		<div className="customInputwrapper">
			<input
				type="text"
				placeholder={text}
				className={"customInput "}
				value={value}
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
