import { Order1 } from "../../model/order1_model.js";
import { Order2 } from "../../model/order2_model.js";
import { Product } from "../../model/product_model.js";
import { Varient } from "../../model/varient_model.js";

export let all_order = async (req, res) => {
    try {
     
      const orderData = await Order1.find().populate('user_id', 'name'); // Populate only the 'name' field from User
  
      // Transform data if necessary
      const enrichedOrders = orderData.map(order => ({
        _id: order._id,
        total_amount: order.total_amount,
        status: order.status,
        date:order.createdAt,
        user_name: order.user_id?.name || 'Unknown User', // Safeguard for null user_id
      }));
  
      // Send the enriched orders as response
     res.render('admin/order/view_orders',{orders:enrichedOrders})
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  };
  export let order_details=async(req,res)=>{
let order_id=req.params.id
try {
    // Step 1: Retrieve order data
    const orderData = await Order2.find({ order_id: order_id });

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
   res.render('admin/order/order_detail',{ order_detail: enrichedData })
  }
catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }

  }