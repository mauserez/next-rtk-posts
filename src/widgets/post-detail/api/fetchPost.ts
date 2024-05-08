import { PostType } from "../../post-list/model/types";
import { mainApi } from "@/shared/axios/mainApi";

export const fetchPost = async (id: PostType["id"]): Promise<PostType> => {
	return mainApi
		.get(`/posts?id=${id}&_embed=users`)
		.then((response) => response.data[0]);
};
