export const POST_QUERY_KEY = "post";
export const POSTS_QUERY_KEY = "posts";
export const POST_USER_QUERY_KEY = "post-user";

import { PostType, PostUserType } from "entities/post/types";
import { mainApi } from "shared/axios/mainApi";
import { randomInt } from "@/shared/utils/number";
import queryString from "query-string";

export const getPost = async (id: PostType["id"]): Promise<PostType> => {
	return mainApi
		.get(`/posts?id=${id}&_embed=users`)
		.then((response) => response.data[0]);
};

export const getPostUser = async (
	id: PostUserType["id"]
): Promise<PostUserType> => {
	return mainApi.get(`/users?id=${id}`).then((response) => response.data[0]);
};

type GetPostsOptions = { user: number; title: string };
export const getPosts = async (
	options: GetPostsOptions
): Promise<PostType[]> => {
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
