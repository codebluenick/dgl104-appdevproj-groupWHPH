const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001; // Port defined in .env

// Connect to MongoDB, uri stored in .env
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to the Database !!!")
    app.listen(port, () => {
        console.log(`Server running on port ${port}`); // Run server after connection with the database 
    });
})

.catch((error) => {
    console.log("Connection failed:", error);
});
