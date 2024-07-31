"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DataTable, QueryTable } from "shared/ui/tables";

import {
	getCountryList,
	COUNTRIES_PAGINATED_QUERY_KEY,
	COUNTRY_LIST_QUERY_KEY,
	COUNTRY_LANG_LIST_QUERY_KEY,
	getPaginatedCountries,
	GetPaginatedCountriesOptions,
	getLangList,
	COUNTRIES_ALL_QUERY_KEY,
	getAllCountries,
} from "api/country";

import { getUrlParams } from "shared/utils/urlClient";
import { CountryType } from "entities/country/types";
import { countryTableColumns } from "../lib";
import { useState } from "react";

export const CountryTable = () => {
	/* const params = getUrlParams();
	const page = params["page"] ?? "1";
	const limit = params["limit"] ?? "10"; */

	const { data: langList } = useQuery({
		queryKey: [COUNTRY_LANG_LIST_QUERY_KEY],
		queryFn: async () => {
			return await getLangList();
		},
		placeholderData: keepPreviousData,
	});

	const { data: countryList } = useQuery({
		queryKey: [COUNTRY_LIST_QUERY_KEY],
		queryFn: async () => {
			return await getCountryList();
		},
		placeholderData: keepPreviousData,
	});

	const [params, setParams] = useState<GetPaginatedCountriesOptions>({
		page: "1",
		limit: "10",
	});

	console.log(params);

	const {
		data: countries,
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: [COUNTRIES_PAGINATED_QUERY_KEY, params],
		queryFn: async () => {
			return await getPaginatedCountries(params);
		},
		placeholderData: keepPreviousData,
	});

	const { data: allCountries } = useQuery({
		queryKey: [COUNTRIES_ALL_QUERY_KEY],
		queryFn: async () => {
			return await getAllCountries();
		},
		placeholderData: keepPreviousData,
	});

	//console.log(countries);
	//console.log(countryList);

	return (
		<>
			<QueryTable<CountryType>
				filterableColumns={{
					lang: {
						filter: "input",
						placeholder: "Choose lang",
					},
					country: {
						filter: "select",
						placeholder: "Choose country",
						list: countryList ?? [],
					},
				}}
				sortableColumns={{ country: "default" }}
				setParams={setParams}
				className="h-[600px]"
				isLoading={isLoading || isFetching}
				data={countries}
				columns={countryTableColumns}
			/>

			{
				<DataTable
					filterableColumns={{
						country: {
							filter: "multiselect",
							placeholder: "Choose country",
						},
					}}
					columns={countryTableColumns}
					data={allCountries ?? []}
				/>
			}
		</>
	);
};
