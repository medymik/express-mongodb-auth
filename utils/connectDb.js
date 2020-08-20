const mongoose = require('mongoose');

const connectDb = async (mongoDbUrl) => {
    try {
        await mongoose.connect(mongoDbUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDb;