import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { store } from "../config/store";
import "../App.css";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";

// const store = createStore(rootReducer);
// const persistor = persistStore(store);

const MyApp = ({ Component, pageProps }) => {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
};

export default MyApp;
