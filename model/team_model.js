import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const teamschema=mongoose.Schema
    ({
        username:{
        type: String,
        required: true,
        },
        password:{
        type: String,
        required: true,
        },
       
})
teamschema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });
 export const Team=mongoose.model('Team',teamschema)