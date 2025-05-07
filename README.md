# BeeBank Frontend

This is the frontend application for BeeBank, a modern banking dashboard web application.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: Zustand (with persist middleware for auth)
- **Form Management**: React Hook Form with Zod validation
- **Toast Notifications**: Sonner

## Features

- User authentication (login)
- Dashboard with account listings
- Account details with transaction history
- Transaction filtering and sorting
- Add new transactions
- Responsive design (mobile-friendly)

## Project Structure

- `/app`: Next.js application routes
  - `/dashboard`: Main dashboard page
  - `/dashboard/account/[id]`: Account details page
  - `/login`: Authentication page
- `/components`: Reusable UI components
  - UI components from shadcn/ui
  - Custom components for the application
- `/lib`: Utility functions and stores
  - `/stores`: Zustand stores
    - `auth-store.ts`: Authentication state management
    - `bank-store.ts`: Banking data state management
  - `api.ts`: API service
  - `types.ts`: TypeScript type definitions
  - `utils.ts`: Utility functions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Start the development server:

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Connection

The frontend is configured to connect to the backend API using environment variables. By default, it will connect to `http://localhost:3001`. 

#### Environment Variables

You can customize the API URL by creating a `.env.local` file in the frontend directory:

```
NEXT_PUBLIC_API_URL=https://bank-back-lake.vercel.app
```

## Usage

### Login

Use the following demo credentials to log in:

- Username: `demo`
- Password: `password123`

### Dashboard

The dashboard displays all your bank accounts. Click on an account to view its details.

### Account Details

The account details page shows:
- Account summary with balance and statistics
- Transaction history
- Transaction filtering options
- Add new transaction form

## Benefits of Zustand

- Simple and unopinionated state management
- Minimal boilerplate compared to other solutions
- Easy integration with React hooks
- Built-in persistence (localStorage) for auth state
- Efficient re-rendering with automatic memoization
- TypeScript support out of the box

## Notes

This application is designed as a demonstration of frontend development skills and is not intended for production use with real financial data.

## Deployment

### Deploying to Vercel

This project is configured for easy deployment to Vercel. Follow these steps:

1. **Connect with Vercel**
   - Go to [Vercel](https://vercel.com) and sign in or create an account
   - Create a new project and import your GitHub repository

2. **Configure the project**
   - All necessary configuration is already included in `vercel.json`
   - The environment variables are pre-configured

3. **Deploy**
   - Click "Deploy" and Vercel will automatically build and deploy your application
   - Once deployed, you'll receive a URL for your live application

### Environment Variables

The deployment automatically uses the API endpoint: `https://bank-back-lake.vercel.app`
