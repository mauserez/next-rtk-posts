"use client";

import { DefaultTable } from "@/shared/ui/tables/default-table/DefaultTable";
import type { ColumnDef } from "@tanstack/react-table";
import { CountryType } from "@/entities/country/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	getAllCountries,
	getCountryList,
	COUNTRIES_QUERY_KEY,
	COUNTRY_LIST_QUERY_KEY,
} from "@/api/country";

const columns: ColumnDef<CountryType>[] = [
	{
		accessorKey: "id",
		header: "Id",
	},
	{
		accessorKey: "country",
		header: "Country",
		filterFn: "arrIncludesSome",
	},
	{
		accessorKey: "lang",
		header: "Language",
	},
];

export const CountryTable = () => {
	const { data: countries, isLoading } = useQuery({
		queryKey: [COUNTRIES_QUERY_KEY],
		queryFn: async () => await getAllCountries(),
		placeholderData: keepPreviousData,
	});

	const { data: countryList, isLoading: isListLoading } = useQuery({
		queryKey: [COUNTRY_LIST_QUERY_KEY],
		queryFn: async () => await getCountryList(),
		placeholderData: keepPreviousData,
	});

	console.log(countryList);

	return (
		<DefaultTable<CountryType>
			filters={{
				lang: {
					filter: "input",
				},
				country: {
					filter: "multiselect",
					placeholder: "All countries",
					list: countryList,
				},
			}}
			className="max-h-[600px]"
			isLoading={isLoading}
			data={countries ?? []}
			columns={columns}
		/>
	);
};
