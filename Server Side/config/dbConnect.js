const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        mongoose.set('strictQuery', false);
        const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
        const connected = await mongoose.connect(DB);
        console.log(`MongoDB connected succesfully!`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = dbConnect;