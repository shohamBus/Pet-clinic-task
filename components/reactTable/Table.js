import React from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { useClinic } from "../../context/UsersContext";

export default function Table({ columns, data }) {
  const { DefaultColumnFilter } = useClinic();
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
      },
      useFilters, // useFilters!
      useGlobalFilter // useGlobalFilter!
    );

  const firstPageRows = rows.slice(0, 10);
  console.log(headerGroups);
  return (
    <div className="overflow-x-auto  relative m-1  text-center bg-[#F1F1E8]  table-auto rounded shrink">
      <table className="  w-full border-separate " {...getTableProps()}>
        <thead className="bg-[#f3d6d9] ">
          {headerGroups.map((headerGroup) => (
            <tr
              className=" cursor-pointer w-14"
              key={headerGroup}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className={
                    column.filter
                      ? "px-6 py-3font-bold text-left uppercase  maximum:table-cell maximum:text-sm minimum:table-header-group "
                      : "px-6 py-3font-bold text-left uppercase  maximum:hidden "
                  }
                  key={headerGroup[column]}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                  <div>{column.filter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-[#635e58e6] m-3" {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      label={cell.column.Header ? cell.column.Header : "Edit"}
                      className="px-4 py-2 text-m"
                      key={cell}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
