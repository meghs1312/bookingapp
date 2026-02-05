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
│   │   │   └── db.js                    # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js        # Register & Login logic
│   │   │   ├── serviceController.js     # Service CRUD operations
│   │   │   ├── slotController.js        # Slot management
│   │   │   └── appointmentController.js # Appointment booking & management
│   │   ├── middleware/
│   │   │   └── authMiddleware.js        # JWT verification & role checks
│   │   ├── models/
│   │   │   ├── user.js                  # User schema (customer/provider)
│   │   │   ├── service.js               # Service schema
│   │   │   ├── slot.js                  # Time slot schema
│   │   │   └── appointment.js           # Appointment schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js            # /api/auth routes
│   │   │   ├── serviceRoutes.js         # /api/services routes
│   │   │   ├── slotRoutes.js            # /api/slots routes
│   │   │   └── appointmentRoutes.js     # /api/appointments routes
│   │   ├── app.js                       # Express app setup
│   │   └── server.js                    # Server entry point
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js                 # Axios instance with base URL
    │   ├── components/
    │   │   ├── Layout.jsx               # Sidebar navigation & layout
    │   │   └── ProtectedRoute.jsx       # Route protection by role
    │   ├── pages/
    │   │   ├── auth/
    │   │   │   ├── Login.jsx            # Login page
    │   │   │   └── Register.jsx         # Registration page
    │   │   ├── customer/
    │   │   │   ├── Dashboard.jsx        # Customer home (redirects to services)
    │   │   │   ├── Services.jsx         # Browse all services
    │   │   │   ├── BookAppointment.jsx  # Book appointment with calendar
    │   │   │   ├── MyAppointments.jsx   # View/manage appointments
    │   │   │   └── MyBookings.jsx       # Legacy bookings view
    │   │   └── provider/
    │   │       └── ProviderDashboard.jsx # Provider management interface
    │   ├── routes/
    │   │   └── AppRoutes.jsx            # Route definitions
    │   ├── App.jsx                      # Root component
    │   └── main.jsx                     # React entry point
    ├── package.json
    └── index.html
```

## 🔄 Detailed User Flow Through Files

### 🎯 CUSTOMER FLOW

#### **1. Registration Flow**
```
Frontend: Register.jsx → Backend: authRoutes.js → authController.js → user.js (model)
```

**Step-by-step:**
1. **User visits** `/register` → `Register.jsx` renders
2. **User fills form** (name, email, password, role: "customer")
3. **Form submits** → `axios.post('/auth/register', formData)`
4. **Request hits** `backend/src/routes/authRoutes.js` → `POST /api/auth/register`
5. **Controller processes** `authController.js::register()`
   - Checks if email exists in `user.js` model
   - Hashes password with bcrypt
   - Creates new user document in MongoDB
   - Generates JWT token
6. **Response returns** `{ token, role: "customer" }`
7. **Frontend stores** token & role in localStorage
8. **Redirects to** `/services` (customer dashboard)

---

#### **2. Login Flow**
```
Frontend: Login.jsx → Backend: authRoutes.js → authController.js → user.js (model)
```

**Step-by-step:**
1. **User visits** `/login` → `Login.jsx` renders
2. **User enters** email & password
3. **Form submits** → `axios.post('/auth/login', { email, password })`
4. **Request hits** `backend/src/routes/authRoutes.js` → `POST /api/auth/login`
5. **Controller processes** `authController.js::login()`
   - Finds user by email in `user.js` model
   - Compares password with bcrypt
   - Generates JWT token
6. **Response returns** `{ token, role: "customer" }`
7. **Frontend stores** token & role in localStorage
8. **Redirects based on role** → `/services` for customer

---

#### **3. Browse Services Flow**
```
Frontend: Services.jsx → Backend: serviceRoutes.js → serviceController.js → service.js (model)
```

**Step-by-step:**
1. **User navigates** to `/services` → `Services.jsx` renders
2. **Component mounts** → `useEffect()` triggers
3. **API call** → `axios.get('/services')` with Authorization header
4. **Request hits** `backend/src/routes/serviceRoutes.js` → `GET /api/services`
5. **Middleware checks** `authMiddleware.js::auth()` verifies JWT token
6. **Controller processes** `serviceController.js::getAllServices()`
   - Queries all services from `service.js` model
   - Populates provider information
7. **Response returns** array of services with provider details
8. **Frontend displays** services in grid layout with "Book Appointment" buttons

---

#### **4. Book Appointment Flow**
```
Frontend: BookAppointment.jsx → Backend: slotRoutes.js → slotController.js → slot.js (model)
                              → appointmentRoutes.js → appointmentController.js → appointment.js (model)
