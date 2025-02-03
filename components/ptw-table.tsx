"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { PTWRecord, PermitStatus } from "@/types/ptw"

const columns: ColumnDef<PTWRecord>[] = [
  {
    accessorKey: "permitId",
    header: "Permit ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("permitId")}</div>,
  },
  {
    accessorKey: "dateIssued",
    header: "Date Issued",
  },
  {
    accessorKey: "typeOfPermit",
    header: "Type of Permit",
    cell: ({ row }) => {
      const type = row.getValue("typeOfPermit") as string
      return (
        <Badge
          variant="outline"
          className={
            type === "Hot Work Permit"
              ? "border-red-500 text-red-500"
              : type === "Confined Work Permit"
                ? "border-yellow-500 text-yellow-500"
                : "border-blue-500 text-blue-500"
          }
        >
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: "workLocation",
    header: "Work Location",
  },
  {
    accessorKey: "aa",
    header: "A.A.",
  },
  {
    accessorKey: "ac",
    header: "A.C.",
  },
  {
    accessorKey: "pa",
    header: "P.A.",
  },
  {
    accessorKey: "ph",
    header: "P.H.",
  },
  {
    accessorKey: "permitDescription",
    header: "Permit Description",
  },
  {
    accessorKey: "permitValidityDate",
    header: "Validity",
  },
  {
    accessorKey: "permitStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("permitStatus") as PermitStatus
      return (
        <Badge
          variant="outline"
          className={
            status === "Closed"
              ? "border-orange-500 bg-orange-500 text-white"
              : "border-green-500 bg-green-500 text-white"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "permitClosureDate",
    header: "Closure Date",
  },
]

export function PTWTable({ data }: { data: PTWRecord[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter by Permit ID..."
          value={(table.getColumn("permitId")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("permitId")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

