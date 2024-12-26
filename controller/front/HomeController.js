import { Address } from "../../model/address_model.js";
import { Banner } from "../../model/banner_model.js"
import { Category } from "../../model/category_model.js";
import { Product } from "../../model/product_model.js";

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

export const product=async(req,res)=>{
try{
  const category_data=await Category.find();
  const Product_data=await Product.find();
  const productCount = await Product.countDocuments();
res.render('front/product',{category_data,Product_data,productCount})
}
catch (error) {
  console.error('Error fetching banners:', error);
  res.status(500).send('Internal Server Error');
}
}

export const check_out=async(req,res)=>{
try{
  const Prodcut_data = req.session.cartData || [];
  const cart_total = req.session.totalCartAmount || 0;
  const userId = req.cookies.userId;
  const address_data=await Address.find({'user_id':userId})

res.render('front/checkout',{cart_total,userId,address_data,Prodcut_data})
}
catch (err) {
  console.error('Error:', err);
  return res.status(500).send('Internal Server Error');
}
}