```

**Step-by-step:**
1. **User clicks** "Book Appointment" on a service
2. **Navigates to** `/book/:serviceId` → `BookAppointment.jsx` renders
3. **Component fetches slots** → `axios.get('/slots?service=serviceId')`
4. **Request hits** `backend/src/routes/slotRoutes.js` → `GET /api/slots`
5. **Controller processes** `slotController.js::getAvailableSlots()`
   - Queries `slot.js` model for available slots (isBooked: false)
   - Filters by service and date
6. **Response returns** array of available slots
7. **Frontend displays** calendar with available time slots
8. **User selects** date and time slot
9. **User clicks** "Book Appointment"
10. **API call** → `axios.post('/appointments', { slotId })`
11. **Request hits** `backend/src/routes/appointmentRoutes.js` → `POST /api/appointments`
12. **Middleware checks** `authMiddleware.js::auth()` verifies customer role
13. **Controller processes** `appointmentController.js::bookAppointment()`
    - Finds slot in `slot.js` model
    - Checks if slot is available
    - Marks slot as booked (isBooked: true)
    - Creates appointment in `appointment.js` model
    - Links customer, provider, service, and slot
14. **Response returns** created appointment
15. **Frontend shows** success message and redirects to `/appointments`

---

#### **5. View My Appointments Flow**
```
Frontend: MyAppointments.jsx → Backend: appointmentRoutes.js → appointmentController.js → appointment.js (model)
```

**Step-by-step:**
1. **User clicks** "My Appointments" in sidebar
2. **Navigates to** `/appointments` → `MyAppointments.jsx` renders
3. **Component fetches** → `axios.get('/appointments/my')`
4. **Request hits** `backend/src/routes/appointmentRoutes.js` → `GET /api/appointments/my`
5. **Middleware checks** `authMiddleware.js::auth()` verifies JWT
6. **Controller processes** `appointmentController.js::getMyAppointments()`
   - Queries `appointment.js` model by customer ID
   - Populates slot, service, and provider details
7. **Response returns** array of customer's appointments
8. **Frontend displays** appointments with status badges and action buttons

---

#### **6. Cancel Appointment Flow**
```
Frontend: MyAppointments.jsx → Backend: appointmentRoutes.js → appointmentController.js 
                              → appointment.js & slot.js (models)
```

**Step-by-step:**
1. **User clicks** "Cancel Appointment" button
2. **Confirmation dialog** appears
3. **User confirms** → `axios.delete('/appointments/:appointmentId')`
4. **Request hits** `backend/src/routes/appointmentRoutes.js` → `DELETE /api/appointments/:id`
5. **Middleware checks** `authMiddleware.js::auth()` verifies JWT
6. **Controller processes** `appointmentController.js::cancelAppointment()`
   - Finds appointment in `appointment.js` model
   - Verifies customer ownership
   - Updates appointment status to "cancelled"
   - Finds associated slot in `slot.js` model
   - Marks slot as available (isBooked: false)
7. **Response returns** success message
8. **Frontend refreshes** appointment list

---

#### **7. Reschedule Appointment Flow**
```
Frontend: MyAppointments.jsx → Backend: slotRoutes.js → slotController.js → slot.js (model)
                              → appointmentRoutes.js → appointmentController.js 
                              → appointment.js & slot.js (models)
