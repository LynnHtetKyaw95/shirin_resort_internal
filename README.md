# Shirin Hotel Admin System

A modern full-stack hotel management dashboard built with React and Supabase, designed for hotel staff to manage bookings, cabins, and daily operations efficiently.

## Why this project?

This project simulates a real-world hotel admin system, focusing on usability, scalability, and clean architecture.

## My Role

- Designed and built the full-stack application
- Implemented authentication and database schema
- Developed UI components and dashboard analytics

## Preview

<p align="center">
  <img src="public/screenshot/dashboard.PNG" width="45%" />
  <img src="public/screenshot/booking.PNG" width="45%" />
</p>

<p align="center">
  <img src="public/screenshot/cabin.png" width="45%" />
  <img src="public/screenshot/darkmode.png" width="45%" />
</p>

## Live Demo

- **Vercel Deployment**: [shirin-resort.vercel.app](https://vercel.com/your-username/shirin-resort)

## Technical Decisions

- Used **TanStack Query** for server state instead of Context for better caching and performance
- Chose **Supabase** to simplify backend development and focus on frontend architecture
- Implemented **feature-based architecture** for scalability and maintainability

## Features

### Authentication & User Management

- Secure login & signup
- Protected routes
- Profile & avatar management

### Cabin Management

- View all cabins in a comprehensive table format
- Display cabin photo, name, capacity, price, and current discount
- Create new cabins with image upload
- Update existing cabin information
- Delete cabins
- Search and filter capabilities

### Booking System

- Manage reservations with status tracking
- View detailed guest & booking info
- Filter by booking status

### Check-in / Check-out Operations

- One-click operations
- Payment confirmation
- Add breakfast services

### Dashboard

- Daily activity overview
- Sales & occupancy insights
- Charts for performance tracking

### Settings Management

- Configurable booking rules
- Breakfast pricing
- Guest limits

### UI/UX Features

- Dark mode
- Responsive design
- Toast notifications & modals
- Loading & error states

## Tech Stack

### Frontend

- **React 19**
- **Vite**
- **styled-components**
- **React Router v7**
- **TanStack React Query v5**
- **React Hook Form**
- **Recharts**
- **date-fns**
- **React Icons**
- **React Hot Toast**

### Backend & Database

- Supabase (Auth, DB, Storage)
- PostgreSQL

### Development Tools

- **ESLint** - Code linting
- **Pre-commit hooks** - Code quality enforcement

## Architecture & Structure

```
shirin_resort/
├── public/                  # Static assets
├── src/
│   ├── features/             # Feature-based modules
│   │   ├── authentication/   # Login, signup, user management
│   │   ├── bookings/         # Booking management
│   │   ├── cabins/          # Cabin CRUD operations
│   │   ├── check-in-out/    # Check-in/check-out functionality
│   │   ├── dashboard/       # Dashboard widgets and charts
│   │   └── settings/        # App settings management
│   ├── pages/               # Route page components
│   ├── services/            # API service functions
│   ├── hooks/               # Custom React hooks
│   ├── ui/                  # Reusable UI components
│   ├── contexts/            # React contexts (DarkMode)
│   ├── data/                # Mock data and seed data
│   ├── utils/               # Helper functions and constants
│   ├── styles/              # Global styles
│   ├── App.jsx              # Root component with routing
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

### Design Patterns

- **Feature-based Architecture**: Each feature (auth, bookings, cabins) is self-contained
- **Compound Component Pattern**: Reusable UI components (Button, Modal, Table)
- **Custom Hooks**: Encapsulated logic for data fetching and mutations
- **Protected Routes**: Authentication-based route guards
- **Context API**: Lightweight state management for theme

## Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)

### Clone the Repository

```bash
git clone https://github.com/LynnHtetKyaw95/Shirin_Resort
cd shirin-resort
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Future Improvements

- Guest management system
- Stripe payment integration
- Booking calendar view
- Guest self-service portal

## Highlights

- Real-world hotel workflow simulation
- Clean architecture (feature-based)
- Production-ready UI patterns
- Scalable state management

---

Built with React, Supabase, and modern web technologies.
