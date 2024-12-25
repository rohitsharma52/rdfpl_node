import express from "express";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { Team } from "../model/team_model.js";
export const Login=express.Router();

Login.get('/',(req,res)=>{
    res.render('admin/login')
    });
    
    // Admin login route


    
Login.post('/check_user', async (req, res) => {
        const { username, password } = req.body;
      
        try {
          // Find user by username using Mongoose
          const user = await Team.findOne({ username: username }); // Using findOne() instead of find()
          if (!user) {
            // Flash message handling (you need a session store, like express-session)
            req.flash('error_msg', 'Your Username is invalid')
            return res.status(401).redirect('/admin');
          }
      
          // Password validation
          const isPasswordValid = bcrypt.compareSync(password, user.password);
          if (!isPasswordValid) {
            req.flash('error_msg', 'Your Password is invalid plese try again')
            return res.status(401).redirect('/admin');
          }
      
          // Generate JWT token
          const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
          // Save token in cookies
          res.cookie("token", token, { httpOnly: true });
      
          // Redirect to authenticated route
          res.redirect("/auth");
        } catch (error) {
          console.error(error);
          res.status(500).send('Something went wrong.');
        }
      });