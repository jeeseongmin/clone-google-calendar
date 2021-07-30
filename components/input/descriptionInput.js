import React, { useEffect, useState } from "react";

const descriptionInput = (props) => {
	const text = props.placeholder;
	const value = props.value;
	const name = props.name;
	const changeFunction = props.changeFunction;

	const [active, setActive] = useState(false);
	return (
		<div className="customInputwrapper">
			<input
				type="text"
				placeholder={text}
				className="customInput descriptionText"
				value={value}
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

export default descriptionInput;
