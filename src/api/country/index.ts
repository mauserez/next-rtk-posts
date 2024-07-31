import { PaginatedData } from "shared/ui/tables/query-table/QueryTable";
import {
	CountryType,
	CountryListItemType,
	LangListItemType,
} from "entities/country/types";
import { backendApi } from "shared/axios/api";

export const COUNTRY_LANG_LIST_QUERY_KEY = "country-lang-list";
export const getLangList = async (): Promise<
	LangListItemType["label"][] | void
> => {
	return await backendApi
		.get<LangListItemType[]>("/langList")
		.then((response) => {
			return response.data.map((item) => item.label);
		})
		.catch((e) => console.log(e));
};

export const COUNTRY_LIST_QUERY_KEY = "country-list";
export const getCountryList = async (): Promise<
	void | CountryListItemType["label"][]
> => {
	return await backendApi
		.get<CountryListItemType[]>("/countryList")
		.then((response) => {
			return response.data.map((item) => item.label);
		})
		.catch((e) => {
			console.log(e);
		});
};

export const COUNTRIES_ALL_QUERY_KEY = "countries";
export const getAllCountries = async (): Promise<CountryType[]> => {
	return await backendApi.get("/countries").then((response) => {
		return response.data;
	});
};

export const COUNTRIES_PAGINATED_QUERY_KEY = "countries-paginated";
export type GetPaginatedCountriesOptions = {
	page?: string;
	limit?: string;
	country?: string;
	lang?: string;
	sort?: string;
};

export const getPaginatedCountries = async (
	options: GetPaginatedCountriesOptions
): Promise<PaginatedData<CountryType>> => {
	const {
		page = "1",
		limit = "10",
		country = "",
		lang = "",
		sort = "",
	} = options;

	const params = {
		_page: page,
		_per_page: limit,
		_sort: sort,
		country: country,
		lang: lang,
	};

	return await backendApi
		.get(`/countries`, { params: params })
		.then((response) => {
			return response.data;
		});
};
