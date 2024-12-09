import { Banner } from "../../model/banner_model.js"
import { Category } from "../../model/category_model.js";

export let home = async (req, res) => {
    try {
    
      const banner_data = await Banner.find();
      const category_data= await Category.find();
      res.render('front/index', { banner_data });
    } catch (error) {
      console.error('Error fetching banners:', error);
      res.status(500).send('Internal Server Error');
    }
  };