import { CountryType, CountryListType } from "@/entities/country/types";
import { backendApi } from "@/shared/axios/api";

export const COUNTRIES_QUERY_KEY = "countries";
export const COUNTRY_LIST_QUERY_KEY = "country-list";

export const getCountryList = async (): Promise<CountryListType> => {
	return await backendApi.get("/countryList").then((response) => {
		return response.data;
	});
};

export const getAllCountries = async (): Promise<CountryType[]> => {
	return await backendApi.get("/countries").then((response) => {
		return response.data;
	});
};

type GetPhotosOtions = {
	limit?: number;
	page?: number;
};

export const getPaginatedCountries = async (
	options: GetPhotosOtions
): Promise<CountryType[]> => {
	const { limit = 10, page = 1 } = options;

	return await backendApi
		.get(`/countries?_page=${page}&_limit=${limit}`)
		.then((response) => response.data);
};
