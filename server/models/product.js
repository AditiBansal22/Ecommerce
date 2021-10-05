const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const productSchema =  new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required:true,
        maxlength:32,
        text:true
    },
    slug: {
        type: String,
        unique:true,
        maxlength:32,
        lowercase:true,
        index:true,
        text:true
    },
    description: {
        type: String,
        required:true,
        maxlength:2000,
        text:true
    },
    price: {
        type: String,
        required:true,
        trim:true,
        maxlength:32
    },
    subs:[{
        type: ObjectId,
        ref:"Sub"
    }],
    category: {
        type: ObjectId,
        ref: "Category",
    },
    quantity: Number,
    sold: {
        type:Number,
        default:0
    },
    images: {
        type: Array
    },
    shipping: {
        type:String,
        enum:['Yes','No'],
    },
    color: {
        type:String,
        enum: ["Black", "Brown","White","Blue"],
    },
    brand: {
        type:String,
        enum: ["Apple", "Lenovo","Samsung","Microsoft","ASUS"],
    },
    // ratings:[
    //     {
    //         star:Number,
    //         postedBy: {type: ObjectId, ref: 'User'},
    //     }
    // ]
},{timestamps: true})

module.exports = mongoose.model('Product',productSchema);