import { headers } from "next/headers";
import queryString from "query-string";

export const getUrl = () => {
	const heads = headers();
	const url = heads.get("x-url") ?? "";
	return url;
};

export const getPathName = () => {
	return new URL(getUrl()).pathname;
};

export const getUrlParamsString = () => {
	const url = getUrl();
	const parsed = queryString.parseUrl(url);
	return queryString.stringify(parsed.query);
};

export const getUrlParams = () => {
	const url = getUrl();
	const parsed = queryString.parseUrl(url);
	const queryParams = parsed.query;
	return queryParams;
};
