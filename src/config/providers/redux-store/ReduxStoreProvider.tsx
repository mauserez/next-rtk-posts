"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "shared/redux/store";
import { PersistGate } from "redux-persist/integration/react";

type ReduxStoreProviderProps = {
	children: ReactNode;
};

export function ReduxStoreProvider(props: ReduxStoreProviderProps) {
	const { children } = props;

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}
