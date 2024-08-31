import { jsonPlaceholderApi } from "shared/axios/jsonPlaceholderApi";
import { AssocArray } from "shared/types";
import { AlbumType, AlbumPhotoType } from "entities/album/types";
import { randomInt } from "shared/lib/number";
import queryString from "query-string";

export async function getAlbum(id: AlbumType["id"]): Promise<AlbumType> {
	const { data } = await jsonPlaceholderApi.get(
		`/albums?id=${id}&_embed=photos`
	);

	return data[0];
}

export async function getAlbums(options: AssocArray): Promise<AlbumType[]> {
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

	const { data } = await jsonPlaceholderApi.get(`/albums?${searchUrl}`);
	return data;
}

type GetPhotosOptions = {
	albumId: number;
	limit?: number;
	page?: number;
};

export async function getPhotos(
	options: GetPhotosOptions
): Promise<AlbumPhotoType[]> {
	const { albumId, limit = 10, page = 1 } = options;
	const { data } = await jsonPlaceholderApi.get(
		`/photos?albumId=${albumId}&_page=${page}&_limit=${limit}`
	);

	return data;
}
