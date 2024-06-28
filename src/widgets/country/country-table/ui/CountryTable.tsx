"use client";

import { DefaultTable } from "shared/ui/tables/default-table/DefaultTable";
import { CountryType } from "entities/country/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	getAllCountries,
	getCountryList,
	COUNTRIES_QUERY_KEY,
	COUNTRY_LIST_QUERY_KEY,
} from "api/country";
import { countryTableColumns } from "../lib";

export const CountryTable = () => {
	const { data: countries, isLoading } = useQuery({
		queryKey: [COUNTRIES_QUERY_KEY],
		queryFn: async () => await getAllCountries(),
		placeholderData: keepPreviousData,
	});

	console.log(countries);

	const { data: countryList } = useQuery({
		queryKey: [COUNTRY_LIST_QUERY_KEY],
		queryFn: async () => await getCountryList(),
		placeholderData: keepPreviousData,
	});

	return (
		<DefaultTable<CountryType>
			colFilters={{
				lang: {
					filter: "select",
				},
				country: {
					filter: "multiselect",
					placeholder: "Choose country",
					list: countryList,
				},
			}}
			className="max-h-[600px]"
			isLoading={isLoading}
			data={countries ?? []}
			columns={countryTableColumns}
		/>
	);
};
