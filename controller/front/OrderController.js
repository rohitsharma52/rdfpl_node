import { Order1 } from "../../model/order1_model.js";
import { Order2 } from "../../model/order2_model.js";
import { Cart } from "../../model/cart_model.js";


export const place_order = async (req, res) => {
    try {   
        const { user_id, address_id, total_amount, cart_data } = req.body;

        if (!user_id || !address_id || !total_amount || !cart_data.length) {
            return res.status(400).send({ success: false, message: 'Invalid data provided' });
        }

        // Save in Order1
        const order1 = await Order1.create({
            user_id,
            address_id,
            total_amount,
            status: 'Pending',
        });

        // Save in Order2
        const order2Items = cart_data.map(item => ({
            user_id,
            order_id: order1._id,
            product_id: item.product_id,
            variant_id: item.variant_id,
            quantity: item.quantity,
        }));

        await Order2.insertMany(order2Items);
        await Cart.deleteMany({ user_id: user_id });

        res.status(200).send({ success: true, message: 'Order placed successfully', order_id: order1._id });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
};
export let order_comfirm = async (req, res) => {
    try {
        const userId = req.cookies.userId; // Ensure userId is retrieved correctly
        if (!userId) {
            return res.redirect('/login'); // Redirect to login if userId is not available
        }

        // Fetch the latest order for the user
        const Order_data = await Order1.findOne({ user_id: userId }).sort({ createdAt: -1 });

        if (!Order_data) {
            return res.render('front/order_comfirm', { Order_data: null });
        }

        res.render('front/order_comfirm', { Order_data });
    } catch (error) {
        console.error('Error fetching order confirmation:', error);
        res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
};

