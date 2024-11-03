//EXTERNAL IMPORTS
import express from "express";
import path from "path";
import dotenv from "dotenv";

//EXTERNAL IMPORTS
import router from "./routes/webRoutes.js";
import connectDB from "./db/connectDB.js";

const app = express();

dotenv.config();

//STATIC FILES
app.use(express.static(path.join(process.cwd(), "public")));
// console.log(path.join(process.cwd(), "public"));

//DB CONNECTION
connectDB(process.env.DATABAE_URL);

app.use(express.urlencoded({ extended: true }));

//SET VIEW ENGINE
app.set("view engine", "ejs");

//SET ROUTER
app.use("/", router);

//SERVER LISTEN
app.listen(process.env.PORT, () => {
  console.log(`Server listening http://localhost:${process.env.PORT}`);
});
