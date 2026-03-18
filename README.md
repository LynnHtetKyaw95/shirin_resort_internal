## Project requirements from the business

### Authentication

👉 Users of app are hotel employees. They need to logged into the application to perform tasks.
👉 New users can only be signed up inside the applications (to guarantee that only actual hotel employees can get accounts)
👉 Users should be able to upload an avatar, and change their name and password

### Cabins

👉 App needs a table view with all cabins, showing the cabin photo, name, capacity, price and current discount
👉 Users should be able to update or delete a cabin, and to create new cabins (including uploading a photo)

### Bookings

👉 Apps needs a table view with all bookings, showing arrival and departure dates, status, and paid amount, as well as cabin and guest data
👉 The booking status can be "unconfirmed" (booked not yet checked in), "checked in", or "checked out". The table should be filterable by this important status
👉 Other booking data includes: number of guests, number of nights, guest observations, whether they booked breakfast, breakfast price

### Check in/ out

👉 Users should be able to delete, check in, or check out a booking as the agent arrives (no editing necessary for now)
👉 Bookings may not have been paid yet on guest arrival. Therefore, on check in, users need to accept payment (outside the app), and then confirm that payment has been received (inside the app)
👉 On check in, the guest should have the ability to add breakfast for the entire stay, if they hadn't already

### Guests

👉 Guest data should contain: full name, email, national ID, nationality,and a country flag for easy identification

### Dashboard

👉 The initial app screen should be a dashboard, to display important information for the last 7, 30 or 90 days:
👉 A list of guests checking in and out on the current day. Users should be able to perform these tasks from here
👉 Statistics on recent bookings, sales, check ins, and occupancy rate
👉 A chart showing all daily hotel sales, showing both "total" sales and "extra" sales (only breakfast at the moment)
👉 A chart showing statistics on stay durations, as this is an important metric for the hotel

### Settings

👉 Users should be able to define a few application-wide settings: breakfast price, min and max nights/booking, max guests/booking
👉 App needs a dark mode

## Technology Decisions

| Features                   | Library                                 | Why use                                                                                                                                                                                  |
| -------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 👉 Routing                 | React Router                            | The standard for React SPAs                                                                                                                                                              |
| 👉 Styling                 | styled components                       | Very popular way of writing component-scoped CSS, right inside JS                                                                                                                        |
| 👉 Remote state management | React Query                             | The best way of managing remote, with features like caching, automatic re-fetching, pre-fetching, offline support, etc. Alternatives are SWR and RTK Query, but this is the most popular |
| 👉 UI State Management     | Context API, Compound Component Pattern | There is almost no UI state needed in this app, so one simple context with useState will be enough. No need for Redux                                                                    |
| 👉 Form management         | React Hook Form                         | Handling bigger forms can be a lot of work, such as manual state creation and error handling. A library can simplify all this                                                            |
| 👉 Other tools             |                                         | React icons/ React hot toast/ Recharts/ date-fns/ Supabase                                                                                                                               |
