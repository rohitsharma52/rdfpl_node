import { User } from "../../model/user_model.js";

export const login=(req,res)=>{
    res.render('front/user/login')
    } 
 export const register=(req,res)=>{
        res.render('front/user/register')
        } 
 export const new_user=async(req,res)=>{
            try{
            const get_data=req.body
            const set_data=new User(get_data)
            const response=await set_data.save();
            res.redirect('/login')
            
            }
            catch (err) {
              console.error('Error:', err);
              res.status(500).send('Internal Server Error');
            }
            }  
            export const check_user = async (req, res) => {
              const { email, password } = req.body;
            
              try {
                // Find user by email
                const user = await User.findOne({ email });
                if (!user) {
                  req.flash('error_msg', 'Email Not Found. Please Try Again.');
                  return res.status(401).json({ success: false, message: 'Email Not Found. Please Try Again.' });
                }
            
                // Compare password
                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                  req.flash('error_msg', 'Password Does Not Match. Please Try Again.');
                  return res.status(401).json({ success: false, message: 'Password Does Not Match. Please Try Again.' });
                }
            
                // Success
                res.cookie('userId', user._id, {
                  httpOnly: true,   // Security measure to prevent JS access
                  maxAge: 24 * 60 * 60 * 1000,  // Cookie expiration in milliseconds (1 day)
              });
            
                // Send userId in the response
                return res.json({
                  success: true,
                  userId: user._id.toString(), // Send userId as string (to avoid ObjectId format issues in frontend)
                });
              } catch (err) {
                console.error('Error:', err);
                return res.status(500).send('Internal Server Error');
              }
            };            