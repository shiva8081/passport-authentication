import mongoose from "mongoose";


const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User=mongoose.model("User",user);
export default User;
