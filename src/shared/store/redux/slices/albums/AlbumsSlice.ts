import { AlbumType } from "@/entities/album/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { removeFromArrayByKeyValue } from "@/shared/utils/array";

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
			state.favoriteAlbums = removeFromArrayByKeyValue(
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
