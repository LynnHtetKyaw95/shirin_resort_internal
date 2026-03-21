# Shirin Hotel Management System

A full-stack resort booking web application built with React and Supabase that allows hotel employees to browse rooms, manage reservations, handle check-in/check-out operations, and track hotel performance with a modern dashboard.

## Preview

![Dashboard Preview](https://via.placeholder.com/1200x600/4f46e5/ffffff?text=Dashboard+Overview)
![Bookings Management](https://via.placeholder.com/1200x600/059669/ffffff?text=Bookings+Management)
![Cabin Management](https://via.placeholder.com/1200x600/dc2626/ffffff?text=Cabin+Management)
![Dark Mode](https://via.placeholder.com/1200x600/1f2937/f9fafb?text=Dark+Mode+Interface)

## Live Demo

- **Vercel Deployment**: [shirin-resort.vercel.app](https://vercel.com/your-username/shirin-resort)

## Features

### Authentication & User Management

- Secure login and signup system for hotel employees
- Avatar upload functionality
- Profile management (name, password updates)
- Protected routes for authenticated users only

### Cabin Management

- View all cabins in a comprehensive table format
- Display cabin photo, name, capacity, price, and current discount
- Create new cabins with image upload
- Update existing cabin information
- Delete cabins
- Search and filter capabilities

### Booking System

- Table view with all bookings displaying:
  - Arrival and departure dates
  - Booking status (unconfirmed, checked in, checked out)
  - Paid amount
  - Cabin and guest information
- Filter bookings by status
- Detailed booking view with all guest information
- Guest data includes: full name, email, national ID, nationality, and country flag

### Check-in / Check-out Operations

- One-click check-in functionality
- One-click check-out functionality
- Payment confirmation on check-in (for unpaid bookings)
- Add breakfast for entire stay during check-in
- Delete bookings
- Today's activity overview

### Dashboard

- **Today's Activity**: List of guests checking in and out on current day
- **Statistics**: Recent bookings, sales, check-ins, and occupancy rate
- **Sales Chart**: Daily hotel sales visualization (total sales and extra sales/breakfast)
- **Duration Chart**: Stay duration statistics
- **Flexible Time Periods**: Filter data for last 7, 30, or 90 days

### Settings Management

- Configure breakfast price
- Set minimum and maximum nights per booking
- Set maximum guests per booking
- App-wide configuration

### UI/UX Features

- Dark mode toggle (persisted preference)
- Responsive design
- Loading states and error handling
- Toast notifications
- Modal dialogs for confirmations
- Pagination for large datasets

## Tech Stack

### Frontend

- **React 19** - Modern React with concurrent features
- **Vite** - Fast build tool and dev server
- **styled-components** - CSS-in-JS styling with theme support
- **React Router v7** - Client-side routing
- **TanStack React Query v5** - Server state management and caching
- **React Hook Form** - Form handling and validation
- **Recharts** - Data visualization and charts
- **date-fns** - Date manipulation
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications

### Backend & Database

- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - File storage for images
  - Row-level security

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
git clone https://github.com/your-username/shirin-resort.git
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

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Create the following tables in your Supabase SQL Editor:

```sql
-- Cabins table
create table cabins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  max_capacity integer not null,
  regular_price integer not null,
  discount integer default 0,
  description text,
  image text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Bookings table
create table bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  start_date date not null,
  end_date date not null,
  num_nights integer not null,
  num_guests integer not null,
  cabin_price integer not null,
  extras_price integer default 0,
  total_price integer not null,
  status text not null default 'unconfirmed',
  has_breakfast boolean default false,
  is_paid boolean default false,
  observations text,
  cabin_id uuid references cabins(id),
  guest_id uuid references guests(id)
);

-- Guests table
create table guests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  national_id text,
  nationality text,
  country_flag text,
  created_at timestamp with time zone default now()
);

-- Settings table
create table settings (
  id uuid primary key default gen_random_uuid(),
  min_booking_length integer default 1,
  max_booking_length integer default 30,
  max_guests_per_booking integer default 10,
  breakfast_price integer default 15
);

-- Profiles table (for authenticated users)
create table profiles (
  id uuid primary key references auth.users,
  email text,
  full_name text,
  avatar_url text,
  password_changed_at timestamp with time zone default now()
);
```

3. Enable **Row Level Security (RLS)** on all tables

4. Set up **Storage** bucket named `cabin-images` with public access

### Run the Application

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Learning & Learnings

### Key Concepts Mastered

1. **React Query (TanStack Query)**
   - Server state management with caching
   - Mutations for create/update/delete operations
   - Query invalidation for data synchronization
   - Optimistic updates

2. **React Router v7**
   - Nested routing with `Outlet`
   - Protected routes with authentication
   - URL parameters and navigation
   - Programmatic navigation

3. **styled-components**
   - CSS-in-JS with themeable design
   - Global styles with `createGlobalStyle`
   - Dynamic styling with props
   - Component composition

4. **Supabase Integration**
   - Authentication flow
   - Database operations with joins
   - File storage for images
   - Real-time subscriptions

5. **Form Handling**
   - React Hook Form integration
   - Validation patterns
   - Error handling
   - File upload forms

6. **UI/UX Patterns**
   - Compound components
   - Modal and menu systems
   - Toast notifications
   - Loading and error states
   - Empty states

7. **React Patterns**
   - Custom hooks for logic reuse
   - Context for theme management
   - Conditional rendering
   - Component composition

## Future Improvements

### High Priority

- [ ] **Email Notifications**: Send confirmation emails on booking creation
- [ ] **Payment Integration**: Stripe integration for online payments
- [ ] **Calendar View**: Visual booking calendar for cabins
- [ ] **Guest Portal**: Separate interface for guests to manage their bookings

### Medium Priority

- [ ] **Multi-language Support**: i18n for international guests
- [ ] **Export Features**: Export bookings to CSV/Excel
- [ ] **Advanced Search**: Full-text search for bookings and cabins
- [ ] **Audit Logs**: Track all changes made by users

### Lower Priority

- [ ] **Mobile App**: React Native version for staff mobile access
- [ ] **Analytics Dashboard**: More detailed charts and insights
- [ ] **Kitchen Management**: Breakfast and meal tracking
- [ ] **Housekeeping**: Room cleaning status and scheduling
- [ ] **Maintenance Tracking**: Equipment and facility maintenance

### Nice to Have

- [ ] **Dark Mode Persistence**: Save preference to user profile
- [ ] **Keyboard Shortcuts**: Power user shortcuts for common actions
- [ ] **Drag & Drop**: Reorder cabins or booking priorities
- [ ] **Print Views**: Optimized print layouts for receipts/reports

---

Built with React, Supabase, and modern web technologies.
