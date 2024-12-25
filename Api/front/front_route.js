import express from "express";
 export const Front=express.Router();
 import * as HomeController from '../../controller/front/HomeController.js'
 import * as CartController from '../../controller/front/CartController.js'
import { CheckLoginUser, fetchcategorydata } from "../../middleware.js";

Front.get('/',fetchcategorydata,HomeController.home);
Front.get('/login',fetchcategorydata,HomeController.login);
Front.get('/register',fetchcategorydata,HomeController.register);
Front.post('/new_user',HomeController.new_user);
Front.post('/check_user',HomeController.check_user);
Front.post('/save_cart',CartController.save_cart);
Front.post('/delete_cart/:id',CartController.delete_cart);
Front.post('/update_cart',CartController.update_cart);
Front.get('/cart',fetchcategorydata,CheckLoginUser,CartController.cart);
Front.get('/product',fetchcategorydata,HomeController.product);
Front.get('/check_out',fetchcategorydata,CheckLoginUser,HomeController.check_out);
Front.post('/add_address',HomeController.add_address);
Front.get('/update_address/:id',fetchcategorydata,CheckLoginUser,HomeController.update_address);




 