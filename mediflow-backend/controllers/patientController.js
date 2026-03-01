const Patient = require("../models/Patient");

/* CREATE PATIENT */
const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();

    res.status(201).json({
      message: "Patient created successfully",
      patient,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL PATIENTS */
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE PATIENT (Doctor / Lab / Medical) */
const updatePatient = async (req, res) => {
  try {

    const updatedPatient =
      await Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedPatient);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPatient,
  getPatients,
  updatePatient
};