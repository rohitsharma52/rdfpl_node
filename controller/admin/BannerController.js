
import express from "express";
import { Banner } from "../../model/banner_model.js";
// CategoryController.js (ES Module)


export const add_banner = (req, res) => {
    res.render('admin/banner/add_banner')
  };
  export const add_banner_process = async (req, res) => {
    try {
      const get_data = req.body;
      console.log(get_data)
      const file = req.file; // Get the uploaded file
    
      if (file) {
        // If a file is uploaded, add the file path or URL to the data
        get_data.image = file.path; // Store the image path or file URL
      }
      const set_data = new Banner(get_data);
   
      const response = await set_data.save();
  
      req.flash('success_msg', 'New Banner Added Successfully');
      res.redirect('/auth/view_banner');
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
    }
  };
  
export const view_banner=async(req,res)=>{
  try{
  const banner_data=await Banner.find();
  res.render('admin/banner/view_banner',{banner_data:banner_data})
  }
  catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
}
export const delete_banner=async(req,res)=>{
const id=req.params.id;
try{
const response=await Banner.findByIdAndDelete(id);
req.flash('success_msg',' Banner Delete Successfull')
res.redirect('/auth/view_banner');
}
catch (err) {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
}
}
export const update_banner=async(req,res)=>{
  const id=req.params.id
try{
const update_data=await Banner.findOne({_id:id});

res.render('admin/banner/update_banner',{update_data:update_data})
}
catch (err) {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
}
}
export const update_banner_process = async (req, res) => {
  const id = req.params.id;
  try {
    const old_data = req.body;
    const file = req.file; // Get the uploaded file (if any)

    if (file) {
      // If a new file is uploaded, update the image field
      old_data.image = file.path; // Store the new image path
    }

    // Find and update the category by ID
    const response = await Banner.findByIdAndUpdate(id, old_data, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the data follows schema validation rules
    });

    req.flash('success_msg', 'Banner Updated Successfully');
    res.redirect('/auth/view_banner');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
};


  