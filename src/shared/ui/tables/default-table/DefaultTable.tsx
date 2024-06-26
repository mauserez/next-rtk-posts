"use client";

import { Group, Paper, Stack } from "@mantine/core";
import { Table, TableProps, Tbody, Thead, Tr, Th, Td } from "shared/ui/table";
import { Input, MemoInput, Select, MultiSelect } from "shared/ui/controls";
import { ButtonActionIcon } from "shared/ui/controls/buttons";
import { BiSortAlt2, BiSortDown, BiSortUp } from "react-icons/bi";

import {
	FiChevronsLeft,
	FiChevronsRight,
	FiChevronLeft,
	FiChevronRight,
} from "react-icons/fi";

import { useState, memo } from "react";
import {
	Column,
	getCoreRowModel,
	getFacetedRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	flexRender,
	useReactTable,
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	PaginationState,
} from "@tanstack/react-table";

import { uid } from "@/shared/utils/number";
import { cn } from "@/shared/utils/cn";
import s from "./DefaultTable.module.css";

type TableFilterType = "select" | "multiselect" | "input" | "checkbox";
type TableFilterOptionsType = {
	filter: TableFilterType;
	filterClassName?: string;
	placeholder?: string;
	list?: { value: string; label: string }[] | string[];
};

type DefaultTableProps<T> = {
	data: T[];
	columns: ColumnDef<T>[];
	isLoading?: boolean;
	pageSize?: number;
	filters?: Partial<Record<keyof T, TableFilterOptionsType>>;
	withGlobalFilter: boolean;
} & TableProps;

export const DefaultTable = <T,>(props: DefaultTableProps<T>) => {
	const {
		data,
		columns,
		isLoading = false,
		pageSize = 10,
		className,
		filters,
		withGlobalFilter = true,
	} = props;

	const [globalSearch, setGlobalSearch] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: pageSize,
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onGlobalFilterChange: setGlobalSearch,
		globalFilterFn: "includesString",
		state: {
			globalFilter: globalSearch,
			columnFilters,
			sorting,
			pagination,
		},
	});

	const headerGroups = table.getHeaderGroups();

	if (isLoading) {
		return "loading";
	}

	return (
		<Stack gap={0} className={cn("max-h-[600px]", className)}>
			{/* {filters ? (
				<MemoFilters<T> filters={filters} headerGroups={headerGroups} />
			) : null} */}

			<Paper className={cn(s.tableWrap, "overflow-auto")}>
				<Group>
					{withGlobalFilter ? (
						<MemoInput
							size="sm"
							data-no-border
							data-no-shadow
							onChange={(e) => setGlobalSearch(e.target.value)}
							value={globalSearch}
							className="max-w-[200px] m-4"
							placeholder="Search"
							withPlaceholderIcon
						/>
					) : null}
				</Group>

				<Table
					horizontalSpacing={"md"}
					verticalSpacing={"10px"}
					stickyHeader
					striped
					className={cn(s.table)}
				>
					<Thead>
						{headerGroups.map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const id = header.column.id as keyof T;

									return (
										<Th
											style={{ verticalAlign: "baseline" }}
											key={header.id}
											colSpan={header.colSpan}
										>
											{header.isPlaceholder ? null : (
												<div
													className={
														header.column.getCanSort() ? "select-none" : ""
													}
													title={
														header.column.getCanSort()
															? header.column.getNextSortingOrder() === "asc"
																? "От меньшего к большему"
																: header.column.getNextSortingOrder() === "desc"
																? "От большего к меньшему"
																: "Сброс сортировки"
															: undefined
													}
												>
													<Stack gap={"4px"} justify="flex-start">
														<Group justify="space-between">
															<div
																className="cursor-pointer"
																onClick={header.column.getToggleSortingHandler()}
															>
																{flexRender(
																	header.column.columnDef.header,
																	header.getContext()
																)}
															</div>
															<div
																className="cursor-pointer"
																onClick={header.column.getToggleSortingHandler()}
															>
																{{
																	asc: <BiSortUp size={"20px"} />,
																	desc: <BiSortDown size={"20px"} />,
																}[header.column.getIsSorted() as string] ?? (
																	<BiSortAlt2 size={"20px"} />
																)}
															</div>
														</Group>
														<MemoFilter
															column={header.column}
															filterOptions={filters?.[id]}
														/>
													</Stack>
												</div>
											)}
										</Th>
									);
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.map((row) => (
							<Tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<Td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								))}
							</Tr>
						))}
					</Tbody>
					{/* <MTable.Tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<MTable.Tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<MTable.Th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.footer,
												header.getContext()
										  )}
								</MTable.Th>
							))}
						</MTable.Tr>
					))}
				</MTable.Tfoot> */}
				</Table>
			</Paper>
			<Paper className={cn(s.tableControlsWrap)}>
				<Group className="p-8 pb-6" align="flex-end" justify="flex-end">
					<Group gap="xs" align="flex-end">
						{/* <Input
							radius="sm"
							size="sm"
							className="w-[120px]"
							label="К странице"
							defaultValue={table.getState().pagination.pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								table.setPageIndex(page);
							}}
							type="number"
						/> */}

						<Select
							radius="sm"
							size="sm"
							className="w-[120px]"
							label="На странице"
							data={["5", "10", "20", "30", "40"]}
							value={table.getState().pagination.pageSize.toString()}
							onChange={(value) => {
								if (value) {
									table.setPageSize(Number(value));
								}
							}}
						/>
					</Group>

					<Stack gap="0">
						<Group gap="4px" className="font-medium text-[14px] mb-[1px]">
							<div>Страница</div>
							{table.getState().pagination.pageIndex + 1} из{" "}
							{table.getPageCount()}
						</Group>

						<Group gap="xs">
							<ButtonActionIcon
								radius="sm"
								size="sm"
								onClick={() => table.setPageIndex(0)}
								disabled={!table.getCanPreviousPage()}
							>
								<FiChevronsLeft />
							</ButtonActionIcon>
							<ButtonActionIcon
								radius="sm"
								size="sm"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								<FiChevronLeft />
							</ButtonActionIcon>

							<ButtonActionIcon
								radius="sm"
								size="sm"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								<FiChevronRight />
							</ButtonActionIcon>
							<ButtonActionIcon
								radius="sm"
								size="sm"
								onClick={() => table.setPageIndex(table.getPageCount() - 1)}
								disabled={!table.getCanNextPage()}
							>
								<FiChevronsRight />
							</ButtonActionIcon>
						</Group>
					</Stack>
				</Group>
			</Paper>
		</Stack>
	);
};

