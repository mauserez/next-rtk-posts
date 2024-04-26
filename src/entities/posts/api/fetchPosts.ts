import { AssocArray } from "@/shared/types";
import { PostType } from "../model/types";
import { mainApi } from "@/shared/axios/mainApi";
import { randomInt } from "@/shared/utils/number";

export const fetchPosts = async (): Promise<PostType[]> => {
	const random = randomInt(1, 90);

	return mainApi
		.get(`/posts?_start=${random}&_limit=4&_embed=photos`)
		.then((response) => response.data);
};
