"use client";

export type PaginatedData<T> = {
	first: number;
	prev: null | number;
	next: null | number;
	last: number;
	pages: number;
	items: number;
	data: T[];
};

import { memo, useState, Dispatch, SetStateAction } from "react";
import { Group, Paper, Stack, LoadingOverlay } from "@mantine/core";
import { Table, TableProps, Tbody, Thead, Tr, Th, Td } from "shared/ui/table";
import { MemoTextInput } from "shared/ui/inputs";
import { MemoSelect, MemoMultiSelect } from "shared/ui/selects";
import { ButtonActionIcon } from "shared/ui/buttons";
import { BiSortAlt2, BiSortDown, BiSortUp } from "react-icons/bi";
import { ImSpinner6 } from "react-icons/im";

import {
	FiChevronsLeft,
	FiChevronsRight,
	FiChevronLeft,
	FiChevronRight,
} from "react-icons/fi";

import {
	Column,
	getCoreRowModel,
	flexRender,
	useReactTable,
	ColumnDef,
} from "@tanstack/react-table";

import { cn } from "@/shared/utils/cn";
import tableStyle from "shared/ui/tables/data-table/DataTable.module.css";

type TableFilterType = "select" | "multiselect" | "input" | "checkbox";
type TableFilterColumnOptionsType = {
	filter?: TableFilterType;
	filterClassName?: string;
	placeholder?: string;
	list?: { value: string; label: string }[] | string[];
};
type TableFilterColumnType<T, P> = Partial<
	Record<keyof T | keyof P | string, TableFilterColumnOptionsType>
>;

type TableSortType = "asc" | "desc" | "default";
type TableSortColumnType<T> = Partial<Record<keyof T, TableSortType>>;

type QueryTableProps<T, P> = {
	data: PaginatedData<T> | undefined;
	columns: ColumnDef<T>[];
	isLoading?: boolean;
	pageSize?: number;
	setParams: Dispatch<SetStateAction<P>>;
	filterableColumns?: TableFilterColumnType<T, P>;
	sortableColumns?: TableSortColumnType<T>;
	withGlobalFilter?: boolean;
} & Omit<TableProps, "data">;

export const QueryTable = <T extends object = {}, P extends object = {}>(
	props: QueryTableProps<T, P>
) => {
	const {
		data,
		columns,
		isLoading = false,
		pageSize = 10,
		className,
		filterableColumns: colFilter,
		sortableColumns: colSort,
		setParams,
	} = props;

	const tableData = data?.data ? data?.data : [];

	const sortIcons: Record<TableSortType, JSX.Element> = {
		"asc": <BiSortUp size={"20px"} />,
		"desc": <BiSortDown size={"20px"} />,
		"default": <BiSortAlt2 size={"20px"} />,
	};

	const sortNext: Record<TableSortType, TableSortType> = {
		"default": "asc",
		"asc": "desc",
		"desc": "default",
	};

	const [sortState, setSortState] = useState<TableSortColumnType<T>>(
		colSort ?? {}
	);

	const handleSort = (columnKey: keyof T) => {
		const currentValue = sortState[columnKey] ?? "default";
		const nextValue = sortNext[currentValue];

		const newSort = { ...sortState, [columnKey]: nextValue };
		const newSortArray: string[] = [];
		let primarySortKey = "";

		for (const [key, value] of Object.entries(newSort)) {
			if (!["asc", "desc"].includes(value)) {
				continue;
			}

			const sortKey = value === "asc" ? key : `-${key}`;

			key === columnKey
				? (primarySortKey = sortKey)
				: newSortArray.push(sortKey);
		}

		if (primarySortKey) {
			newSortArray.unshift(primarySortKey);
		}

		setSortState(newSort);
		if (newSortArray.length > 0) {
			setParams((prev) => {
				return {
					...prev,
					"sort": newSortArray.join(","),
				};
			});
		}
	};

	const [pgSize, setPgSize] = useState<string | number>(pageSize);

	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const headerGroups = table.getHeaderGroups();

	console.log(isLoading);

	return (
		<Stack
			gap={0}
			className={cn("relative", className)}
			justify="space-between"
		>
			<LoadingOverlay
				loaderProps={{
					children: (
						<ImSpinner6
							color="var(--color-purple)"
							className="rotate-animation"
							size={48}
						/>
					),
				}}
				visible={isLoading}
				zIndex={3}
				overlayProps={{ radius: "sm", blur: 0 }}
			/>
			{/* {filters ? (
				<MemoFilters<T> filters={filters} headerGroups={headerGroups} />
			) : null} */}

			<Paper className={cn(tableStyle.tableWrap, "overflow-auto flex-1")}>
				{/* 	{isLoading ? <CgSpinnerTwoAlt className={tableStyle.loader} /> : null} */}
				<Table
					horizontalSpacing={"md"}
					verticalSpacing={"10px"}
					stickyHeader
					striped
					className={cn(tableStyle.table)}
				>
					<Thead>
						{headerGroups.map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const id = header.column.id as keyof T;
									const sortValue = (sortState[id] ??
										"default") as TableSortType;
									const isColumnSortable = colSort?.hasOwnProperty(id);
									const sortIcon = sortState.hasOwnProperty(id)
										? sortIcons[sortValue]
										: null;

									return (
										<Th
											className="align-baseline"
											key={header.id}
											colSpan={header.colSpan}
											style={{
												maxWidth: header.column.getSize(),
											}}
										>
											{header.isPlaceholder ? null : (
												<div
													style={{
														minWidth: header.column.getSize(),
													}}
													className={cn(
														"w-full",
														header.column.getCanSort() ? "select-none" : ""
													)}
												>
													<Stack gap={"4px"} justify="flex-start">
														<Group justify="space-between" wrap="nowrap">
															<div
																className="cursor-pointer"
																onClick={() => {
																	handleSort(id);
																}}
															>
																{flexRender(
																	header.column.columnDef.header,
																	header.getContext()
																)}
															</div>
															<div
																className="cursor-pointer"
																onClick={() => {
																	handleSort(id);
																}}
															>
																{sortIcon}
															</div>
														</Group>

														<MemoFilter<T, P>
															setParams={setParams}
															column={header.column}
															filterOptions={colFilter?.[id]}
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
									<Td style={{ width: cell.column.getSize() }} key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								))}
							</Tr>
						))}
					</Tbody>
				</Table>
			</Paper>
			<Paper className={cn(tableStyle.tableWrap)}>
				<Group className="p-8 pb-6" align="flex-end" justify="flex-end">
					<Group gap="xs" align="flex-end">
						<MemoSelect
							radius="sm"
							size="sm"
							className="w-[120px]"
							label="На странице"
							data={["5", "10", "20", "30", "40"]}
							value={pgSize.toString()}
							onChange={(value) => {
								if (value) {
									setParams((prev) => {
										return { ...prev, limit: value };
									});
									setPgSize(value);
								}

								return value;
							}}
						/>
					</Group>

					<Stack gap="0">
						<Group gap="4px" className="font-medium text-[14px] mb-[1px]">
							<div>Страница</div>
							{(data?.prev ?? 0) + 1} из {data?.pages ?? 1}
						</Group>

						<Group gap="xs">
							<ButtonActionIcon
								radius="sm"
								size="sm"
								onClick={() =>
									setParams((prev) => {
										return { ...prev, page: 1 };
									})
								}
								disabled={!data?.prev}
							>
								<FiChevronsLeft />
							</ButtonActionIcon>

							<ButtonActionIcon
								radius="sm"
								size="sm"
								onClick={() =>
									setParams((prev) => {
										return { ...prev, page: data?.prev };
									})
								}
								disabled={!data?.prev}
							>
								<FiChevronLeft />
							</ButtonActionIcon>

							<ButtonActionIcon
								radius="sm"
								size="sm"
								onClick={() =>
									setParams((prev) => {
										return { ...prev, page: data?.next };
									})
								}
								disabled={!data?.next}
							>
								<FiChevronRight />
							</ButtonActionIcon>
							<ButtonActionIcon
								radius="sm"
								size="sm"
								onClick={() =>
									setParams((prev) => {
										return { ...prev, page: data?.last };
									})
								}
								disabled={!data?.next}
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

