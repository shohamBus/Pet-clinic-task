import connectDB from "../../../middleware/mongodb";
import Patient from "../../../models/patient";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { patientId } = req.query;
    const patient = await Patient.findById(patientId);
    res.status(200).send(patient);
  }
};

export default connectDB(handler);
