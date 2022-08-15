import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Input, MenuItem, Select } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Field, useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";

export default function AddPatient({ patientId, open, setOpen, action }) {
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
        <form className="w-full max-w-sm mx-10" onSubmit={formik.handleSubmit}>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="md:flex md:space-x-24 mb-6">
              <div className=" text-left  text-[#000000] text-2xl underline font-bold ">
                Add patient +:
              </div>
              <div className=" text-right">
                <Button onClick={() => deleteCategory(user._id)}>
                  <DeleteIcon className=" text-[#000000] text-4xl" />
                </Button>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-[#626664] font-bold  mb-1 md:mb-0 pr-4"
                  htmlFor="name"
                >
                  <p>name of the owner:</p>
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-[#cacfcd] appearance-none border-2 border-[#cacfcd] rounded w-full py-2 px-4 text-[#626664] leading-tight focus:outline-none focus:bg-[#ffff] focus:border-[#cacfcd]"
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-[#626664] font-bold  mb-1 md:mb-0 pr-4"
                  htmlFor="phone"
                >
                  Phone number of the owner:
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-[#cacfcd] appearance-none border-2 border-[#cacfcd] rounded w-full py-2 px-4 text-[#626664] leading-tight focus:outline-none focus:bg-[#ffff] focus:border-[#cacfcd]"
                  id="phone"
                  name="phoneNum"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNum}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-[#626664] font-bold   mb-1 md:mb-0 pr-4"
                  htmlFor="petName"
                >
                  Pet name:
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-[#cacfcd] appearance-none border-2 border-[#cacfcd] rounded w-full py-2 px-4 text-[#626664] leading-tight focus:outline-none focus:bg-[#ffff] focus:border-[#cacfcd]"
                  id="petName"
                  name="petName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.petName}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-[#626664] font-bold  mb-1 md:mb-0 pr-4"
                  htmlFor="petAge"
                >
                  Pet age:
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-[#cacfcd] appearance-none border-2 border-[#cacfcd] rounded w-full py-2 px-4 text-[#626664] leading-tight focus:outline-none focus:bg-[#ffff] focus:border-[#cacfcd]"
                  id="petAge"
                  name="petAge"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.petAge}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-[#626664] font-bold  mb-1 md:mb-0 pr-4"
                  htmlFor="petType"
                >
                  Pet type:
                </label>
              </div>
              <div className="md:w-2/3">
                <select
                  className="bg-[#cacfcd] appearance-none border-2 border-[#cacfcd] rounded w-full py-2 px-4 text-[#626664] leading-tight focus:outline-none focus:bg-[#ffff] focus:border-[#cacfcd]"
                  id="petType"
                  name="petType"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.petType}
                >
                  <option>enter type..</option>
                  <option value={"Cat"}>Cat</option>
                  <option value={"Dog"}>Dog</option>
                  <option value={"Parrot"}>Parrot</option>
                </select>
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <Button type="submit" onClick={() => handleClose()}>
                Add
              </Button>{" "}
              <Button onClick={() => handleClose()}>Close</Button>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
