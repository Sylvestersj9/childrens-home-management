# GitHub Migration Guide for Children's Home Management System

This guide will help you migrate your project from Replit to GitHub and deploy it using Vercel.

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Git installed on your local machine
- Node.js and npm installed locally

## Step 1: Clone the Replit Project Locally
1. From your Replit project, use the "Download as ZIP" option or use Git to clone it:
   ```bash
   git clone https://github.com/replit/replit-project-name.git children-home-management
   cd children-home-management
   ```

## Step 2: Create a GitHub Repository
1. Go to GitHub and log in
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "children-home-management")
4. Add a description (e.g., "A comprehensive management system for children's homes and supported living facilities")
5. Keep the repository public or private as needed
6. Do not initialize with README, license, or .gitignore (you'll push your existing code)
7. Click "Create repository"

## Step 3: Push Your Code to GitHub
1. If you've downloaded the ZIP, initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Migration from Replit"
   ```

2. Add the GitHub repository as remote and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/children-home-management.git
   git push -u origin main
   ```

   If your main branch is called "master" instead of "main", use:
   ```bash
   git push -u origin master
   ```

## Step 4: Set Up Environment Variables
1. Create a `.env.local` file for local development based on the `.env.example` file
2. For production, go to your GitHub repository settings
3. Navigate to Secrets > Actions
4. Add the following repository secrets:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: A strong random string for encrypting sessions
   - `OPENAI_API_KEY`: Your OpenAI API key (if using AI features)
   - Any other environment variables used in your application

## Step 5: Configuring for Vercel Deployment
1. Ensure your project has a `vercel.json` file in the root directory
2. The file should already be configured with build settings and routes

## Step 6: Deploy to Vercel
1. Visit https://vercel.com and sign in with your GitHub account
2. Click "New Project" and import your GitHub repository
3. Configure the project settings:
   - Set the Framework Preset to "Other"
   - Set the Root Directory to "/"
   - Set the Build Command to `npm run build`
   - Set the Output Directory to "client/dist"
4. Add Environment Variables from Step 4
5. Click "Deploy"

## Step 7: Connect Your Custom Domain (Optional)
1. In your Vercel dashboard, select your project
2. Go to "Settings" > "Domains"
3. Add your custom domain and follow the verification instructions

## Troubleshooting

### API Endpoints Not Working
- Verify that your Vercel deployment is correctly set up with the API routes
- Check your browser console for CORS errors
- Ensure environment variables are correctly set in Vercel

### Database Connection Issues
- Confirm your PostgreSQL database is accessible from Vercel's servers
- Check that your DATABASE_URL environment variable is correctly formatted
- For local development vs production, use different database connections

### Ongoing Maintenance
- Set up GitHub Actions for continuous integration
- Consider implementing automated testing
- Regularly update dependencies to maintain security

## Additional Resources
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
