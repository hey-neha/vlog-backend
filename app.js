const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const { render } = require("ejs");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
//for id ------------
 app.use(express.urlencoded({extended:true})); 
 app.use(methodOverride("_method"));


const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})
async function  main() {
    await mongoose.connect(MONGO_URL);
}


//Index Route------------------------------------------------------------------



app.get("/listings",async(req,res)=>{
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings});
});

//Show Route ------------------------------------------------------
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
   const listing = await Listing.findById(id);
   res.render("listings/show.ejs",{listing});
})

//new route ---------------------------------------------------------------

app.get("/listing/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//Create Route ----------------------------------------------------

app.post("/listings",async(req,res)=>{
    /* let {title,description,image,price,country,location} = req.params; */

   let newListing = new Listing(req.body.Listing);
   await newListing.save();
   res.redirect("/listings");
})


// Edit Route--------------------------------------------------------------------
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})


//Update Route -----------------------------------------------------------------------
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
   res.redirect("/listings");

})


//Delete Route ------------------------------------------------------

app.delete("/listings/:id",async(req,res)=>{
    let {id} = req,params;
   let deleteListing = await Listing.findByIdAndDelete(id);
   console.log(deleteListing);
   res.redirect("/listings");
})





// app.get("/testlisting",async(req,res)=>{
//    let sampleListing = new Listing({
//         title : "My New Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calamgute,Goa",
//         country:"India",
//    })
//    await sampleListing.save();
//    console.log("sample was saved!!");
//    res.send("successful testing");
// });

app.get("/",(req,res)=>{
    res.send("Hi,I am root");
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});


