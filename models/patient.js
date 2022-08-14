import mongoose from "mongoose";
const Schema = mongoose.Schema;

const patient = new Schema({
  name: {
    type: String,
  },
  phoneNum: {
    type: String,
  },
  petName: {
    type: String,
  },
  petAge: {
    type: Number,
  },
  petType: {
    type: String,
  },
});

mongoose.models = {};

const Patient = mongoose.model("Patient", patient);

export default Patient;
