import express from "express";
 export const Front=express.Router();
 import * as HomeController from '../../controller/front/HomeController.js'
import { CheckLoginUser, fetchcategorydata } from "../../middleware.js";

Front.get('/',fetchcategorydata,HomeController.home);
Front.get('/login',fetchcategorydata,HomeController.login);
Front.get('/register',fetchcategorydata,HomeController.register)
Front.post('/new_user',HomeController.new_user)
Front.post('/check_user',HomeController.check_user);
Front.post('/save_cart',HomeController.save_cart);
Front.post('/delete_cart/:id',HomeController.delete_cart);
Front.post('/update_cart',HomeController.update_cart);
Front.get('/cart',fetchcategorydata,CheckLoginUser,HomeController.cart);
Front.get('/product',fetchcategorydata,HomeController.product);




 