import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Input, MenuItem, Select } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";

export default function AddPatient({ patientId, open, setOpen, action }) {
  // {
  //   userId
  //     ? fetch(`/api/user/${patientId}`, {
  //         method: "GET",
  //       })
  //         .then((res) => res.json())
  //         .then((res) => {
  //           setUser(res);
  //         })
  //     : null;
  // }

  // const [user, setUser] = useState([{}]);
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNum: "",
      petName: "",
      petAge: "",
      petType: "",
    },
    onSubmit: (values) => {
      fetch(`/api/patient`, {
        method: "POST",
        body: JSON.stringify(values),
      });
    },
  });
  // {
  //   !user.length
  //     ? (formik = useFormik({
  //         initialValues: {
  //           name: "",
  //           phoneNum: "",
  //           petName: "",
  //           petAge: "",
  //           petType: "",
  //         },
  //       }))
  //     : (formik = useFormik({
  //         initialValues: {
  //           name: "",
  //           phoneNum: "",
  //           petName: "",
  //           petAge: "",
  //           petType: "",
  //         },
  //       }));
  // }
  //   const updateState = (change, val) => {
  //     change == "title"
  //       ? setCategory({ ...category, title: val })
  //       : change == "titleheb"
  //       ? setCategory({ ...category, titleheb: val })
  //       : change == "img"
  //       ? setCategory({ ...category, img: val })
  //       : "";
  //   };
  // const deleteUser = (patientId) => {
  //   fetch(`/api/patient`, {
  //     method: "DELETE",
  //     body: JSON.stringify(categoryId),
  //   });
  // };
  // const updateUser = (user) => {
  //   fetch(`/api/category`, {
  //     method: "PATCH",
  //     body: JSON.stringify(user),
  //   });
  // };
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  // const handleContent = (e) => {
  //   return (newTitle = e.target.value);
  // };
  //send the cart product the title and the email
  //   const handleClick = async () => {
  // await axios.patch(`/api/user`, { cartProducts, email, title });
  //   };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <div className=" px-32  ">
            <h1>Add patient:</h1> <AddIcon />
            <Button onClick={() => deleteCategory(user._id)}>
              <DeleteIcon />
            </Button>
          </div>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>name of the owner:</p>
            <Input
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <p>Phone number of the owner:</p>{" "}
            <Input
              name="phoneNum"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phoneNum}
            />
            <p>Pet name:</p>{" "}
            <Input
              name="petName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.petName}
            />
            <p>Pet age:</p>{" "}
            <Input
              name="petAge"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.petAge}
            />
            <p>Pet type:</p>{" "}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.petType}
              label="type"
              onSelect={formik.handleChange}
            >
              <MenuItem value={"Cat"}>Cat</MenuItem>
              <MenuItem value={"Dog"}>Dog</MenuItem>
              <MenuItem value={"Parrot"}>Parrot</MenuItem>
            </Select>
            <Button type="submit" onClick={() => handleClose()}>
              Add
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
