import { Banner } from "../../model/banner_model.js"
import { Category } from "../../model/category_model.js";
import { Product } from "../../model/product_model.js";
import { Varient } from "../../model/varient_model.js";

export let home = async (req, res) => {
    try {
    
      const banner_data = await Banner.find();
      const category_data= await Category.find();
      const Featured_data=await Product.find({featuredProduct:true})      
      const Best_seller_data=await Product.find({bestSeller:true})
      res.render('front/index', { banner_data,Featured_data,Best_seller_data });
    } catch (error) {
      console.error('Error fetching banners:', error);
      res.status(500).send('Internal Server Error');
    }
  };
export const login=(req,res)=>{
res.render('front/user/login')
} 
export const register=(req,res)=>{
  res.render('front/user/register')
  } 