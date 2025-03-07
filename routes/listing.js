const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing');
const {isLoggedIn, isOwner, validatelisting} = require('../middleware.js');

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage});


router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    
    upload.single('Listing[image]'),
    validatelisting,
    wrapAsync(listingController.createListing)
  );


// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isOwner,
  isLoggedIn,
  upload.single('Listing[image]'),
  validatelisting,
    wrapAsync(listingController.updateListing)
  )
.delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));


// Edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;
