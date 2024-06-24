import { CountryType } from "@/entities/country/types";
import { backendApi } from "@/shared/axios/api";

export const COUNTRIES_QUERY_KEY = "countries";

type GetPhotosOptions = {
	limit?: number;
	page?: number;
};

export const getAllCountries = async (): Promise<CountryType[]> => {
	return await backendApi.get("/countries").then((response) => {
		return response.data;
	});
};

export const getPaginatedCountries = async (
	options: GetPhotosOptions
): Promise<CountryType[]> => {
	const { limit = 10, page = 1 } = options;

	return await backendApi
		.get(`/countries?_page=${page}&_limit=${limit}`)
		.then((response) => response.data);
};
