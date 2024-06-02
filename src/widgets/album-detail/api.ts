import { AlbumType } from "@/widgets/album-list/types";
import { mainApi } from "@/shared/axios/mainApi";

export const fetchAlbum = async (id: AlbumType["id"]): Promise<AlbumType> => {
	return await mainApi
		.get(`/albums?id=${id}&_embed=photos`)
		.then((response) => response.data[0]);
};
