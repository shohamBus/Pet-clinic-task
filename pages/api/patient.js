import connectDB from "../../middleware/mongodb";
import Patient from "../../models/patient";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const patient = await Patient.find();
    res.status(200).send(patient);
  } else if (req.method === "DELETE") {
    const patientId = JSON.parse(req.body);
    await Patient.findByIdAndDelete(patientId);
    res.status(200);
  } else if (req.method === "PATCH") {
    const patient = JSON.parse(req.body);
    await Patient.findByIdAndUpdate(patient._id, { ...patient });
    res.status(200).send(patient);
  } else if (req.method === "POST") {
    const { name, phoneNum, petName, petAge, petType } = JSON.parse(req.body);
    console.log(name, phoneNum, petName, petAge, petType);
    if (name && phoneNum && petName && petAge && petType) {
      try {
        const patient = new Patient({
          name,
          phoneNum,
          petName,
          petAge,
          petType,
        });
        // Create new user
        const patientcreate = await patient.save();
        return res.status(200).send(patientcreate);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
