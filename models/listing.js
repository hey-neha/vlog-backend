const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title :{
     type: String,
     required:true,
    },
    description:String,
    imageURL:{ type:String,

      /* filename: { type: String },
      url: { type: String } */
  
    //  filename: {type: String},
    //  default:"http://thewowstyle.com/wp-content/uploads/2015/04/free-wallpaper-1.jpg",
    //  set:(v)=>v === "" ? "http://thewowstyle.com/wp-content/uploads/2015/04/free-wallpaper-1.jpg":v,
    },
    price:Number,
    location:String,
    country:String,
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;