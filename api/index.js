import app from '../backend/index.js';
import connectDB from '../backend/utils/db.js';

// Initialize database connection for serverless
let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        await connectDB();
        isConnected = true;
        console.log('New database connection established');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

// Vercel serverless function handler
export default async (req, res) => {
    // Connect to database before handling request
    await connectToDatabase();

    // Pass request to Express app
    return app(req, res);
};
