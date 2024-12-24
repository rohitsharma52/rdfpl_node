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


export const save_cart = async (req, res) => {
  try {
    const { user_id, cart_data } = req.body;  // Get user_id and cart_data from the request body

    // Array to store all the cart items
    const cartItems = cart_data.map(item => ({
      user_id,        // Assign the user_id for each item
      product_id: item.product_id, // Assuming product_id is part of each cart item
      variant_id: item.variant_id, // Assuming variant_id is part of each cart item
      quantity: item.quantity,     // Assuming quantity is part of each cart item
    }));

    // Save the cart items to the database
    await Cart.insertMany(cartItems);

    // Send success response
    return res.status(200).send({ message: 'Cart data saved successfully' });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send('Internal Server Error');
  }
};

export const cart = async (req, res) => {
  try {
    const userId = req.session.userId;  // Assuming you're using user authentication
    const cartItems = await Cart.find({ user_id: userId }).populate('product_id').populate('variant_id');
    

    // Prepare data for the frontend 
    const cartData = await Promise.all(cartItems.map(async (item) => {
      const product = item.product_id;
      const variant = item.variant_id;

      return {
        cart_id: item._id,
        product_id: product._id,
        product_name: product.name,  // Assuming 'name' is in the Product model
        product_image: product.featureImg,  // Assuming 'image' is in the Product model
        quantity: item.quantity,
        variant_id:variant._id,
        unit_price: variant.sell_price,  // Assuming 'sell_price' is in the Variant model
        pack_size: variant.pack_size,
        unit: variant.unit, // Assuming 'pack_size' is in the Variant model
        total_price: item.quantity * variant.sell_price,
      };
    }));
    const totalCartAmount = cartData.reduce((sum, item) => sum + item.total_price, 0);
    req.session.totalCartAmount = totalCartAmount;

    // Render the 'cart' view and pass the cart data
    res.render('front/cart', { cartData,totalCartAmount });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send('Internal Server Error');
  }
};
export const delete_cart=async(req,res)=>{
  const id=req.params.id
try{
  const response=await Cart.findByIdAndDelete(id)
  res.redirect('/cart')
}
catch (err) {
  console.error('Error:', err);
  return res.status(500).send('Internal Server Error');
}
}
export const update_cart=async(req,res)=>{
try{
  const { product_id, variant_id, quantity } = req.body;

  if (!product_id || !variant_id || !quantity) {
      return res.status(400).json({ success: false, message: 'Invalid request data' });
  }

  // Update the cart item based on product_id and variant_id
  const updatedItem = await Cart.findOneAndUpdate(
      { product_id, variant_id },
      { $set: { quantity } },
      { new: true }
  );

  if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
  }

  res.json({ success: true, message: 'Cart updated successfully', updatedItem });
}
catch (err) {
  console.error('Error:', err);
  return res.status(500).send('Internal Server Error');
}
}


export const check_out=async(req,res)=>{
try{
  const cart_total=req.session.totalCartAmount;
  const userId = req.session.userId; 
  const address_data=await Address.find({'user_id':userId})
  const cart_data= req.locals.cartData;
res.render('front/checkout',{cart_total,userId,address_data,cart_data})
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