import { AssocArray } from "@/shared/types";
import { AlbumType } from "../model/types";
import { mainApi } from "@/shared/axios/mainApi";
import { randomInt } from "@/shared/utils/number";

export const fetchAlbums = async (
	options: AssocArray
): Promise<AlbumType[]> => {
	const random = randomInt(1, 90);

	return mainApi
		.get(`/albums?_start=${random}&_limit=10&_embed=photos`)
		.then((response) => response.data);
};
