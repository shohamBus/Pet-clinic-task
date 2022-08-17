import React, { useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Table from "./Table";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useClinic } from "../../context/UsersContext";
import { IconButton } from "@mui/material";
import AddPatient from "../AddPatient";
import EditPatient from "../EditPatient";

function ReactTable() {
  const { MultipleFilter, setFilteredParams, SelectColumnFilter, patients } =
    useClinic();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [patientId, setPatientId] = useState("");

  const editUser = (id) => {
    dialogEdit();
    setPatientId(id);
  };

  function dialogEdit() {
    setOpenEdit(true);
  }
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
        filterkey: "petType",
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
        width: "auto",
      },
      {
        id: "id",
        Header: "",
        Cell: (props) => {
          return (
            <IconButton tooltip="Enter Folder">
              <EditIcon onClick={() => editUser(props.row.original.id)} />
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
    <d>
      <Table columns={columns} data={data} />
      <AddPatient open={openAdd} setOpen={setOpenAdd} />
      <EditPatient
        patientId={patientId}
        open={openEdit}
        setOpen={setOpenEdit}
      />
      <button
        className=" text-center py-3 px-12  bg-[#f3d6d9] hover:bg-[#da9ea4] font-bold  rounded  "
        onClick={() => dialogAdd()}
      >
        {" "}
        Add patient <AddIcon />
      </button>
    </d>
  );
}

export default ReactTable;
