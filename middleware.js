 const Listing = require("./models/listing");
 const Review = require("./models/review");
 const { listingSchema, reviewSchema } = require('./schema.js');
 const ExpressError = require('./utils/ExpressError.js');

module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be signed in to create a new listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
       req.flash("error", "You are not authorized to do that!" )
      return res.redirect(`/listings/${id}`);
    }
    next();
   
};

module.exports.validatelisting = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};

module.exports.validateReview = (req, res, next) =>{
    let {error} = reviewSchema.validate(req.body);
    let errMsg = error.details.map((el)=>el.message).join(",");
    if(error){
        throw new ExpressError(400, errMsg);
    }else{
    next();
    }

};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;

    // Check if the user is logged in
    if (!res.locals.currUser) {
        req.flash("error", "You need to be logged in to do that!");
        return res.redirect("/login"); // Redirect to login page
    }

    let review = await Review.findById(reviewId);
    
    // Check if the review exists
    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }

    // Check if the logged-in user is the author of the review
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};
