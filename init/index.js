require("dotenv").config({ path: "../.env" });


const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data");

const dbUrl = process.env.ATLASDB_URL;
console.log("DB URL:", dbUrl); // Debugging

async function main() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
        console.log("Connected to DB");
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        console.log("Old data deleted");

        initData.data = initData.data.map((obj) => ({
            ...obj,
            owner: "67c93b49427ea61b2e02bd64",
        }));

        await Listing.insertMany(initData.data);
        console.log("Data initialized");
    } catch (err) {
        console.error("Data Initialization Error:", err);
    }
};

main().then(() => initDB());
