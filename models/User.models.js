import mongoose from "mongoose";

import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Todo",
        required:true,
    }
  ]
});

// userSchema.pre("save",async function (next) {
//   if(!User.isModified) return next();
//   let salt = await bcrypt.genSalt(10);
//   let hash =await bcrypt.hash(User.password,salt);
//   User.password = hash;
//   next();
// })


userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
} 

export const User = mongoose.model("User", userSchema);
