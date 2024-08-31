import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import postsReducer from "shared/redux/slices/posts/PostsSlice";
import albumsReducer from "shared/redux/slices/albums/AlbumsSlice";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
	posts: postsReducer,
	albums: albumsReducer,
});

const persistConfig = {
	key: "root",
	storage,
	//blacklist: ["words", "wordsApi"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
	const store = configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware({
				serializableCheck: false,
			});
		},
	});

	setupListeners(store.dispatch);
	return store;
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
