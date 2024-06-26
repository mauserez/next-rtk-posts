"use client";

import { Group, Paper, Stack } from "@mantine/core";
import { Table, TableProps, Tbody, Thead, Tr, Th, Td } from "shared/ui/table";
import { Input, Select } from "shared/ui/controls";
import { ButtonActionIcon } from "shared/ui/controls/buttons";
import { BiSortAlt2, BiSortDown, BiSortUp } from "react-icons/bi";

import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
	interface ColumnMeta<TData extends RowData, TValue> {
		filter: "select" | "multiple" | "input" | "checkbox";
	}
}

import {
	FiChevronsLeft,
	FiChevronsRight,
	FiChevronLeft,
	FiChevronRight,
} from "react-icons/fi";

import { useState } from "react";
import {
	getCoreRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	flexRender,
	useReactTable,
	ColumnDef,
	SortingState,
	PaginationState,
} from "@tanstack/react-table";

import { cn } from "@/shared/utils/cn";
import s from "./DefaultTable.module.css";

type DefaultTableProps<T> = {
	data: T[];
	columns: ColumnDef<T>[];
	isLoading?: boolean;
	pageSize?: number;
} & TableProps;

export const DefaultTable = <T,>(props: DefaultTableProps<T>) => {
	const { data, columns, isLoading = false, pageSize = 10, className } = props;

	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: pageSize,
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		state: {
			sorting,
			pagination,
		},
	});

	if (isLoading) {
		return "loading";
	}

	return (
		<Stack gap={0} className={cn("max-h-[600px]", className)}>
			<Paper className={cn(s.tableWrap, "overflow-auto")}>
				<Table
					horizontalSpacing={"md"}
					verticalSpacing={"10px"}
					stickyHeader
					striped
					className={cn(s.table)}
				>
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder ? null : (
												<div
													className={
														header.column.getCanSort()
															? "cursor-pointer select-none"
															: ""
													}
													onClick={header.column.getToggleSortingHandler()}
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
													<Group justify="space-between">
														{flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}

														{{
															asc: <BiSortUp size={"20px"} />,
															desc: <BiSortDown size={"20px"} />,
														}[header.column.getIsSorted() as string] ?? (
															<BiSortAlt2 size={"20px"} />
														)}
													</Group>
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
