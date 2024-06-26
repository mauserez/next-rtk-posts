"use client";

import { DefaultTable } from "@/shared/ui/tables/default-table/DefaultTable";
import type { ColumnDef } from "@tanstack/react-table";
import { CountryType } from "@/entities/country/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllCountries, COUNTRIES_QUERY_KEY } from "@/api/country";

const columns: ColumnDef<CountryType>[] = [
	{ accessorKey: "id", header: "Id", meta: { filter: "select" } },
	{ accessorKey: "country", header: "Country" },
	{ accessorKey: "lang", header: "Language" },
];

export const CountryTable = () => {
	const { data: countries, isLoading } = useQuery({
		queryKey: [COUNTRIES_QUERY_KEY],
		queryFn: async () => await getAllCountries(),
		placeholderData: keepPreviousData,
	});

	return (
		<DefaultTable
			className="max-h-[500px]"
			isLoading={isLoading}
			data={countries ?? []}
			columns={columns}
		/>
	);
};
