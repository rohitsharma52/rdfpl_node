import { Category } from "../../model/category_model.js";
import express from "express";
// CategoryController.js (ES Module)
export const add_category = (req, res) => {
    res.render('admin/category/add_category')
  };
  export const add_category_process = async (req, res) => {
    try {
      const get_data = req.body;
      const file = req.file; // Get the uploaded file
      console.log(file.path)
      if (file) {
        // If a file is uploaded, add the file path or URL to the data
        get_data.image = file.path; // Store the image path or file URL
      }
      const set_data = new Category(get_data);
   
      const response = await set_data.save();
  
      req.flash('success_msg', 'New Category Added Successfully');
      res.redirect('/auth/view_category');
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  };
  
export const view_category=async(req,res)=>{
  try{
  const category_data=await Category.find();
  res.render('admin/category/view_category',{category_data:category_data})
  }
  catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
}
export const delete_category=async(req,res)=>{
const id=req.params.id;
console.log(id)
try{
const response=await Category.findByIdAndDelete(id);
req.flash('success_msg',' Category Delete Successfull')
res.redirect('/auth/view_category');
}
catch (err) {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
}
}
export const update_category=async(req,res)=>{
  const id=req.params.id
try{
const update_data=await Category.findOne({_id:id});

res.render('admin/category/update_category',{update_data:update_data})
}
catch (err) {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
}
}
export const update_category_process = async (req, res) => {
  const id = req.params.id;
  try {
    const old_data = req.body;
    const file = req.file; // Get the uploaded file (if any)

    if (file) {
      // If a new file is uploaded, update the image field
      old_data.image = file.path; // Store the new image path
    }

    // Find and update the category by ID
    const response = await Category.findByIdAndUpdate(id, old_data, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the data follows schema validation rules
    });

    req.flash('success_msg', 'Category Updated Successfully');
    res.redirect('/auth/view_category');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
};


  