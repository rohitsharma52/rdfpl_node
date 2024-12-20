import { Varient } from "../../model/varient_model.js";

export const get_varient=async(req,res)=>{
    const id=req.params.id;  
    try {
      const  productId  = req.params.id; 
      const variants = await Varient.find({ product_id: productId })
                                    .sort({ sell_price: -1 }); // Sort in descending order by sell_price                             
      res.status(200).json({ success: true, data: variants });
    } catch (error) {
      console.error('Error fetching variants:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
    } 

    export const add_to_cart = async (req, res) => {
      try {
        const { product_id, variant_id, quantity } = req.body;
    
        // Retrieve cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // If no cart exists, initialize an empty array
    
        // Check if product already exists in the cart
        const existingItem = cart.find(item => item.variant_id === variant_id);
        if (existingItem) {
          existingItem.quantity = quantity; // Update quantity if item exists
        } else {
          cart.push({ product_id, variant_id, quantity }); // Add new item if it doesn't exist
        }
    
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
        // Send the updated cart and count as response
        res.json({
          success: true,
          cart: cart,
          count: cart.length // Return updated cart count
        });
      } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    };
    

/////////////////update cart////////////////////////////////////////////
export const update_cart = async (req, res) => {
  try {
    const { product_id, variant_id, quantity } = req.body;

    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // If no cart exists, initialize an empty array

    if (cart.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty.' });
    }

    // Find the item to update in the cart
    const cartItem = cart.find(item => item.product_id === product_id && item.variant_id === variant_id);

    if (cartItem) {
      cartItem.quantity = quantity; // Update the quantity of the item
      // Save the updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Send the updated cart count
      res.json({ success: true, count: cart.length });
    } else {
      res.status(404).json({ success: false, message: 'Item not found in cart.' });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

    