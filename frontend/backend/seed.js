const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, ".env")
});

console.log("MONGO_URI:", process.env.MONGO_URI);


const mongoose = require("mongoose");
const { EJSON } = require("bson");
const fs = require("fs");


const collections = [
    "admins",
    "categories",
    "colors",
    "products",
    "users",
    "carts",
    "orders",
    "wishlists"
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB connected");

        // Get the database
        const db = mongoose.connection.db;

        // Seed every collection
        for (const collectionName of collections) {
            const filePath = path.join(
                __dirname,
                "seed",
                `${collectionName}.json`
            );

            // Check if JSON file exists
            if (!fs.existsSync(filePath)) {
                console.log(`⚠️ ${collectionName}.json not found`);
                continue;
            }

            // Read JSON file
            const fileData = fs.readFileSync(filePath, "utf-8");

            // Convert MongoDB Extended JSON
            const data = EJSON.parse(fileData);

            // Clear existing collection
            await db.collection(collectionName).deleteMany({});

            // Insert data
            if (Array.isArray(data) && data.length > 0) {
                await db.collection(collectionName).insertMany(data);

                console.log(
                    `✅ ${collectionName}: ${data.length} documents inserted`
                );
            } else {
                console.log(`⚠️ ${collectionName}: No documents found`);
            }
        }

        console.log("\n🎉 Database seeded successfully!");

    } catch (error) {
        console.error("❌ Seeding failed:");
        console.error(error);

    } finally {
        await mongoose.connection.close();
        console.log("🔌 MongoDB connection closed");
    }
};

seedDatabase();