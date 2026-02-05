# Appointment Booking System

A comprehensive web application for booking appointments between customers and service providers, built with React frontend and Node.js/Express backend.

## 📋 Features

### Customer Features
- **User Registration & Login** - Create account as customer or provider
- **Browse Services** - View available services with descriptions and duration
- **Book Appointments** - Select available time slots and book appointments
- **My Appointments** - View upcoming and past appointments with status tracking
- **Professional UI** - Modern, responsive design matching healthcare standards

### Provider Features
- **Provider Dashboard** - Comprehensive management interface
- **Service Management** - Create, view, and delete services (CRUD operations)
- **Time Slot Management** - Create available time slots for bookings
- **Appointment Management** - View, accept, or reject appointment requests
- **Real-time Status Updates** - Track appointment statuses and manage availability

### System Features
- **Double Booking Prevention** - System prevents conflicting appointments
- **Role-based Access Control** - Separate interfaces for customers and providers
- **Real-time Availability** - Accurate display of available time slots
- **Responsive Design** - Works on desktop and mobile devices
- **Professional Authentication** - Secure JWT-based authentication

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for secure user sessions
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

### Frontend  
- **React 19** with modern hooks
- **React Router Dom** for navigation
- **Axios** for API communication
- **Modern CSS** with responsive design
- **Custom Components** for reusable UI elements

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Services Endpoints
- `GET /api/services` - Get all services
- `GET /api/services/my` - Get provider's services (Provider only)
- `POST /api/services` - Create new service (Provider only)
- `DELETE /api/services/:id` - Delete service (Provider only)

### Slots Endpoints
- `GET /api/slots/:serviceId` - Get available slots for service
- `GET /api/slots/my` - Get provider's slots (Provider only)
- `POST /api/slots` - Create new slot (Provider only)
- `DELETE /api/slots/:id` - Delete slot (Provider only)

### Appointments Endpoints
- `POST /api/appointments` - Book appointment (Customer only)
- `GET /api/appointments/my` - Get customer's appointments
- `GET /api/appointments/provider` - Get provider's appointments (Provider only)
- `PATCH /api/appointments/:id` - Update appointment status (Provider only)

## 🎯 User Flow

### Customer Journey
1. **Registration/Login** - Create account or sign in
2. **Browse Services** - View available healthcare services
3. **Select Service** - Choose desired service
4. **Pick Date & Time** - Select from available slots
5. **Confirm Booking** - Submit appointment request
6. **Track Status** - Monitor appointment status (pending/confirmed/cancelled)

### Provider Journey  
1. **Registration/Login** - Create provider account
2. **Create Services** - Add services with descriptions and duration
3. **Set Availability** - Create time slots for bookings
4. **Manage Requests** - Accept or reject appointment requests
5. **View Schedule** - Monitor all appointments and availability

## 🏗 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (customer/provider, required),
  timestamps: true
}
```

### Service Model
```javascript
{
  name: String (required),
  description: String,
  duration: Number (minutes),
  provider: ObjectId (ref: User)
}
```

### Slot Model
```javascript
{
  provider: ObjectId (ref: User, required),
  service: ObjectId (ref: Service, required),
  date: Date (required),
  startTime: String (required),
  endTime: String (required),
  isBooked: Boolean (default: false)
}
```

### Appointment Model
```javascript
{
  customer: ObjectId (ref: User, required),
  provider: ObjectId (ref: User, required),
  service: ObjectId (ref: Service),
  slot: ObjectId (ref: Slot),
  status: String (pending/confirmed/cancelled, default: pending),
  timestamps: true
}
```

## 🧪 Testing Guide

### Manual Testing Steps

1. **Test Provider Registration**
   - Go to `/register`
   - Register as Healthcare Provider
   - Verify redirect to provider dashboard

2. **Test Service Creation**
   - In provider dashboard, click "Add Service"
   - Create a service (e.g., "General Checkup", 30 min duration)
   - Verify service appears in "My Services" list

3. **Test Slot Creation**
   - Go to "Time Slots" tab
   - Click "Add Time Slot"
   - Select the created service, future date, and time range
   - Verify slot appears with "Available" status

4. **Test Customer Registration**  
   - Logout and register as Patient/Customer
   - Verify redirect to services page

5. **Test Service Booking**
   - Browse available services
   - Click "Book Appointment" on created service
   - Select available time slot
   - Confirm booking and verify redirect to "My Appointments"

6. **Test Appointment Management**
   - Check customer's appointment shows "pending" status
   - Login as provider
   - Go to "Appointments" tab
   - Accept the appointment request
   - Verify status changes to "confirmed"

## 🔒 Security Features

- **Password Security** - Passwords hashed with bcrypt
- **JWT Authentication** - Secure token-based authentication  
- **Role-based Authorization** - Route protection based on user roles
- **Input Validation** - Server-side validation for all inputs
- **CORS Configuration** - Proper cross-origin resource sharing setup

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (1200px+) - Full sidebar navigation
- **Tablet** (768px-1200px) - Collapsible sidebar
- **Mobile** (320px-768px) - Mobile-optimized navigation

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional healthcare-focused interface
- **Intuitive Navigation** - Easy-to-use sidebar navigation
- **Status Indicators** - Visual indicators for appointment statuses
- **Loading States** - Proper loading states for all operations
- **Error Handling** - User-friendly error messages
- **Success Feedback** - Clear confirmation messages

## 🚦 Success Criteria

✅ **Provider Account Creation** - Can create provider accounts
✅ **Service Management** - Can add/manage services  
✅ **Slot Availability** - Can create and manage time slots
✅ **Customer Booking** - Customers can book appointments
✅ **Appointment Confirmation** - Providers can accept/reject requests
✅ **Dual Interface** - Separate views for customers and providers
✅ **Professional UI** - Modern, healthcare-appropriate design
✅ **Responsive Design** - Works on all device sizes
✅ **Double Booking Prevention** - System prevents conflicts

## 📂 Project Structure

```
bookingapp/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   ├── routes/
    │   ├── styles/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── index.html
```

## 🔧 Development

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📞 Support

For issues or questions about the appointment booking system, please create an issue in the project repository or contact the development team.

---

**Built with ❤️ for modern healthcare appointment management**
