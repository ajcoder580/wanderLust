const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

main()
.then((res)=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderLust");
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
         owner:"67b6e9004e63af0e4cf29c82",
        })); 
     await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();