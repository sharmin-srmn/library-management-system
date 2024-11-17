import mongoose from "mongoose";

const issueBookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    bookId: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    studentName: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    studentId: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    libraryId: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
    },
    issueDate: {
      type: Date,
      default: Date.now,
      require: true,
    },
    dueDate: {
      type: Date,
      require: true,
      default: function () {
        const issueDate = this.issueDate || new Date();
        return new Date(issueDate.getTime() + 3 * 24 * 60 * 60 * 1000);
      },
    },
    returnDate: {
      type: Date,
    },
    status: {
      type: String,
      default: "issued",
    },
    issuedBy: {
      type: String,
      require: true,
    },
    fineAmount: {
      type: String,
      require: true,
      default: "0",
    },
    comment: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const IssueBookModel = mongoose.model("issuebookinformation", issueBookSchema);

export default IssueBookModel;
