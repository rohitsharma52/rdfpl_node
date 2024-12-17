import express from "express";
import { db } from "./db.js";
import dotenv from "dotenv";
import session from "express-session";
import flash from "connect-flash";
import cookieParser  from "cookie-parser";
import { Front } from "./Api/front/front_route.js";
import { Admin } from "./Api/admin/admin_route.js";
import path from "path";
import { fileURLToPath } from "url"; // ES Modules ke liye `__dirname` support
import { Login } from "./Api/login_route.js";
import { checkAuth } from "./middleware.js";
import { Ajax } from "./Api/front/front_ajax_route.js";

//////////////////////////////__dirname   define///////////////////////////////////////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
app.use(cookieParser());
//////////////////////////////session config////////////////////////////////////////////////////
app.use(
  session({
    secret: process.env.Session_Key, // Replace with your secret key
    resave: false,
    saveUninitialized: true,
  })
);
//////////////////////////////Middleware for json data parse//////////////////////////
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
//////////////////////////////////public dir for Static files///////////////////////////////
app.use(express.static(path.join(__dirname, "public"))); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/////////////////////////////////////ejs template ////////////////////////////////////////
app.set("view engine", "ejs"); 
/////////////////////////////////////connect flash////////////////////////////////////////
app.use(flash());
/////////////////////// Middleware to pass flash messages to views///////////////////////
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
///////////////////////////////////Routes////////////////////////////////////////////////
app.use("/", Front);
app.use('/auth',checkAuth, Admin);
app.use('/login',Login);
app.use('/ajax',Ajax);
/////////////////////////////////server/////////////////////////////////////////////////
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
