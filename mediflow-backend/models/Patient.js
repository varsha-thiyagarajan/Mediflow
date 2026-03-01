const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    symptoms: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["Critical", "High", "Medium", "Low"],
      default: "Low",
    },

    doctor: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Doctor", // workflow starts here
    },

    notes: {
      type: String,
      default: "",
    },

    labNeeded: {
      type: Boolean,
      default: false,
    },

    prescription: {
      type: String,
      default: "",
    },

    labResult: {
      type: String,
      default: "",
    },

    dispensed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);