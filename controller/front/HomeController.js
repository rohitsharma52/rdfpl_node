import { Address } from "../../model/address_model.js";
import { Banner } from "../../model/banner_model.js"
import { Category } from "../../model/category_model.js";
import { Product } from "../../model/product_model.js";
import { Varient } from "../../model/varient_model.js";
import { User } from "../../model/user_model.js";
import { Order1 } from "../../model/order1_model.js";
import { Order2 } from "../../model/order2_model.js";

export let home = async (req, res) => {
    try {
    
      const banner_data = await Banner.find();
      const category_data= await Category.find();
      const Featured_data=await Product.find({featuredProduct:true});      
      const Best_seller_data=await Product.find({bestSeller:true});
      const weeklyDeals=await Product.find({weeklyDeals:true});
      res.render('front/index', { banner_data,Featured_data,Best_seller_data,weeklyDeals});
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
export let user_account=async(req,res)=>{
  const userId = req.cookies.userId;
  try {
    let user_data = await User.find({ _id: userId });
    let order_data=await Order1.find({user_id:userId});
    const orderCount = await Order1.countDocuments({ user_id: userId });
    res.render('front/user_account', { user_data,order_data,orderCount });
}
catch (err) {
  console.error('Error:', err);
  return res.status(500).send('Internal Server Error');
}
}

export let order_detail = async (req, res) => {
  const id = req.params.id;

  try {
    // Step 1: Retrieve order data
    const orderData = await Order2.find({ order_id: id });

    const productVariantMap = orderData.map(order => ({
      product_id: order.product_id,
      variant_id: order.variant_id,
      quantity: order.quantity,
    }));

    // Step 3: Retrieve data for each product and variant
    const enrichedData = await Promise.all(
      productVariantMap.map(async (item) => {
        const product = await Product.findById(item.product_id);
        const variant = await Varient.findById(item.variant_id);

        return {
          product_name: product?.name || 'Unknown Product',
          featureImg:product.featureImg,
          unit: variant?.unit ,
          pack_size: variant?.pack_size ,
          sell_price: variant?.sell_price || 0,
          quantity: item.quantity,
        };
      })
    );
    console.log(enrichedData);
   res.render('front/order_detail',{ order_details: enrichedData })
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send('Internal Server Error');
  }
};