```

**Step-by-step:**
1. **User clicks** "Reschedule" button
2. **Component fetches** available slots → `axios.get('/slots?service=serviceId')`
3. **Request hits** `backend/src/routes/slotRoutes.js` → `GET /api/slots`
4. **Controller returns** available slots for same service
5. **Frontend displays** slot picker with available times
6. **User selects** new time slot
7. **User clicks** "Confirm Reschedule"
8. **API call** → `axios.patch('/appointments/:id/reschedule', { newSlotId })`
9. **Request hits** `backend/src/routes/appointmentRoutes.js` → `PATCH /api/appointments/:id/reschedule`
10. **Middleware checks** `authMiddleware.js::auth()` verifies JWT
11. **Controller processes** `appointmentController.js::rescheduleAppointment()`
    - Verifies customer ownership
    - Checks new slot availability
    - Verifies same service
    - Frees old slot (isBooked: false)
    - Books new slot (isBooked: true)
    - Updates appointment with new slot
    - Resets status to "pending"
12. **Response returns** updated appointment
13. **Frontend refreshes** appointment list

---

### 🏥 PROVIDER FLOW

#### **1. Registration Flow**
```
Frontend: Register.jsx → Backend: authRoutes.js → authController.js → user.js (model)
```

**Step-by-step:**
1. **Provider visits** `/register` → `Register.jsx` renders
2. **Provider fills form** (name, email, password, role: "provider")
3. **Form submits** → `axios.post('/auth/register', formData)`
4. **Request hits** `backend/src/routes/authRoutes.js` → `POST /api/auth/register`
5. **Controller processes** `authController.js::register()`
   - Creates provider user in `user.js` model
   - Generates JWT token
6. **Response returns** `{ token, role: "provider" }`
7. **Frontend stores** token & role in localStorage
8. **Redirects to** `/provider` (provider dashboard)

---

#### **2. Login Flow**
```
Frontend: Login.jsx → Backend: authRoutes.js → authController.js → user.js (model)
```

**Step-by-step:**
1. **Provider visits** `/login` → `Login.jsx` renders
2. **Provider enters** credentials
3. **Form submits** → `axios.post('/auth/login', credentials)`
4. **Backend authenticates** via `authController.js::login()`
5. **Response returns** `{ token, role: "provider" }`
6. **Redirects to** `/provider` dashboard

---

#### **3. Create Service Flow**
```
Frontend: ProviderDashboard.jsx → Backend: serviceRoutes.js → serviceController.js → service.js (model)
```

**Step-by-step:**
1. **Provider navigates** to `/provider` → `ProviderDashboard.jsx` renders
2. **Component fetches** existing services → `axios.get('/services/my')`
3. **Request hits** `backend/src/routes/serviceRoutes.js` → `GET /api/services/my`
4. **Middleware checks** `authMiddleware.js::auth()` and `isProvider()`
5. **Controller processes** `serviceController.js::getMyServices()`
   - Queries `service.js` model by provider ID
6. **Response returns** provider's services
7. **Provider clicks** "Add New Service" button
8. **Form appears** with fields (name, description, duration)
9. **Provider fills** and submits form
10. **API call** → `axios.post('/services', serviceData)`
11. **Request hits** `backend/src/routes/serviceRoutes.js` → `POST /api/services`
12. **Middleware checks** `authMiddleware.js::auth()` and `isProvider()`
13. **Controller processes** `serviceController.js::createService()`
    - Creates service in `service.js` model
    - Links to provider ID from JWT
14. **Response returns** created service
15. **Frontend refreshes** service list

---

#### **4. Create Time Slot Flow**
```
Frontend: ProviderDashboard.jsx → Backend: slotRoutes.js → slotController.js → slot.js (model)
```

**Step-by-step:**
1. **Provider clicks** "Time Slots" tab in dashboard
2. **Component fetches** existing slots → `axios.get('/slots/my')`
3. **Request hits** `backend/src/routes/slotRoutes.js` → `GET /api/slots/my`
4. **Middleware checks** `authMiddleware.js::auth()` and `isProvider()`
5. **Controller processes** `slotController.js::getMySlots()`
   - Queries `slot.js` model by provider ID
   - Populates service information
6. **Response returns** provider's slots
7. **Provider clicks** "Add Time Slot" button
8. **Form appears** with fields (service, date, startTime, endTime)
9. **Provider selects** service from dropdown (populated from their services)
10. **Provider picks** future date and time range
11. **Provider submits** form
12. **API call** → `axios.post('/slots', slotData)`
13. **Request hits** `backend/src/routes/slotRoutes.js` → `POST /api/slots`
14. **Middleware checks** `authMiddleware.js::auth()` and `isProvider()`
15. **Controller processes** `slotController.js::createSlot()`
    - Validates service belongs to provider
    - Creates slot in `slot.js` model
    - Sets isBooked: false
16. **Response returns** created slot
17. **Frontend refreshes** slot list with availability indicator

---

#### **5. View Appointment Requests Flow**
```
Frontend: ProviderDashboard.jsx → Backend: appointmentRoutes.js → appointmentController.js 
                                 → appointment.js (model)
```

**Step-by-step:**
1. **Provider clicks** "Appointments" tab
2. **Component fetches** → `axios.get('/appointments/provider')`
3. **Request hits** `backend/src/routes/appointmentRoutes.js` → `GET /api/appointments/provider`
4. **Middleware checks** `authMiddleware.js::auth()` and `isProvider()`
5. **Controller processes** `appointmentController.js::getProviderAppointments()`
   - Queries `appointment.js` model by provider ID
   - Populates customer, service, and slot details
6. **Response returns** array of appointments
7. **Frontend displays** appointments with customer info and status

---

#### **6. Accept/Reject Appointment Flow**
```
Frontend: ProviderDashboard.jsx → Backend: appointmentRoutes.js → appointmentController.js 
                                 → appointment.js (model)
