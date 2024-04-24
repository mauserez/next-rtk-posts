import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PostsState {
	value: number;
}

const initialState: PostsState = {
	value: 0,
};

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
	},
	selectors: {
		currentValue: (state) => {
			return state.value;
		},
	},
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = postsSlice.actions;
export const { currentValue } = postsSlice.selectors;

export default postsSlice.reducer;
