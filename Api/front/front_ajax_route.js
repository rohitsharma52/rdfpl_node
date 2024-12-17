import express from "express";
 export const Ajax=express.Router();
 import * as AjaxController from '../../controller/front/AjaxController.js'
 Ajax.get('/get_varient/:id',AjaxController.get_varient);