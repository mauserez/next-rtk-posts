import { AssocArray } from "@/shared/types";
import { AlbumType } from "@/entities/album/types";
import { mainApi } from "@/shared/axios/mainApi";
import { randomInt } from "@/shared/utils/number";
import queryString from "query-string";

export const ALBUM_QUERY_KEY = "album";
export const ALBUMS_QUERY_KEY = "albums";

export const getAlbum = async (id: AlbumType["id"]): Promise<AlbumType> => {
	return await mainApi
		.get(`/albums?id=${id}&_embed=photos`)
		.then((response) => response.data[0]);
};

export const getAlbums = async (options: AssocArray): Promise<AlbumType[]> => {
	const { title = "" } = options;

	const sortValue = ["userId", "id", "title", "url"][randomInt(0, 3)];
	const orderValue = ["asc", "desc"][randomInt(0, 1)];

	const searchParams = {
		title_like: title,
		_limit: 10,
		_sort: sortValue,
		_order: orderValue,
		_embed: "photos",
	};

	const searchUrl = queryString.stringify(searchParams);
	return await mainApi
		.get(`/albums?${searchUrl}`)
		.then((response) => response.data);
};
