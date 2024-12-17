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