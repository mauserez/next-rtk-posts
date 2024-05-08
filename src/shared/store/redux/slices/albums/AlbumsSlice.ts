import { AlbumType } from "@/widgets/album-list/model/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { removeBy } from "@/shared/utils/array";

export interface AlbumsState {
	favoriteAlbums: AlbumType[];
}

const initialState: AlbumsState = {
	favoriteAlbums: [],
};

export const albumsSlice = createSlice({
	name: "albums",
	initialState,
	reducers: {
		addAlbum: (state, action: PayloadAction<AlbumType>) => {
			//const { photos, ...album } = action.payload;
			state.favoriteAlbums.push(action.payload);
		},
		removeAlbum: (state, action: PayloadAction<AlbumType["id"]>) => {
			state.favoriteAlbums = removeBy(
				state.favoriteAlbums,
				"id",
				action.payload
			);
		},
	},
	selectors: {
		isFavoriteAlbum: (state, albumId: AlbumType["id"]) => {
			return state.favoriteAlbums.some((el) => el.id === albumId);
		},
	},
});

export const { addAlbum, removeAlbum } = albumsSlice.actions;
export const { isFavoriteAlbum } = albumsSlice.selectors;

export default albumsSlice.reducer;
