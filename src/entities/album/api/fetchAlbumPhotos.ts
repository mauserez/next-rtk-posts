import { PhotoType, AlbumType } from "@/entities/albums/model/types";
import { mainApi } from "@/shared/axios/mainApi";

type Options = {
	albumId: number;
	limit?: number;
	page?: number;
};

export const fetchPhotos = async (options: Options): Promise<PhotoType[]> => {
	const { albumId, limit = 10, page = 1 } = options;

	return mainApi
		.get(`/photos?albumId=${albumId}&_page=${page}&_limit=${limit}`)
		.then((response) => response.data);
};
