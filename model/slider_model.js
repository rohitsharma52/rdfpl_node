import mongoose from "mongoose";
const sliderschema=mongoose.Schema
    ({
        name:{
        type: String,
        required: true,
        },
        nav_1:{
        type: String,
        required: true,
        },
        nav_1_link:{
        type: String,
        required: true,
        },
        nav_2:{
        type: String,
        default:null,
        }, 
        nav_2_link:{
        type: String,
        default:null,
        },
})
 export const Slider=mongoose.model('Slider',sliderschema)