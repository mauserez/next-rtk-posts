import { PhotoType } from "@/entities/album/types";
import { mainApi } from "@/shared/axios/mainApi";

type FetchPhotosOptions = {
	albumId: number;
	limit?: number;
	page?: number;
};

export const fetchPhotos = async (
	options: FetchPhotosOptions
): Promise<PhotoType[]> => {
	const { albumId, limit = 10, page = 1 } = options;

	return await mainApi
		.get(`/photos?albumId=${albumId}&_page=${page}&_limit=${limit}`)
		.then((response) => response.data);
};