type FilterProps<T, P> = {
	setParams: Dispatch<SetStateAction<P>>;
	column: Column<any, unknown>;
	filterOptions?: TableFilterColumnOptionsType;
	withLabel?: boolean;
};

function Filter<T, P>(props: FilterProps<T, P>) {
	const { column, filterOptions, withLabel = false, setParams } = props;

	const columnFilterValue = column.getFilterValue();

	let label = !column.columnDef.header
		? ""
		: column.columnDef.header.toString();
	label = withLabel ? label : "";

	if (!filterOptions) {
		return null;
	}

	const { filter, filterClassName, placeholder, list = [] } = filterOptions;

	if (filter === "input") {
		const colVal = !columnFilterValue ? "" : columnFilterValue.toString();

		return (
			<MemoTextInput
				clearable={false}
				size="sm"
				radius="sm"
				defaultValue={colVal}
				className={cn("w-full p-0", filterClassName)}
				classNames={{ input: cn("p-0") }}
				label={label}
				onChange={(e) => {
					setParams((prev) => {
						return { ...prev, [column.id]: e.target.value };
					});
				}}
				placeholder={placeholder ?? "Search"}
				variant="unstyled"
			/>
		);
	}

	if (filter === "select") {
		return (
			<MemoSelect
				size="sm"
				radius="sm"
				searchable
				clearable
				className={cn("w-full", filterClassName)}
				classNames={{ input: "flex items-center p-0" }}
				onChange={(value) => {
					setParams((prev) => {
						return { ...prev, [column.id]: value };
					});
				}}
				label={label}
				data={list}
				placeholder={placeholder ?? "Choose"}
				variant="unstyled"
			/>
		);
	}

	if (filter === "multiselect") {
		return (
			<MemoMultiSelect
				onChange={(value) => {
					setParams((prev) => {
						return { ...prev, [column.id]: value };
					});
				}}
				label={label}
				size="sm"
				radius="sm"
				comboboxProps={{ offset: 10 }}
				className={cn("w-full", filterClassName)}
				classNames={{
					pillsList: "max-w-[93%]",
					input: "flex items-center p-0",
				}}
				clearable
				data={list}
				placeholder={placeholder ?? "Choose"}
				variant="unstyled"
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
