const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db.config');

const mailRouter = require('./routes/email.routes');
const userRouter = require('./routes/user.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true  
}));

// Connect to Database
(async () => {
    try {
        await connectDb();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Stop server if DB connection fails
    }
})();

// Routes
app.use('/mail', mailRouter);  // Changed to `/mail` for clarity
app.use('/user', userRouter);

// Global Error Handler (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
