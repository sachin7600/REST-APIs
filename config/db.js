const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`✅ DB connected successfully`);
    } catch (error) {
        console.error("❌ DB connection failed");
        process.exit(1);
    }
};

module.exports = dbConnect;
