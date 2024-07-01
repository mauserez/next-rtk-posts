"use client";

import { Group } from "@mantine/core";
import { Checkbox } from "@/shared/ui/controls/checkboxes";
import { Input } from "@/shared/ui/controls/inputs";
import { DataTable } from "shared/ui/tables";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
	getAllCountries,
	getCountryList,
	COUNTRIES_QUERY_KEY,
	COUNTRY_LIST_QUERY_KEY,
} from "api/country";
import { CountryType } from "entities/country/types";
import { countryTableColumns } from "../lib";

export const CountryTable = () => {
	const { data: countries, isLoading } = useQuery({
		queryKey: [COUNTRIES_QUERY_KEY],
		queryFn: async () => await getAllCountries(),
		placeholderData: keepPreviousData,
	});

	const { data: countryList } = useQuery({
		queryKey: [COUNTRY_LIST_QUERY_KEY],
		queryFn: async () => await getCountryList(),
		placeholderData: keepPreviousData,
	});

	return (
		<>
			<Group>
				<Checkbox verticalLabel className="flex-1" label="Yes/No" />
				<Input className="flex-1 max-w-[200px]" label="Hello" />
			</Group>

			<DataTable<CountryType>
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
		</>
	);
};
