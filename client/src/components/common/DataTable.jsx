import PropTypes from 'prop-types';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '../ui/select';

const DataTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className='rounded-md border p-2'>
      <div className='py-4'>
        <Input
          className='text-xs sm:text-sm md:text-base'
          placeholder='search here...'
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <div className='border-b max-h-[60vh] overflow-y-auto'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='cursor-pointer text-xs sm:text-sm'
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='text-xs sm:text-sm'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-16 text-base font-bold text-center'
                >
                  No results found...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data.length <= 10 ? null : (
        <div className='flex items-center justify-end gap-2 py-3'>
          <div className='flex'>
            <Select onValueChange={(value) => table.setPageSize(Number(value))}>
              <SelectTrigger className='text-primary-text h-8 text-[10px] sm:text-xs md:text-sm'>
                <SelectValue placeholder='Select rows' />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 15, 20, 30].map((option, idx) => (
                  <SelectItem
                    key={idx}
                    value={option}
                    className='text-primary-text text-[10px] sm:text-xs md:text-sm'
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-center'>
            <Button
              variant='link'
              size='icon'
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              className='size-6 sm:size-8'
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant='link'
              size='icon'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className='size-6 sm:size-8'
            >
              <ChevronLeft />
            </Button>
            <div className='text-xs md:text-sm min-w-fit'>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </div>
            <Button
              variant='link'
              size='icon'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className='size-6 sm:size-8'
            >
              <ChevronRight />
            </Button>
            <Button
              variant='link'
              size='icon'
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              className='size-6 sm:size-8'
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
};

export default DataTable;
