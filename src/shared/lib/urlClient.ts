import queryString from "query-string";

export function getUrl() {
	return window.location.href;
}

export function getPathName() {
	return window.location.pathname;
}

export function getUrlParams() {
	return queryString.parseUrl(getUrl()).query;
}

export function getUrlParamsString() {
	return queryString.stringify(getUrlParams());
}
