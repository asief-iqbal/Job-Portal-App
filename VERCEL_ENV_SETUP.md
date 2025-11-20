# Environment Variables Configuration for Vercel

Before deploying, set these environment variables in your Vercel project settings:

## Required Variables

### Database
- `MONGO_URI` - Your MongoDB connection string

### Authentication
- `SECRET_KEY` - JWT secret key for authentication

### Cloudinary (Image Upload)
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

### Node Environment
- `NODE_ENV` - Set to `production`

### Optional (for CORS)
- `FRONTEND_URL` - Your Vercel frontend URL (e.g., https://your-app.vercel.app)

## How to Set Environment Variables

### Via Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable with its value
4. Make sure to select "Production", "Preview", and "Development" as needed

### Via Vercel CLI:
```bash
vercel env add MONGO_URI production
vercel env add SECRET_KEY production
# ... etc
```

## Local Development

For local development, keep using your `backend/.env` file as usual.
