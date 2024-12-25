import { Slider } from "../../model/slider_model.js";
import { Team } from "../../model/team_model.js";

export let home=(req,res)=>{
    res.render('admin/home')
};
export let add_slider=(req,res)=>{
    res.render('admin/slider/add_slider')
};
export let add_slider_process=async(req,res)=>{
    try {
        const get_data = req.body;
        const set_data = new Slider(get_data);
        await set_data.save();
        req.flash('success_msg','Slider Added Successfull')
        res.redirect('/auth');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
}
export let add_team=(req,res)=>{
    res.render('admin/team/add_team')
}
export let add_team_process=async()=>{
    try{
        let get_data=req.body;
        let set_data=new Team(get_data);
        await set_data.save();
        req.flash('success_msg','Team Member Added Successfull')
        res.redirect('/auth/')
        }
        catch (err) {
            console.error('Error:', err);
            res.status(500).send('Internal Server Error');
        }
}