import express from "express";
import { homeController } from "../controllers/homeController.js";
import BookController from "../controllers/bookController.js";
import StudentController from "../controllers/studentController.js";
import IssueBookController from "../controllers/issueBookController.js";

const router = express.Router();

// route for home page
router.get("/", homeController);
//BOOKS ROUTING
router.get("/book", BookController.bookPage);
router.get("/addnewbook", BookController.addnewbookPage);
router.get("/editbook/:id", BookController.editbookPage);

//PERFORM FUNCTIONS
router.get("/allbooks", BookController.getAllBooksInformation);
router.post("/addnewbook", BookController.createNewBookDoc);
router.post("/updatebook/:id", BookController.updateBookDetails);
router.post("/deletebook/:id", BookController.deleteBookDetails);

//ISSUE BOOK PAGE
router.get("/issuebook", IssueBookController.issueBookPage);
router.get("/issuenewbook", IssueBookController.issueNewBookInformationPage);
router.get("/allissuedbooks", IssueBookController.getAllIssuedBookInformation);

router.post("/issuenewbook", IssueBookController.createIssueBookDoc);
router.post("/returnbook/:id", IssueBookController.returnBook);
router.post("/countfine/:id", IssueBookController.countFine);

//STUDENT ROUTING
router.get("/student", StudentController.studentPage);
router.get("/addnewstudent", StudentController.addnewstudentPage);
router.get("/allstudents", StudentController.getAllStudentsInformation);
router.get("/editstudent/:id", StudentController.editStudentPage);
router.get(
  "/studentinfo/:id",
  StudentController.getIndividualStudentInformation
);
router.post("/addnewstudent", StudentController.createNewStudentDoc);
router.post("/updatestudent/:id", StudentController.updateStudentDetails);
router.post("/deletestudent/:id", StudentController.deleteStudentDetails);

// router.post("/editstudent/:id", StudentController.updateStudentDetails);


export default router;
