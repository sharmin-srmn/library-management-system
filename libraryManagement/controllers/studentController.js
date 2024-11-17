import StudentModel from ".././models/studentmodel.js";
import IssueBookModel from "../models/issuebookmodel.js";
class StudentController {
  //
  // ROUTE ON ADD NEW STUDENT PAGE
  static studentPage = (req, res) => {
    try {
      res.render("student", {
        title: "Student - Library System",
        isBook: false,
        isStudent: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ROUTE ON ADD NEW STUDENT PAGE
  static addnewstudentPage = (req, res) => {
    res.render("addnewstudent", {
      title: "Add New Student Info. - Library Management",
      isBook: false,
      isStudent: true,
    });
  };
  // ROUTE ON ADD NEW STUDENT PAGE
  static getIndividualStudentInformation = async (req, res) => {
    try {
      const result = await StudentModel.findById(req.params.id);
      const issueBookHistory = await IssueBookModel.find({
        studentId: req.params.id,
      });
      res.render("studentdetails", {
        title: "Student Information - Library System",
        isBook: false,
        isStudent: true,
        data: result,
        bookData: issueBookHistory,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //ROUTE TO EDIT PAGE
  static editStudentPage = async (req, res) => {
    try {
      const result = await StudentModel.findById(req.params.id);
      res.render("editstudent", {
        title: "Edit Student Info. - Library Management",
        data: result,
        isBook: false,
        isStudent: true,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  //ALL STUDENT
  static getAllStudentsInformation = async (req, res) => {
    try {
      const result = await StudentModel.find();
      res.render("allstudents", {
        title: "All Students Info. - Library Management",
        isBook: false,
        isStudent: true,
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //CREATE NEW STUDENT
  static createNewStudentDoc = async (req, res) => {
    try {
      const libraryId = `stu-${req.body.name
        .toLowerCase()
        .split(" ")
        .join("-")}-${Date.now()}`;
      req.body.libraryId = libraryId;
      const doc = new StudentModel(req.body);
      const result = await doc.save();
      console.log("posted");
      // console.log(result);
      res.redirect("/student");
    } catch (err) {
      console.log(err.message);
    }
  };

  //DELETE STUDENT
  static deleteStudentDetails = async (req, res) => {
    try {
      const result = await StudentModel.findByIdAndDelete(req.params.id);
      res.redirect("/allstudents");
    } catch (err) {
      console.log(err.message);
    }
  };

  //UPDTAE STUDENT
  static updateStudentDetails = async (req, res) => {
    try {
      const result = await StudentModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.redirect("/allstudents");
    } catch (err) {
      console.log(err.message);
    }
  };
}
export default StudentController;
