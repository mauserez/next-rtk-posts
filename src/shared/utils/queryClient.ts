import { useSearchParams } from "next/navigation";
import queryString from "query-string";

export const useUrlParamsString = () => {
	return useSearchParams().toString();
};

export const useUrlParams = () => {
	const paramsString = useSearchParams().toString();
	return queryString.parse(paramsString);
};
