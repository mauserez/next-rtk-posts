import { AlbumPhotoType } from "@/entities/album/types";
import { mainApi } from "@/shared/axios/mainApi";

export const ALBUM_PHOTOS_QUERY_KEY = "album-photos";

type GetPhotosOptions = {
	albumId: number;
	limit?: number;
	page?: number;
};

export const getPhotos = async (
	options: GetPhotosOptions
): Promise<AlbumPhotoType[]> => {
	const { albumId, limit = 10, page = 1 } = options;

	return await mainApi
		.get(`/photos?albumId=${albumId}&_page=${page}&_limit=${limit}`)
		.then((response) => response.data);
};
