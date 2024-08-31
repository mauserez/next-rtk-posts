import { headers } from "next/headers";
import queryString from "query-string";

export function getUrlServer() {
	return headers().get("x-url") ?? "";
}

export function getPathNameServer() {
	return new URL(getUrlServer()).pathname;
}

export function getUrlParamsServer() {
	const url = getUrlServer();
	const parsed = queryString.parseUrl(url);
	return parsed.query;
}

export function getUrlParamsStringServer() {
	return queryString.stringify(getUrlParamsServer());
}
