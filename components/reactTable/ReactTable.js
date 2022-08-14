import React, { useState } from "react";
// import { IconButton } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import "babel-polyfill";
// A great library for fuzzy filtering/sorting items
import matchSorter from "match-sorter";
import { useClinic } from "../../context/UsersContext";
import { Button, IconButton } from "@mui/material";
import AddPatient from "../AddPatient";
import EditPatient from "../EditPatient";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search...`}
    />
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// Our table component
function Table({ columns, data }) {
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

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className=" cursor-pointer w-14"
              key={headerGroup}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th key={headerGroup[column]} {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.filter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td key={cell} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>
        {/* <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre> */}
      </div>
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number

function ReactTable() {
  const { patients } = useClinic();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [patientId, setPatientId] = useState("");
  // function dialogEdit() {
  //   setOpenEdit(true);
  // }
  function dialogAdd() {
    setOpenAdd(true);
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        filter: "filterName",
      },
      {
        Header: "Phone",
        accessor: "phoneNum",
        width: "auto",
      },
      {
        Header: "Pet Name",
        accessor: "petName",
        filter: "filterPetName",
        width: "auto",
      },
      {
        Header: "Pet Age",
        accessor: "petAge",
        width: "auto",
      },
      {
        Header: "Pet Type",
        accessor: "petType",
        Filter: SelectColumnFilter,
        filter: "includes",
        width: "auto",
      },
      {
        id: "id",
        Header: "",
        Cell: (props) => {
          return (
            <IconButton tooltip="Enter Folder">
              <EditIcon />
            </IconButton>
          );
        },
      },
    ],
    []
  );

  const data = [
    ...patients.map((patient) => {
      return {
        id: patient._id,
        name: patient.name,
        phoneNum: patient.phoneNum,
        petName: patient.petName,
        petAge: patient.petAge,
        petType: patient.petType,
      };
    }),
  ];

  return (
    <>
      <Table columns={columns} data={data} />
      <AddPatient open={openAdd} setOpen={setOpenAdd} />
      <EditPatient
        patientId={patientId}
        open={openEdit}
        setOpen={setOpenEdit}
      />

      <button
        className=" pt-1 px-12 border-r-4 bg-[#f3d6d9] hover:bg-[#da9ea4] m-auto "
        onClick={() => dialogAdd()}
      >
        {" "}
        Add patient <AddIcon />
      </button>
    </>
  );
}

export default ReactTable;
