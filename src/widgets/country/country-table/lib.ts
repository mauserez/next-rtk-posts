import { ColumnDef } from "@tanstack/react-table";
import { CountryType } from "@/entities/country/types";

export const countryTableColumns: ColumnDef<CountryType>[] = [
	{
		accessorKey: "id",
		header: "Id",
		size: 60,
	},
	{
		accessorKey: "country",
		header: "Country",
		filterFn: "arrIncludesSome",
		size: 200,
	},
	{
		accessorKey: "lang",
		header: "Language",
		size: 300,
	},
];
