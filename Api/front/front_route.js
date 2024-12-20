import express from "express";
 export const Front=express.Router();
 import * as HomeController from '../../controller/front/HomeController.js'
import { fetchcategorydata } from "../../middleware.js";

Front.get('/',fetchcategorydata,HomeController.home);
Front.get('/login',fetchcategorydata,HomeController.login);
Front.get('/register',fetchcategorydata,HomeController.register)


 