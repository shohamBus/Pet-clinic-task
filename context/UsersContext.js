import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useMemo } from "react";

const UsersContext = React.createContext();

export function useClinic() {
  return useContext(UsersContext);
}

export default function ContextProvider({ children }) {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    axios.get("/api/patient").then((res) => setPatients(res.data));
  }, []);

  function setFilteredParams(filterArr, val) {
    if (filterArr.includes(val)) {
      filterArr = filterArr.filter((n) => {
        return n !== val;
      });
    } else filterArr.push(val);

    if (filterArr.length === 0) filterArr = undefined;
    return filterArr;
  }

  const MultipleFilter = (rows, filler, filterValue) => {
    const arr = [];
    rows.forEach((val) => {
      if (filterValue.includes(val.original.petType)) arr.push(val);
    });
    return arr;
  };

  function SelectColumnFilter({
    column: { filterValue = [], setFilter, preFilteredRows, id },
  }) {
    const [displayCheckbox, setDisplayCheckbox] = useState(false);
    const options = useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
    return (
      <>
        <select onClick={() => setDisplayCheckbox(!displayCheckbox)} />
        {displayCheckbox &&
          options?.map((option, i) => (
            <div
              className=" text-primary border border-solid border-[#000]"
              key={i}
            >
              <input
                type="checkbox"
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                id={option}
                name={option}
                value={option}
                onChange={(e) => {
                  setFilter(setFilteredParams(filterValue, e.target.value));
                }}
              ></input>
              <label
                htmlFor={option}
                className="ml-1.5 font-medium text-gray-700"
              >
                {option}
              </label>
            </div>
          ))}
      </>
    );
  }

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

  return (
    <UsersContext.Provider
      value={{
        patients,
        setPatients,
        DefaultColumnFilter,
        MultipleFilter,
        setFilteredParams,
        SelectColumnFilter,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
