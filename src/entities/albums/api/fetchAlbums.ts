import { AssocArray } from "@/shared/types";
import { AlbumType } from "../model/types";
import { mainApi } from "@/shared/axios/mainApi";
import { randomInt } from "crypto";

export const fetchAlbums = (options: AssocArray): Promise<AlbumType[]> => {
	const random = randomInt(1, 90);

	console.log(random);

	return mainApi
		.get(`/albums?_start=${random}&_limit=10&_embed=photos`)
		.then((response) => response.data);
};
