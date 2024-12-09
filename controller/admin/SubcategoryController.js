import { Category } from "../../model/category_model.js";
import { SubCategory } from "../../model/subcategory_model.js";
import express from "express";


// CategoryController.js (ES Module)

export const add_subcategory = async (req, res) => {
    try {
        const category_data=await Category.find();
        res.render('admin/subcategory/add_subcategory',{category_data:category_data})
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
};
export const add_subcategory_process = async (req, res) => {
    try {
        const get_data = req.body;
        const set_data = new SubCategory(get_data)
        const response = await set_data.save();
        req.flash('success_msg', 'New SubCategory Added Successfull')
        res.redirect('/auth/view_subcategory');

    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
}
export const view_subcategory = async (req, res) => {
    try {
        const table_data = await SubCategory.find();
        res.render('admin/subcategory/view_subcategory', { table_data: table_data })
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
}
export const delete_subcategory = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await SubCategory.findByIdAndDelete(id);
        req.flash('success_msg', ' SubCategory Delete Successfull')
        res.redirect('/auth/view_subcategory');
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
}
export const update_subcategory = async (req, res) => {
    const id = req.params.id
    try {
        const update_data = await SubCategory.findOne({ _id: id });

        res.render('admin/subcategory/update_subcategory', { update_data: update_data })
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
}
export const update_subcategory_process = async (req, res) => {
    const id = req.params.id;
    try {
        const old_data = req.body;
        const response = await SubCategory.findByIdAndUpdate(id, old_data, {
            new: true,
            runValidators: true,
        })
        req.flash('success_msg', ' Category Delete Successfull')
        res.redirect('/auth/view_subcategory');

    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
}

