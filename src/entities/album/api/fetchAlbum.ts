import { AlbumType } from "@/entities/albums/model/types";
import { mainApi } from "@/shared/axios/mainApi";

export const fetchAlbum = async (id: AlbumType["id"]): Promise<AlbumType> => {
	return mainApi
		.get(`/albums?id=${id}&_embed=photos`)
		.then((response) => response.data[0]);
};
