import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - Origin: ${req.headers.origin}`);
    next();
});

// CORS configuration - updated to support production deployment
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL || true
        : ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;

// API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// Export app for Vercel serverless function
export default app;

// Server connection (only runs when executed directly, not in serverless)
if (process.env.NODE_ENV !== 'production') {
    const startServer = async () => {
        try {
            await connectDB(); // Connect to MongoDB Atlas
            app.listen(PORT, () => {
                console.log(`Server running at port ${PORT}`);
            });
        } catch (error) {
            console.error("Failed to start server:", error);
            process.exit(1);
        }
    };

    startServer();
}

