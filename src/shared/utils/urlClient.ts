import queryString from "query-string";

export const getUrl = () => {
	return window.location.href;
};

export const getPathName = () => {
	return window.location.pathname;
};

export const getUrlParams = () => {
	return queryString.parseUrl(getUrl()).query;
};

export const getUrlParamsString = () => {
	return queryString.stringify(getUrlParams());
};