type FilterProps<T> = {
	column: Column<any, unknown>;
	filterOptions?: TableFilterOptionsType;
	withLabel?: boolean;
};

function Filter<T>(props: FilterProps<T>) {
	const { column, filterOptions, withLabel = false } = props;

	if (!filterOptions) {
		return null;
	}

	const { filter, filterClassName, placeholder, list = [] } = filterOptions;

	const columnFilterValue = column.getFilterValue();

	let label = !column.columnDef.header
		? ""
		: column.columnDef.header.toString();
	label = withLabel ? label : "";

	if (filter === "input") {
		const colVal = !columnFilterValue ? "" : columnFilterValue.toString();

		return (
			<Input
				data-no-border
				data-no-shadow
				size="sm"
				radius="sm"
				defaultValue={colVal}
				className={cn("w-auto p-0=max-w-[300px]", filterClassName)}
				classNames={{ input: cn("p-0") }}
				label={label}
				onChange={(e) => column.setFilterValue(e.target.value)}
				placeholder={placeholder ?? "Search"}
			/>
		);
	}

	if (filter === "select") {
		return (
			<Select
				data-no-border
				data-no-shadow
				size="sm"
				radius="sm"
				className={cn("w-auto max-w-[300px]", filterClassName)}
				classNames={{ input: cn("p-0") }}
				onChange={(value) => column.setFilterValue(value)}
				label={label}
				data={list}
				placeholder={placeholder}
			/>
		);
	}

	if (filter === "multiselect") {
		let ls = [];
		for (const l of list) {
			if (typeof l === "string") {
				ls.push(l);
			} else {
				ls.push(l.label);
			}
		}

		return (
			<MultiSelect
				data-no-border
				data-no-shadow
				size="sm"
				radius="sm"
				className={cn("w-auto max-w-[300px]", filterClassName)}
				classNames={{ input: "p-0" }}
				onChange={(value) => {
					console.log(value);
					column.setFilterValue(value);
				}}
				label={label}
				data={ls}
				placeholder={placeholder}
			/>
		);
	}
}

const MemoFilter = memo(Filter) as typeof Filter;

/*
type FiltersProps<T> = {
	headerGroups: HeaderGroup<T>[];
	filters: DefaultTableProps<T>["filters"];
};

function Filters<T>(props: FiltersProps<T>) {
	const { headerGroups, filters } = props;

	return (
		<Group className="mb-4">
			{headerGroups.map((headerGroup) =>
				headerGroup.headers.map((header) => {
					const id = header.column.id as keyof T;

					if (!filters) {
						return null;
					}

					const filterKeys = Object.keys(filters);

					if (!filterKeys) {
						return null;
					}

					if (!filterKeys.includes(id.toString())) {
						return null;
					}

					const filterOptions = filters[id] as TableFilterOptionsType;

					return header.column.getCanFilter() ? (
						<MemoFilter<T>
							filterOptions={filterOptions}
							key={uid()}
							column={header.column}
						/>
					) : null;
				})
			)}
		</Group>
	);
}

const MemoFilters = memo(Filters) as typeof Filters; */
