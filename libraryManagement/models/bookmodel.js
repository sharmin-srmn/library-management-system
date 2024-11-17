import mongoose from "mongoose";

//DEFINING BOOK SCHEMA (FIRST A SCHEM ADEFINE KORTE HOY)
const bookSchema = new mongoose.Schema(
  {
    bookName: { type: String, required: true, trim: true, lowercase: true },
    authorName: { type: String, required: true, trim: true, lowercase: true },
    editorName: { type: String, required: true, trim: true, lowercase: true },
    publisherName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    edition: { type: String, required: true, trim: true, lowercase: true },
    category: { type: String, required: true, trim: true, lowercase: true },
    publish: { type: String, required: true },
    quantity: { type: Number, required: true },
    condition: { type: String, required: true, trim: true, lowercase: true },
    status: { type: String, trim: true, lowercase: true },
    notes: { type: String, trim: true, lowercase: true },
    avater: { type: String },
    insertedDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

//CREATING MODEL  (THEN OI SCHEMA USE KORE MODEL CREATE KORTE HOY)
const BookModel = mongoose.model("bookinformation", bookSchema);

export default BookModel;
