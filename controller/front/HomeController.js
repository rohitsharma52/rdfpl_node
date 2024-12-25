import { Address } from "../../model/address_model.js";
import { Banner } from "../../model/banner_model.js"
import { Cart } from "../../model/cart_model.js";
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
    res.cookie('userId', user._id, {
      httpOnly: true,   // Security measure to prevent JS access
      maxAge: 24 * 60 * 60 * 1000,  // Cookie expiration in milliseconds (1 day)
  });

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
export const add_address=async(req,res)=>{
try{
const get_data=req.body
const set_data=new Address(get_data);
await set_data.save()
res.redirect('/check_out')
}
catch (err) {
  console.error('Error:', err);
  return res.status(500).send('Internal Server Error');
}
}
export const update_address=async(req,res)=>{
  const id=req.params.id
try{
 const update_data=await Address.find({_id:id})

 res.render('front/update_address',{update_data})
}
catch (err) {
  console.error('Error:', err);
  return res.status(500).send('Internal Server Error');
}
}