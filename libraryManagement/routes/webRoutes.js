import express from "express";
import { homeController } from "../controllers/homeController.js";
import BookController from "../controllers/bookController.js";

const router = express.Router();

// route for home page
router.get("/", homeController);
router.get("/book", BookController.bookPage);
router.get("/addnewbook", BookController.addnewbookPage);
router.get("/editbook/:id", BookController.editbookPage);

//PERFORM FUNCTIONS
router.get("/allbooks", BookController.getAllBooksInformation);
router.post("/addnewbook", BookController.createNewBookDoc);
router.post("/updatebook/:id", BookController.updateBookDetails);
router.post("/deletebook/:id", BookController.deleteBookDetails);

export default router;
