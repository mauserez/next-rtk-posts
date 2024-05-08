import { PostType } from "@/widgets/post-list/model/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { removeBy } from "@/shared/utils/array";

export interface PostsState {
	favoritePosts: PostType[];
}

const initialState: PostsState = {
	favoritePosts: [],
};

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPost: (state, action: PayloadAction<PostType>) => {
			state.favoritePosts.push(action.payload);
		},
		removePost: (state, action: PayloadAction<PostType["id"]>) => {
			state.favoritePosts = removeBy(state.favoritePosts, "id", action.payload);
		},
	},
	selectors: {
		isFavoritePost: (state, postId: PostType["id"]) => {
			return state.favoritePosts.some((el) => el.id === postId);
		},
	},
});

export const { addPost, removePost } = postsSlice.actions;
export const { isFavoritePost } = postsSlice.selectors;

export default postsSlice.reducer;
