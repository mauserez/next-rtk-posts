import { PostType } from "../../../entities/post/types";
import { mainApi } from "@/shared/axios/mainApi";
import { randomInt } from "@/shared/utils/number";
import queryString from "query-string";

type Options = { user: number; title: string };
export const fetchPosts = async (options: Options): Promise<PostType[]> => {
	const { user, title = "" } = options;

	const sortValue = ["userId", "id", "title", "body"][randomInt(0, 3)];
	const orderValue = ["asc", "desc"][randomInt(0, 1)];

	const searchParams = {
		userId: user,
		title_like: title,
		_limit: 4,
		_sort: sortValue,
		_order: orderValue,
	};

	const searchUrl = queryString.stringify(searchParams);

	return await mainApi
		.get(`/posts?${searchUrl}`)
		.then((response) => response.data);
};
