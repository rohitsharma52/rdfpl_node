import express from "express";
 export const Front=express.Router();
 import * as HomeController from '../../controller/front/HomeController.js'
 import * as UserController from '../../controller/front/UserController.js'
 import * as CartController from '../../controller/front/CartController.js'
 import * as AddressController from '../../controller/front/AddressController.js'
 import * as OrderController from '../../controller/front/OrderController.js'
import { CheckLoginUser, fetchcategorydata } from "../../middleware.js";

Front.get('/',fetchcategorydata,HomeController.home);
Front.get('/login',fetchcategorydata,UserController.login);
Front.get('/register',fetchcategorydata,UserController.register);
Front.post('/new_user',UserController.new_user);
Front.post('/check_user',UserController.check_user);
Front.post('/save_cart',CartController.save_cart);
Front.post('/delete_cart/:id',CartController.delete_cart);
Front.post('/update_cart',CartController.update_cart);
Front.get('/cart',fetchcategorydata,CheckLoginUser,CartController.cart);
Front.get('/product',fetchcategorydata,HomeController.product);
Front.get('/check_out',fetchcategorydata,CheckLoginUser,HomeController.check_out);
Front.post('/add_address',AddressController.add_address);
Front.get('/update_address/:id',fetchcategorydata,CheckLoginUser,AddressController.update_address);
Front.post('/place_order',CheckLoginUser,OrderController.place_order);
Front.get('/order_comfirm',CheckLoginUser,fetchcategorydata,OrderController.order_comfirm);
Front.get('/user_account',CheckLoginUser,fetchcategorydata,HomeController.user_account);
Front.get('/order_detail/:id',CheckLoginUser,fetchcategorydata,HomeController.order_detail);




 