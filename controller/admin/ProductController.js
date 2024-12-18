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
        description,        
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
  try {
    // Get page and limit from query parameters (default values: page=1, limit=15)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Get total count of products for pagination info
    const totalProducts = await Product.countDocuments();

    // Fetch the products with pagination
    const product_data = await Product.find()
        .skip(skip)
        .limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);

    // Render the view with products, current page, and total pages
    res.render('admin/product/view_product', {
        product_data,
        currentPage: page,
        totalPages,
    });
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
export const update_product=async(req,res)=>{
  const id=req.params.id
try{
const update_data=await Product.findOne({_id:id});

res.render('admin/product/update_product',{update_data:update_data})
}
catch (err) {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
}
}


export const update_product_process = async (req, res) => {
  try {
    const productId = req.params.id;

    // Extract text fields from the form
    const {
      name,  
      description,
      bestSeller,
      weeklyDeals,
      featuredProduct
    } = req.body;

    // Fetch existing product from the database to get old images
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).send({ message: 'Product not found' });
    }

    // Prepare the updated data
    const updatedData = {
      name,
      description,
      bestSeller: bestSeller === 'on', // Convert "on" to boolean
      weeklyDeals: weeklyDeals === 'on',
      featuredProduct: featuredProduct === 'on',
    };

    // Check if new feature image is uploaded, else retain old image
    if (req.files && req.files.featureImg) {
      updatedData.featureImg = req.files.featureImg[0].path; // New feature image path
    } else {
      updatedData.featureImg = existingProduct.featureImg; // Retain old feature image
    }

    // Check if new images are uploaded, else retain old images
    if (req.files && req.files.images) {
      updatedData.images = req.files.images.map(file => file.path); // New images array
    } else {
      updatedData.images = existingProduct.images; // Retain old images
    }

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updatedData },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: 'Failed to update product' });
    }

    // Redirect or send response on success
    req.flash('success_msg', 'Product Update Successful');
    res.redirect('/auth/view_product');

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send({ message: 'Failed to update product', error });
  }
};

// ProductController.js
export let search_product = async (req, res) => {
  try {
      const searchQuery = req.query.search;
      if (!searchQuery) {
          return res.status(400).json({ error: 'Search query is required' });
      }

      // Case-insensitive search
      const products = await Product.find({
          name: { $regex: searchQuery, $options: 'i' },
      });

      res.json(products);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
};