```

**Step-by-step:**
1. **Provider views** pending appointment
2. **Provider clicks** "Accept" or "Reject" button
3. **API call** → `axios.patch('/appointments/:id', { status: 'confirmed' or 'cancelled' })`
4. **Request hits** `backend/src/routes/appointmentRoutes.js` → `PATCH /api/appointments/:id`
5. **Middleware checks** `authMiddleware.js::auth()` and `isProvider()`
6. **Controller processes** `appointmentController.js::updateAppointmentStatus()`
   - Finds appointment in `appointment.js` model
   - Verifies provider ownership
   - Updates status to "confirmed" or "cancelled"
   - If cancelled, frees up slot (isBooked: false)
7. **Response returns** updated appointment
8. **Frontend refreshes** appointment list with new status

---

#### **7. Delete Service Flow**
```
Frontend: ProviderDashboard.jsx → Backend: serviceRoutes.js → serviceController.js → service.js (model)
```

**Step-by-step:**
1. **Provider clicks** "Delete" button on service card
2. **API call** → `axios.delete('/services/:serviceId')`
3. **Request hits** `backend/src/routes/serviceRoutes.js` → `DELETE /api/services/:id`
4. **Middleware checks** `authMiddleware.js::auth()` and `isProvider()`
5. **Controller processes** `serviceController.js::deleteService()`
   - Verifies service belongs to provider
   - Deletes service from `service.js` model
6. **Response returns** success message
7. **Frontend refreshes** service list

---

#### **8. Delete Slot Flow**
```
Frontend: ProviderDashboard.jsx → Backend: slotRoutes.js → slotController.js → slot.js (model)
```

**Step-by-step:**
1. **Provider clicks** "Delete" button on available slot
2. **API call** → `axios.delete('/slots/:slotId')`
3. **Request hits** `backend/src/routes/slotRoutes.js` → `DELETE /api/slots/:id`
4. **Middleware checks** `authMiddleware.js::auth()` and `isProvider()`
5. **Controller processes** `slotController.js::deleteSlot()`
   - Verifies slot belongs to provider
   - Checks slot is not booked
   - Deletes slot from `slot.js` model
6. **Response returns** success message
7. **Frontend refreshes** slot list

---

## 🔐 Authentication & Authorization Flow

### **JWT Token Flow**
```
1. User logs in → Backend generates JWT with user ID and role
2. Frontend stores token in localStorage
3. Every API request includes: Authorization: Bearer <token>
4. Backend middleware (authMiddleware.js) verifies token
5. Extracts user info and attaches to req.user
6. Role-specific middleware (isProvider) checks user role
7. Controller accesses req.user.id and req.user.role
```

### **Protected Route Flow (Frontend)**
```
1. User tries to access protected route
2. ProtectedRoute.jsx component checks localStorage for token
3. If no token → Redirect to /login
4. If token exists → Check role matches route requirement
5. If role matches → Render component
6. If role doesn't match → Redirect to appropriate dashboard
```

### **Middleware Chain (Backend)**
```
Request → authMiddleware.auth() → [isProvider() if needed] → Controller → Response
```

---

## 📊 Data Flow Summary

### **Customer Booking Flow**
```
Customer → Services.jsx → GET /api/services → service.js model
       ↓
BookAppointment.jsx → GET /api/slots → slot.js model
       ↓
POST /api/appointments → Creates appointment.js + Updates slot.js (isBooked: true)
       ↓
MyAppointments.jsx → GET /api/appointments/my → appointment.js model
```

### **Provider Management Flow**
```
Provider → ProviderDashboard.jsx → POST /api/services → service.js model
        ↓
POST /api/slots → slot.js model (linked to service)
        ↓
GET /api/appointments/provider → appointment.js model
        ↓
PATCH /api/appointments/:id → Updates appointment.js + slot.js
```

---

## 🗄️ Database Relationships

```
User (Provider) ──┬─→ Service ──→ Slot ──→ Appointment
                  │                          ↑
User (Customer) ──┴────────────────────────┘
```

**Relationships:**
- User (provider) → has many → Services
- Service → has many → Slots
- Slot → has one → Appointment (when booked)
- User (customer) → has many → Appointments
- Appointment → references → User (customer), User (provider), Service, Slot

## 🔧 Development

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build