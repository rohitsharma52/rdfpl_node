import { Varient } from "../../model/varient_model.js";
export const add_varient=async(req,res)=>{
 let product_id=req.params.id
try{
res.render('admin/varient/add_varient',{product_id})
}
catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send({ message: 'Failed to update product', error });
}
}
export const add_varient_process=async(req,res)=>{
try{
 console.log('this code is working')   
const get_data=req.body;
console.log(get_data);

const set_data=new Varient(get_data);
let response =await set_data.save();
req.flash('success_msg', ' Varient Added Successfull')
res.redirect('/auth/view_varient');

}
catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send({ message: 'Failed to update product', error });
}
}
 export const view_varient=async(req,res)=>{
try{
    const varient_data = await Varient.find().populate('product_id', 'name');   
    res.render('admin/varient/view_varient',{varient_data})
}
catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send({ message: 'Failed to update product', error });
}
}
export const delete_varient = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Varient.findByIdAndDelete(id);
        req.flash('success_msg', ' Varient Delete Successfull')
        res.redirect('/auth/view_varient');
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
}
export const update_varient = async (req, res) => {
    const id = req.params.id
    try {
        const update_data = await Varient.findOne({ _id: id });

        res.render('admin/varient/update_varient', { update_data: update_data })
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
}
export const update_varient_process = async (req, res) => {
    const id = req.params.id;
    try {
        const old_data = req.body;
        const response = await Varient.findByIdAndUpdate(id, old_data, {
            new: true,
            runValidators: true,
        })
        req.flash('success_msg', '  Varient Update Successfull')
        res.redirect('/auth/view_varient');

    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
}