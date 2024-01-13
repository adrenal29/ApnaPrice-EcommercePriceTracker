import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    wishlist:{type:Array},
    isVendor:{type:Boolean}
})

const user=mongoose.models.User|| mongoose.model('User',userSchema)

export default user