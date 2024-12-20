import express from "express";
 export const Ajax=express.Router();
 import * as AjaxController from '../../controller/front/AjaxController.js'
 Ajax.get('/get_varient/:id',AjaxController.get_varient);
 Ajax.post('/add_to_cart',AjaxController.add_to_cart);
 Ajax.post('/update_cart',AjaxController.update_cart);