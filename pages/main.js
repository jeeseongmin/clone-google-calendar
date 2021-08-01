import React, { useEffect } from "react";
import Layout from "../components/Layout";
import ViewContainer from "../components/ViewContainer";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
const Main = () => {
	const currentUser = useSelector((state) => state.setting.currentUser);
	useEffect(() => {
		if (currentUser.name === undefined) {
			alert("세션이 만료되었습니다.");
			Router.push("/");
		}
	}, [currentUser]);
	return (
		<>
			{currentUser.name !== undefined && (
				<Layout>
					<ViewContainer />
				</Layout>
			)}
		</>
	);
};

export default Main;
