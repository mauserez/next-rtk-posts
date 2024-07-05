import { headers } from "next/headers";
import queryString from "query-string";

export const getUrlServer = () => {
	return headers().get("x-url") ?? "";
};

export const getPathNameServer = () => {
	return new URL(getUrlServer()).pathname;
};

export const getUrlParamsServer = () => {
	const url = getUrlServer();
	const parsed = queryString.parseUrl(url);
	return parsed.query;
};

export const getUrlParamsStringServer = () => {
	return queryString.stringify(getUrlParamsServer());
};
