import React from "react";

export function getColor(text) {
	if (text === "blue") {
		return "bg-blue-400 ";
	} else if (text === "red") {
		return "bg-red-400 ";
	} else if (text === "yellow") {
		return "bg-yellow-400 ";
	} else if (text === "gray") {
		return "bg-gray-400 ";
	} else if (text === "purple") {
		return "bg-purple-400 ";
	} else if (text === "green") {
		return "bg-green-400 ";
	} else if (text === "pink") {
		return "bg-pink-400 ";
	}
}
