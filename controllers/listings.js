const Listing = require('../models/listing');

module.exports.index = async (req, res, next) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    console.log(req.user);
    res.render("listings/new.ejs");
   
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.Listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "Successfully made a new listing!");
    res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
         populate:{
            path:"author"
        }})
    .populate("owner");
    if(!listing){
        req.flash("error", "No listing Found");
        res.redirect("/listings");
    };
    res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res, next) => {
    let { id } = req.params;
     let listing = await Listing.findById(id);
     if(!listing){
        req.flash("error", "Listing you requested for doest not exist!" )
        res.redirect("/listings");
     }
     let originalImageUrl = listing.image.url;
    originalImageUrl= originalImageUrl.replace("/uploads", "/uploads/w_300, h_250");
          
    res.render("listings/edit.ejs", { Listing: listing , originalImageUrl});
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const updatedValue = await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    updatedValue.image = {url, filename};
    await updatedValue.save();
   }
    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    const item = await Listing.findByIdAndDelete(id);
    console.log(item);
    req.flash("success", "Successfully listing Deleted!");
    res.redirect("/listings");
};