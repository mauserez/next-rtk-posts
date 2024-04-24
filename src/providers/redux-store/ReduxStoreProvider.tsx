"use client";

import { ReactNode } from "react";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../../shared/store/redux/store";

type TanstackReduxStoreProvider = {
	children: ReactNode;
};

export const ReduxStoreProvider = (props: TanstackReduxStoreProvider) => {
	const { children } = props;
	const storeRef = useRef<AppStore>();

	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
};
