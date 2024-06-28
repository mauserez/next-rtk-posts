import { ColumnDef } from "@tanstack/react-table";
import { CountryType } from "@/entities/country/types";

export const countryTableColumns: ColumnDef<CountryType>[] = [
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
