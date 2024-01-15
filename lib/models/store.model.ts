import mongoose from "mongoose";

const storeSchema=new mongoose.Schema({
    storeOwner:{type:String},
    storeName:{type:String},
    storeAddress:{type:String},
    storeBanner:{type:String},
    storeLayout:{type:String},
    storeCategory:{type:String},
    storeProducts:{type:Array},
})

const store=mongoose.models.store|| mongoose.model('store',storeSchema)

export default store