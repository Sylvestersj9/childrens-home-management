# Vercel Deployment Guide for Children's Home Management Software

This guide explains how to deploy this full-stack application (React frontend + Express backend) to Vercel.

## Project Structure

Our application uses:
- Frontend: React with Vite in the `client` directory
- Backend: Express.js API in the `server` directory
- Database: PostgreSQL (requires configuration on Vercel)

## Preparing for Deployment

### 1. Set Up Environment Variables

When deploying to Vercel, you'll need to set up the following environment variables:

- `DATABASE_URL`: Your PostgreSQL connection string
- `SESSION_SECRET`: Secret for session management
- `NODE_ENV`: Set to `production`
- `OPENAI_API_KEY`: If using AI features

### 2. Serverless Functions Configuration

The `api` directory contains the entry point for Vercel serverless functions. This is different from the development server configuration.

## Deployment Steps

1. **Push to GitHub**
   - Make sure your code is in a GitHub repository

2. **Create a Vercel Project**
   - Go to [vercel.com](https://vercel.com) and sign up/log in
   - Connect your GitHub account
   - Import your repository

3. **Configure Build Settings**
   - Set the build command to: `npm run build`
   - Set the output directory to: `client/dist`
   - Set the install command to: `npm install`

4. **Configure Environment Variables**
   - Add all the required environment variables mentioned above
   - Ensure your database connection string is correctly set

5. **Deploy**
   - Click "Deploy" and wait for the build to complete
This guide explains how to deploy this full-stack application (React frontend + Express backend) to Vercel.

## Project Structure

Our application uses:
- Frontend: React with Vite in the `client` directory
- Backend: Express.js API in the `server` directory
- Database: PostgreSQL (requires configuration on Vercel)

## Preparing for Deployment

### 1. Set Up Environment Variables

When deploying to Vercel, you'll need to set up the following environment variables:

- `DATABASE_URL`: Your PostgreSQL connection string
- `SESSION_SECRET`: Secret for session management
- `NODE_ENV`: Set to `production`
- `OPENAI_API_KEY`: If using AI features

### 2. Serverless Functions Configuration

The `api` directory contains the entry point for Vercel serverless functions. This is different from the development server configuration.

## Troubleshooting

If your application doesn't work correctly after deployment, check these common issues:

### API Endpoints Not Working

Vercel handles Express apps differently from traditional hosting. Make sure:

1. Your API routes are using the serverless function format in the `api` directory
2. The frontend is correctly calling API endpoints (check for CORS issues)
3. The database connection is working

### Database Connection Issues

1. Make sure your PostgreSQL database is accessible from Vercel's servers
2. Check that your connection string is correctly set in environment variables
3. For local development vs production, use different database connections

### Session Management

1. Session management is different in serverless environments
2. Consider using a stateless authentication method like JWT tokens for Vercel deployment

## Local vs. Production API URLs

To handle different API URLs between local development and production:

1. Create a `.env.local` file with `VITE_API_URL=http://localhost:5000` for local development
2. In production, the API URL will be the same as your Vercel deployment URL

## Monitoring

After deployment, monitor your application using:

1. Vercel's built-in logs and analytics
2. Set up error tracking with a service like Sentry
