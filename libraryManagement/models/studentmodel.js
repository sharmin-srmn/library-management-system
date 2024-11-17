import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    dob: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      lowercase: true,
    },
    address: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      require: true,
    },
    altphone: {
      type: String,
    },
    libraryId: {
      type: String,
    },
    department: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["active", "graduate", "alumni"],
      require: true,
      lowercase: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    expectedGraduationDate: {
      type: Date,
    },
    avater: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Studentmodel = mongoose.model("studentinformation", studentSchema);

export default Studentmodel;
