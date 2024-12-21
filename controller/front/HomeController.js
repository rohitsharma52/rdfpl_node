import { Banner } from "../../model/banner_model.js"
import { Category } from "../../model/category_model.js";
import { Product } from "../../model/product_model.js";
import { User } from "../../model/user_model.js";
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



export const new_user=async(req,res)=>{
try{
const get_data=req.body
const set_data=new User(get_data)
const response=await set_data.save();
res.redirect('/login')

}
catch (err) {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
}
}  
export const check_user = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error_msg', 'Email Not Found. Please Try Again.');
      return res.status(401).json({ success: false, message: 'Email Not Found. Please Try Again.' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash('error_msg', 'Password Does Not Match. Please Try Again.');
      return res.status(401).json({ success: false, message: 'Password Does Not Match. Please Try Again.' });
    }

    // Success
    req.session.userId = user._id;

    // Send userId in the response
    return res.json({
      success: true,
      userId: user._id.toString(), // Send userId as string (to avoid ObjectId format issues in frontend)
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send('Internal Server Error');
  }
};


export const save_cart=async(req,res)=>{
  const { cart } = req.body;
try{
console.log('server cart data ',cart)
}
catch (err) {
  console.error('Error:', err);
  return res.status(500).send('Internal Server Error');
}
}





export const cart=async(req,res)=>{
try{

 
res.render('front/cart')
}
catch (err) {
  console.error('Error:', err);
  return res.status(500).send('Internal Server Error');
}
}