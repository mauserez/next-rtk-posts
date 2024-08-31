import { PaginatedData } from "shared/ui/tables/query-table/QueryTable";
import {
	CountryType,
	CountryListItemType,
	LangListItemType,
} from "entities/country/types";
import { backendApi } from "shared/axios/api";

export async function getCountryLangList(): Promise<
	LangListItemType["label"][] | void
> {
	const { data } = await backendApi.get<LangListItemType[]>("/langList");
	return data.map((item) => item.label) ?? [];
}

export async function getCountryList(): Promise<
	void | CountryListItemType["label"][]
> {
	const { data } = await backendApi.get<CountryListItemType[]>("/countryList");
	return data.map((item) => item.label) ?? [];
}

export async function getAllCountries(): Promise<CountryType[]> {
	const { data } = await backendApi.get("/countries");
	return data ?? [];
}

export type GetPaginatedCountriesOptions = {
	page?: string;
	limit?: string;
	country?: string;
	lang?: string;
	sort?: string;
};

export async function getPaginatedCountries(
	options: GetPaginatedCountriesOptions
): Promise<PaginatedData<CountryType>> {
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

	const { data } = await backendApi.get(`/countries`, { params: params });
	return data;
}
