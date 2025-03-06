const express = require("express");
const router = express.Router();
const wrapAsync = require ("../utils/wrapAsync");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware");

const reviewsController = require("../controllers/reviews");





//Reviews
//post review route
router.post("/:id/reviews",
     isLoggedIn,
     wrapAsync(reviewsController.reviewPost));

//delete review route

router.delete("/:id/reviews/:reviewId",
    isReviewAuthor,
    isLoggedIn,
     wrapAsync(reviewsController.reviewDelete));

module.exports = router;
