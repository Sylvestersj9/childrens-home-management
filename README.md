# Children's Home and Supported Living Management System

A comprehensive management system for children's homes and supported living facilities designed to streamline resident care, staff operations, and administrative tasks.

## Features

- **Resident Management**: Track resident information, care plans, and daily activities
- **Staff Management**: Manage staff information, assignments, and schedules
- **Daily Logs**: Record and track daily activities, incidents, and observations
- **Incident Reporting**: Document incidents with AI-assisted suggestions
- **Document Storage**: Upload and organize important documents
- **Calendar & Scheduling**: Track appointments, activities, and important events
- **Reporting**: Generate reports for regulatory compliance and management

## Technology Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS, shadcn/ui, TanStack Query
- **Backend**: Node.js with Express, Drizzle ORM
- **Database**: PostgreSQL (configurable for different environments)
- **Authentication**: Passport.js with session-based authentication
- **AI Integration**: OpenAI for incident report assistance

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (optional, in-memory storage available for development)
- OpenAI API key (optional, for AI-powered features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/care-home-management.git
   cd care-home-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment setup:
   - Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database connection and other settings
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5000](http://localhost:5000) to view the application in your browser.

### Default Credentials

For local development, the following default accounts are created:
- Admin: username: `admin`, password: `admin123`
- Staff: username: `staff`, password: `staff123`

## Deployment

This application can be deployed on Vercel. See [vercel-deployment-guide.md](vercel-deployment-guide.md) for detailed instructions.

## Migration from Replit

If you're migrating this project from Replit to GitHub, see [github-migration-guide.md](github-migration-guide.md) for step-by-step instructions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.