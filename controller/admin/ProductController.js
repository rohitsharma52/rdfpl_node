import { Category } from "../../model/category_model.js";
import { Product } from "../../model/product_model.js";
import { SubCategory } from "../../model/subcategory_model.js";

export const add_product=async(req,res)=>{
    try{
    const category_data=await Category.find();
    const subcategory_data=await SubCategory.find();  
    res.render('admin/product/add_product',{category_data})
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
      }
}
export let get_subcategories=async(req,res)=>{
let id=req.params.id;
try{
    const subcategories = await SubCategory.find({ category_id: id });
    res.json(subcategories);
}
catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
}
export let add_product_process = async (req, res) => {    
    try { 
      const { category_id, category_name, subcategory_id, subcategory_name, name, mrp, sellPrice, description, hsnCode, bestSeller, weeklyDeals, featuredProduct } = req.body;

      const featureImg = req.files.featureImg ? req.files.featureImg[0].path : ''; // Path to feature image
      const images = req.files.images ? req.files.images.map(file => file.path) : []; // Array of paths to other images
  
      // Create a new product instance
      const newProduct = new Product({
        category_id,           
        category_name,         
        subcategory_id,        
        subcategory_name,      
        name,
        mrp,
        sellPrice,
        description,
        hsnCode,
        featureImg,           
        images,                
        bestSeller: bestSeller === 'on', 
        weeklyDeals: weeklyDeals === 'on', 
        featuredProduct: featuredProduct === 'on', 
      });
  
      // Save the product in the database
      await newProduct.save();
  
      // Return success response
      res.redirect('/auth/view_product');
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
};
export let view_product=async(req,res)=>{
try{
const product_data=await Product.find();
res.render('admin/product/view_product',{product_data})
}
catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
}
export const delete_product = async (req, res) => {
  const id = req.params.id;
  try {
      const response = await Product.findByIdAndDelete(id);
      req.flash('success_msg', ' Product Delete Successfull')
      res.redirect('/auth/view_product');
  }
  catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
  }
}
