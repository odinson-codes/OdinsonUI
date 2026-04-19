import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { X, ChevronLeft, ChevronRight, FunnelPlus } from "lucide-react";
import SearchInput from "./SearchInput.tsx";
import Button from "../Button.tsx";

interface ColumnFilters {
    [key: string]: string;
}

interface Column<T> {
    header: string;
    accessor?: keyof T;
    filterable?: boolean;
    render?: (row: T) => React.ReactNode;
}

interface TableComponentProps<T extends Record<string, unknown>> {
    columns: Column<T>[];
    data: T[];
    onClick?: () => void;
    showButton?: boolean;
    showSearchAndFilter?: boolean;
    content?: React.ReactNode;
}

const TableComponent = <T extends Record<string, unknown>>({
                                                               columns,
                                                               data,
                                                               onClick,
                                                               showButton = false,
                                                               content,
                                                               showSearchAndFilter = false,
                                                           }: TableComponentProps<T>) => {
    const [searchItem, setSearchItem] = useState<string>("");
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});

    // Handle Column Filter
    const handleColumnFilter = (columnAccessor: string, value: string): void => {
        setColumnFilters((prev) => ({
            ...prev,
            [columnAccessor]: value,
        }));
        setCurrentPage(1);
    };

    // Clear specific filter
    const clearFilter = (columnAccessor: string): void => {
        setColumnFilters((prev) => {
            const newFilters = { ...prev };
            delete newFilters[columnAccessor];
            return newFilters;
        });
    };

    // Clear all filters
    const clearAllFilters = (): void => {
        setColumnFilters({});
        setSearchItem("");
        setCurrentPage(1);
    };

    // Get unique values for a column (for dropdown options)
    const getUniqueValues = (accessor: keyof T): string[] => {
        const values = data
            .map((row) => row[accessor])
            .filter(Boolean)
            .map(String);
        return [...new Set(values)].sort();
    };

    // Filter Data
    let filteredData: T[] = data;

    // Apply search filter
    if (searchItem.trim() !== "") {
        const searchTerm = searchItem.trim().toLowerCase();

        filteredData = filteredData.filter((row) => {
            const values = Object.values(row);

            const hasMatch = values.some((value) => {
                if (value == null || value === "") {
                    return false;
                }

                const stringValue = String(value).toLowerCase();
                const isMatch = stringValue.includes(searchTerm);

                return isMatch;
            });

            return hasMatch;
        });
    }

    // Apply column filters
    Object.keys(columnFilters).forEach((columnAccessor) => {
        const filterValue = columnFilters[columnAccessor];
        if (filterValue) {
            filteredData = filteredData.filter(
                (row) => String(row[columnAccessor]) === String(filterValue)
            );
        }
    });

    // Pagination
    const indexOfLastRow: number = currentPage * rowsPerPage;
    const indexOfFirstRow: number = indexOfLastRow - rowsPerPage;
    const currentRows: T[] = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages: number = Math.ceil(filteredData.length / rowsPerPage);

    const activeFilterCount: number =
        Object.keys(columnFilters).length + (searchItem ? 1 : 0);

    const toggleVisibility = (): void => setShowFilter((prev) => !prev);

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            {/* Search and Action Button */}
            <div className="flex justify-between items-center mb-4">
                {showSearchAndFilter &&
                <SearchInput
                    value={searchItem}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setSearchItem(e.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Search..."
                />
                }
                <div className="flex space-x-5 items-center">
                    {showSearchAndFilter &&
                    <div
                        className="flex items-center h-8 p-4 border-2 border-sidebarHover rounded-md text-sidebarHover cursor-pointer"
                        onClick={toggleVisibility}>
                        <span>Filter</span>
                        <div className="w-5 h-5">
                            <FunnelPlus />
                        </div>
                    </div>
                    }

                    {showButton && (
                        <Button onClick={onClick}>{content}</Button>
                    )}
                </div>
            </div>

            <div className={`${showFilter ? "block" : "hidden"}`}>
                {activeFilterCount > 0 && (
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-600">Active filters:</span>
                        {searchItem && (
                            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Search: "{searchItem}"
                <X
                    className="ml-2 w-4 h-4 cursor-pointer hover:text-blue-900"
                    onClick={() => {
                        setSearchItem("");
                        setCurrentPage(1);
                    }}
                />
              </span>
                        )}
                        {Object.entries(columnFilters).map(([key, value]) => {
                            const column = columns.find((col) => col.accessor === key);
                            return (
                                <span
                                    key={key}
                                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {column?.header}: {value}
                                    <X
                                        className="ml-2 w-4 h-4 cursor-pointer hover:text-blue-900"
                                        onClick={() => clearFilter(key)}
                                    />
                </span>
                            );
                        })}
                        <button
                            onClick={clearAllFilters}
                            className="text-sm text-red-600 hover:text-red-800 underline">
                            Clear all
                        </button>
                    </div>
                )}

                <div className="mb-4 flex flex-wrap gap-3">
                    {columns
                        .filter((col) => col.filterable)
                        .map((col) => (
                            <div key={String(col.accessor)} className="flex flex-col">
                                <label className="text-xs text-gray-600 mb-1">
                                    {col.header}
                                </label>
                                <select
                                    value={columnFilters[String(col.accessor)] || ""}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                        handleColumnFilter(String(col.accessor), e.target.value)
                                    }
                                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]">
                                    <option value="">All {col.header}</option>
                                    {col.accessor &&
                                        getUniqueValues(col.accessor).map((value, index) => (
                                            <option key={index} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="text-gray-700 bg-gray-100">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={`py-3 px-4 text-left text-sm font-semibold select-none transition-all 
                    ${col.accessor ? "cursor-pointer hover:bg-gray-200" : ""}`}>
                                <div className="flex items-center">
                                    <p>{col.header}</p>
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    {currentRows.length > 0 ? (
                        currentRows.map((row, index) => (
                            <tr
                                key={index}
                                className={`hover:bg-blue-50 ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}>
                                {columns.map((col, i) => (
                                    <td
                                        key={i}
                                        className="py-3 px-4 text-sm text-gray-700 border-t border-gray-300">
                                        {col.render
                                            ? col.render(row)
                                            : col.accessor
                                                ? String(row[col.accessor])
                                                : ""}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-center py-4 text-gray-500">
                                No data found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-wrap justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">
                        Rows per page:
                    </label>
                    <select
                        value={rowsPerPage}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setRowsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                    <span className="text-sm text-gray-600">
            Showing {indexOfFirstRow + 1}-
                        {Math.min(indexOfLastRow, filteredData.length)} of{" "}
                        {filteredData.length}
          </span>
                </div>

                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeft />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 text-sm rounded-md ${
                                currentPage === index + 1
                                    ? "bg-sidebarHover text-sidebarText"
                                    : "bg-bodyBackgroundColor text-bodyTextColor border border-borderColor"
                            }`}>
                            {index + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableComponent;
