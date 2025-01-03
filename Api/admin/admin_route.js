import express from "express";

import { FetchSliderData } from "../../middleware.js";
import * as AdminController from "../../controller/admin/AdminController.js";
import * as CategoryController from "../../controller/admin/CategoryController.js";
import * as SubcategoryController from "../../controller/admin/SubcategoryController.js";
import * as BannerController from "../../controller/admin/BannerController.js";
import * as ProductController from "../../controller/admin/ProductController.js";
import * as VarientController from "../../controller/admin/VarientController.js";
import * as OrderController from "../../controller/admin/OrderController.js";
import { upload } from "../../multer.js";
 export const Admin=express.Router();
 
/////////////////////////////////admin home page///////////////////////////////////////////////
Admin.get('/',FetchSliderData,AdminController.home);
//////////////////////////////////slider Api here///////////////////////////////////////////
 Admin.get('/add_slider',FetchSliderData,AdminController.add_slider);
 Admin.post('/add_slider_process',AdminController.add_slider_process);
//////////////////////////////////Admin Team/////////////////////////////////////////////////
Admin.get('/add_team',FetchSliderData,AdminController.add_team);
Admin.post('/add_team_process',AdminController.add_team_process);
//////////////////////////////////category route//////////////////////////////////////
Admin.get('/add_category',FetchSliderData ,CategoryController.add_category);
Admin.post('/add_category_process',upload.single('image'),CategoryController.add_category_process);
Admin.get('/view_category',FetchSliderData,CategoryController.view_category);
Admin.post('/delete_category/:id',CategoryController.delete_category);
Admin.get('/update_category/:id',FetchSliderData,CategoryController.update_category);
Admin.post('/update_category_process/:id',upload.single('image'),CategoryController.update_category_process);
////////////////////////////////subcategory////////////////////////////////////////////////////////////////
Admin.get('/add_subcategory',FetchSliderData ,SubcategoryController.add_subcategory);
Admin.post('/add_subcategory_process',upload.single('image'),SubcategoryController.add_subcategory_process);
Admin.get('/view_subcategory',FetchSliderData,SubcategoryController.view_subcategory);
Admin.post('/delete_subcategory/:id',SubcategoryController.delete_subcategory);
Admin.get('/update_subcategory/:id',FetchSliderData,SubcategoryController.update_subcategory);
Admin.post('/update_subcategory_process/:id',upload.single('image'),SubcategoryController.update_subcategory_process);
////////////////////////////////banner route///////////////////////////////////////  
Admin.get('/add_banner',FetchSliderData ,BannerController.add_banner);
Admin.post('/add_banner_process',upload.single('image'),BannerController.add_banner_process);
Admin.get('/view_banner',FetchSliderData,BannerController.view_banner);
Admin.post('/delete_banner/:id',BannerController.delete_banner);
Admin.get('/update_banner/:id',FetchSliderData,BannerController.update_banner);
Admin.post('/update_banner_process/:id',upload.single('image'),BannerController.update_banner_process);
//////////////////////////////Product routes //////////////////////////////////////////////
Admin.get('/add_product',FetchSliderData ,ProductController.add_product);
Admin.get('/get_subcategories/:id',ProductController.get_subcategories);
Admin.post('/add_product_process', upload.fields([
    { name: 'featureImg', maxCount: 1 },  // Only 1 file for feature image
    { name: 'images', maxCount: 4 }       // Up to 4 files for images
  ]), ProductController.add_product_process);
Admin.get('/view_product',FetchSliderData,ProductController.view_product);
Admin.post('/delete_product/:id',ProductController.delete_product);
Admin.get('/update_product/:id',FetchSliderData,ProductController.update_product);
Admin.post('/update_product_process/:id', 
    upload.fields([
        { name: 'featureImg', maxCount: 1 }, 
        { name: 'images', maxCount: 5 }
    ]), 
    ProductController.update_product_process
);
Admin.get('/search_product',ProductController.search_product)
/////////////////////////////Varient Routes Here/////////////////////////////////////////
Admin.get('/add_varient/:id',FetchSliderData,VarientController.add_varient);
Admin.post('/add_varient_process',VarientController.add_varient_process);
Admin.get('/view_varient',FetchSliderData,VarientController.view_varient);
Admin.post('/delete_varient/:id',VarientController.delete_varient);
Admin.get('/update_varient/:id',FetchSliderData,VarientController.update_varient);
Admin.post('/update_varient_process/:id',VarientController.update_varient_process);
//////////////////////////Orders Route here//////////////////////////////////////
Admin.get('/all_order',FetchSliderData,OrderController.all_order);
Admin.get('/order_details/:id',FetchSliderData,OrderController.order_details);





  
 