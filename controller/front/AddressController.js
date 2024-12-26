import { Address } from "../../model/address_model.js";

export const add_address=async(req,res)=>{
    try{
    const get_data=req.body
    const set_data=new Address(get_data);
    await set_data.save()
    res.redirect('/check_out')
    }
    catch (err) {
      console.error('Error:', err);
      return res.status(500).send('Internal Server Error');
    }
    }
    export const update_address=async(req,res)=>{
      const id=req.params.id
    try{
     const update_data=await Address.find({_id:id})
    
     res.render('front/update_address',{update_data})
    }
    catch (err) {
      console.error('Error:', err);
      return res.status(500).send('Internal Server Error');
    }
    }