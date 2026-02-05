import { Routes, Route, Navigate } from "react-router-dom";


import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/customer/Dashboard";
import Services from "../pages/customer/Services";
import ServiceDetails from "../pages/customer/ServiceDetails";
import MyBookings from "../pages/customer/MyBookings";
import BookAppointment from "../pages/customer/BookAppointment";

import ProviderDashboard from "../pages/provider/ProviderDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* customer */}
      <Route element={<ProtectedRoute role="customer" />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book/:id" element={<BookAppointment />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Route>

      {/* provider */}
      <Route element={<ProtectedRoute role="provider" />}>
        <Route path="/provider" element={<ProviderDashboard />} />
      </Route>
    </Routes>
  );
}
