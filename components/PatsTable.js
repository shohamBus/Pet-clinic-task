import React, { useState, useCallback, useMemo } from "react";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useClinic } from "../context/UsersContext";
import { Button } from "@mui/material";
import AddPatient from "./AddPatient";
import EditPatient from "./EditPatient";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

export default function PatsTable() {
  const { patients } = useClinic();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [patientId, setPatientId] = useState("");

  const editUser = useCallback(
    (id) => () => {
      setTimeout(() => {
        dialogEdit();
        setPatientId(id);
      });
    },
    []
  );

  function dialogEdit() {
    setOpenEdit(true);
  }
  function dialogAdd() {
    setOpenAdd(true);
  }
  //   const [displayPatients, setDisplayPatients] = useState([patients]);
  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        width: 200,
        flex: 1,
        filterable: true,
      },
      {
        field: "phoneNum",
        headerName: "Phone number",
        width: 200,
        flex: 1,
        sortable: false,
      },
      { field: "petName", headerName: "Pet name", width: 200, flex: 1 },
      {
        field: "petAge",
        headerName: "Pet name",
        width: 200,
        flex: 1,
        sortable: false,
      },
      { field: "petType", headerName: "Pet name", width: 200, flex: 1 },
      {
        field: "actions",
        type: "actions",
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Delete"
            key={"patient"}
            onClick={editUser(params.id)}
          />,
        ],
      },
    ],
    [editUser]
  );

  const rows = [
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
      <Box
        sx={{
          height: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DataGrid
          sx={{ color: "#ffffff" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={(categoryId) => dialog(categoryId)}
          disableSelectionOnClick
        />
        <AddPatient open={openAdd} setOpen={setOpenAdd} />
        <EditPatient
          patientId={patientId}
          open={openEdit}
          setOpen={setOpenEdit}
        />
        <Button
          className=" pt-1 px-12 border-r-4 bg-[#f3d6d9] hover:bg-[#da9ea4] m-auto "
          onClick={() => dialogAdd()}
        >
          Add patient <AddIcon />
        </Button>
      </Box>
      {/* <Update categoryId={categoryId} open={open} setOpen={setOpen} /> */}
    </>
  );
}
