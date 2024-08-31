import { PostType, PostUserType } from "entities/post/types";
import { jsonPlaceholderApi } from "shared/axios/jsonPlaceholderApi";
import { randomInt } from "shared/lib/number";
import queryString from "query-string";

export async function getPost(id: PostType["id"]): Promise<PostType> {
	const { data } = await jsonPlaceholderApi.get(`/posts?id=${id}&_embed=users`);
	return data[0];
}

export async function getPostUser(
	id: PostUserType["id"]
): Promise<PostUserType> {
	const { data } = await jsonPlaceholderApi.get(`/users?id=${id}`);
	return data[0] ?? null;
}

type GetPostsOptions = { user: number; title: string };
export async function getPosts(options: GetPostsOptions): Promise<PostType[]> {
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

	const { data } = await jsonPlaceholderApi.get(`/posts?${searchUrl}`);
	return data;
}
