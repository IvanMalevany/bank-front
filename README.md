# BeeBank Frontend

This is the frontend application for BeeBank, a modern banking dashboard web application.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Form Management**: React forms with validation
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
- `/lib`: Utility functions and app-wide providers
  - API Service
  - Auth Context
  - Bank Context
  - TypeScript type definitions
  - Utility functions

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

The frontend is configured to connect to the backend API at `http://localhost:3001`. Make sure the backend server is running before using the application.

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

## Assumptions and Tradeoffs

- Used React Context for state management instead of more complex solutions like Redux
- Authentication is handled with a simple token-based approach (JWT)
- Used basic form validation for simplicity
- Leveraged shadcn/ui components for faster development and better consistency

## Notes

This application is designed as a demonstration of frontend development skills and is not intended for production use with real financial data.
