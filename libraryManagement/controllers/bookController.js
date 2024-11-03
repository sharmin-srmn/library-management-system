import BookModel from "../models/bookmodel.js";

class BookController {
  //ROUTING TO PAGES
  //ROUTE ON BOOK PAGE
  static bookPage = async (req, res) => {
    try {
      res.render("book", {
        title: "Book - Library Management",
      });
    } catch (err) {
      console.log(err);
    }
  };
  // ROUTE ON ADD NEW BOOK PAGE
  static addnewbookPage = (req, res) => {
    res.render("addnewbook", {
      title: "Add New Book Info. - Library Management",
    });
  };

  //GET ALL BOKS INFORMATION AND ROUTE TO ALLBOOKS PAGE
  static getAllBooksInformation = async (req, res) => {
    try {
      const result = await BookModel.find();
      res.render("allbooks", {
        title: "All Books Info. - Library Management",
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ROUTE ON EDIT BOOK PAGE
  static editbookPage = async (req, res) => {
    try {
      // console.log(req.params.id)
      const result = await BookModel.findById(req.params.id);
      res.render("editbook", {
        title: "Edit Book Info. - Library Management",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //UPDATE THE BOOK DETAILS
  static updateBookDetails = async (req, res) => {
    try {
      const result = await BookModel.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("allbooks");
    } catch (err) {
      console.log(err);
    }
  };

  //DELETE THE BOOK DETAILS
  static deleteBookDetails = async (req, res) => {
    try {
      console.log(req.params.id);
      const result = await BookModel.findByIdAndDelete(req.params.id);
      res.redirect("allbooks");
    } catch (err) {
      console.log(err);
    }
  };

  //CREATE NEW BOOK DOCUMENT
  static createNewBookDoc = async (req, res) => {
    try {
      //req.body parameter a sob input information gulo aasbe
      const { bookName, authorName, edition, publish, stock } = req.body;
      const doc = new BookModel({
        bookName: bookName.toLowerCase(),
        authorName: authorName.toLowerCase(),
        edition: edition,
        publish: publish,
        stock: stock,
      });
      const result = await doc.save();
      console.log("posted");
      res.redirect("book");
    } catch (err) {
      console.log(err);
    }
  };
}

export default BookController;
