import BookModel from "../models/bookmodel.js";
import IssueBookModel from "../models/issuebookmodel.js";
import Studentmodel from "../models/studentmodel.js";

class IssueBookController {
  // ISSUE BOOOK - MENU
  static issueBookPage = (req, res) => {
    try {
      res.render("issuebook", {
        title: "Issue Book - Library Management",
        isBook: true,
        isStudent: false,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // ISSUE NEW BOOOK PAGE
  static issueNewBookInformationPage = (req, res) => {
    try {
      res.render("issuenewbook", {
        title: "Issue New Book - Library Management",
        isBook: true,
        isStudent: false,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  //GET ISSUED BOOK LIST
  static getAllIssuedBookInformation = async (req, res) => {
    try {
      const result = await IssueBookModel.find();
      res.render("allissuedbook", {
        title: "Issue Book List Info. - Library Management",
        isBook: true,
        isStudent: false,
        data: result,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  // COUNT FINE
  static countFine = async (req, res) => {
    try {
      const result = await IssueBookModel.findById(req.params.id);
      const dueDate = result.dueDate.getTime();
      const curntDate = Date.now();
      if (curntDate > dueDate) {
        const milisecondsperdays = 1000 * 60 * 60 * 24;
        const days = Math.ceil((curntDate - dueDate) / milisecondsperdays);
        const fine = days * 30;
        await IssueBookModel.findByIdAndUpdate(req.params.id, {
          fineAmount: fine,
          comment: "late returned",
        });
        res.redirect("/allissuedbooks");
      } else {
        res.redirect("/allissuedbooks");
      }
    } catch (err) {
      console.log(err.message);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // RETURN BOOK
  static returnBook = async (req, res) => {
    try {
      const { id } = req.params;

      //UPDATING ISSED BOOK HISTORY
      const result = await IssueBookModel.findByIdAndUpdate(id, {
        status: "returned",
        returnDate: new Date(),
      });
      //UPDATING BOOK STOCK
      await BookModel.findByIdAndUpdate(result.bookId, {
        $inc: { quantity: 1 },
      });

      console.log(result);

      res.redirect("/allissuedbooks");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("An error occurred while returning the book.");
    }
  };

  // CREATE NEW ISSU BOOK DETAILS
  static createIssueBookDoc = async (req, res) => {
    try {
      // EXTRAC LIBRARY ID
      const studentInfo = await Studentmodel.findById(
        req.body.studentId.trim(),
        {
          libraryId: 1,
          name: 1,
        }
      );
      const bookInfo = await BookModel.findById(req.body.bookId.trim(), {
        bookName: 1,
        quantity: 1,
      });
      if (!studentInfo) {
        return res.status(404).send("Student ID not found in the database.");
      }

      if (!bookInfo) {
        return res.status(404).send("Book ID not found in the database.");
      }
      if (bookInfo.quantity <= 0) {
        return res.status(400).send("Book stock is unavailable.");
      }
      req.body.libraryId = studentInfo.libraryId;
      req.body.studentName = studentInfo.name;
      req.body.bookName = bookInfo.bookName;
      const doc = new IssueBookModel(req.body);
      await doc.save();

      await BookModel.findByIdAndUpdate(req.body.bookId.trim(), {
        $inc: { quantity: -1 },
      });
      res.redirect("/issuebook");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("An error occurred while issuing the book.");
    }
  };
}

export default IssueBookController;
