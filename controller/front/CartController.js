import { Cart } from "../../model/cart_model.js";

/////////////// save cart form localstorge to database/////////////////////////////////
export const save_cart = async (req, res) => {
    try {
        const { user_id, cart_data } = req.body;
        
        // Validate input data
        if (!user_id || !cart_data || cart_data.length === 0) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        // Loop through cart data and check if product already exists in the database
        for (let item of cart_data) {
            const existingCartItem = await Cart.findOne({
                user_id: user_id,
                product_id: item.product_id,
                variant_id: item.variant_id
            });

            if (existingCartItem) {
                return res.status(200).json({ message: 'Cart data alredy cart' });

                
            } else {
                // If item doesn't exist, create a new entry in the cart
                const newCartItem = new Cart({
                    user_id: user_id,
                    product_id: item.product_id,
                    variant_id: item.variant_id,
                    quantity: item.quantity
                });
                await newCartItem.save();
            }
        }

        // Send success response
        return res.status(200).json({ message: 'Cart data saved successfully' });

    } catch (err) {
        console.error('Error saving cart:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
///////////////////////////////view cart //////////////////////////////////////////////////
export const cart = async (req, res) => {

    try {
        const userId = req.cookies.userId;   // Assuming you're using user authentication   
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
      req.session.cartData = cartData;
      req.session.totalCartAmount = totalCartAmount;
      // Render the 'cart' view and pass the cart data
      res.render('front/cart', { cartData,totalCartAmount });
  
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).send('Internal Server Error');
    }
  };
///////////////////////////delete cart ////////////////////////////////////////

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
//////////////////////////////update cart ////////////////////////////////////////
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