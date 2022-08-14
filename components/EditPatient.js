import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";

export default function EditPatient({ patientId, open, setOpen, action }) {
  const [currentPatient, setCurrentPatient] = useState([]);
  useEffect(() => {
    fetch(`/api/patient/${patientId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setCurrentPatient(res);
      });
  }, [patientId]);
  const formik = useFormik({
    initialValues: {
      _id: currentPatient._id,
      name: currentPatient.name,
      phoneNum: currentPatient.phoneNum,
      petName: currentPatient.petName,
      petAge: currentPatient.petAge,
      petType: currentPatient.petType,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      fetch(`/api/patient`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
    },
  });

  const deletePatient = (patientId) => {
    setOpen(false);
    fetch(`/api/patient`, {
      method: "DELETE",
      body: JSON.stringify(patientId),
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <Button onClick={() => deletePatient(currentPatient._id)}>
            <DeleteIcon />
          </Button>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              name of the owner:{" "}
            </DialogContentText>
            <Input
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <DialogContentText id="alert-dialog-description">
              Phone number of the owner:{" "}
            </DialogContentText>
            <Input
              name="phoneNum"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phoneNum}
            />
            <DialogContentText id="alert-dialog-description">
              Pet name:{" "}
            </DialogContentText>
            <Input
              name="petName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.petName}
            />
            <DialogContentText id="alert-dialog-description">
              Pet age:{" "}
            </DialogContentText>
            <Input
              name="petAge"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.petAge}
            />
            <DialogContentText id="alert-dialog-description">
              Pet type:{" "}
            </DialogContentText>
            <Input
              name="petType"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.petType}
            />
            <Button type="submit" onClick={() => handleClose()}>
              Edit
            </Button>
            {/* {action === "Add" ? (
            ) : action === "Edit" ? (
              <Button type="submit" onClick={() => updateCategory(category)}>
                Edit
              </Button>
            ) : null} */}
            <Button onClick={() => handleClose()}>Close</Button>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
