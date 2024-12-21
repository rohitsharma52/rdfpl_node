import { Slider } from "./model/slider_model.js";

import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { Category } from "./model/category_model.js";
 export const FetchSliderData = async (req, res, next) => {
    try {
        const slider_data = await Slider.find();
        res.locals.slider_data = slider_data;   
        next();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
}

 export const checkAuth = (req, res, next) => {
    const token = req.cookies.token; // Read token from cookies
    if (!token) {
      return res.redirect("/login"); // Redirect to login if token is missing
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to request
      next(); // Proceed to the next middleware/route
    } catch (err) {
      return res.redirect("/login"); // Redirect if token is invalid
    }
  };
  export const fetchcategorydata=async(req,res,next)=>{
   try{
  let category_data=await Category.find();
  res.locals.category_data=category_data;
  next()
   }
   catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
}
  }
  export const CheckLoginUser = (req, res, next) => {
    // Check if userId exists in session
    if (req.session && req.session.userId) {
      return next(); // User is authenticated, proceed to the next middleware or route handler
    }
  
    // User is not authenticated, redirect to login
    req.flash('error_msg', 'Please log in to access this page.');
    res.redirect('/login');
  };
  
