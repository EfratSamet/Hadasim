import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "../Pages/LoginPage";
import SupplierRegister from "../Pages/SupplierRegister";
import UserPage from "../Pages/UserPage";
import UserOrdersPage from "../Pages/UserOrdersPage";
import OrderPage from "../Pages/OrderPage";
import AddSupplierPage from "../Pages/SupplierRegister";
import SupplierPage from "../Pages/SupplierPage";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* הפניה לעמוד התחברות בהרצה הראשונה */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* עמודים ציבוריים */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/supplier-register" element={<SupplierRegister />} />
        <Route path="/user-page" element={<UserPage />} />
        <Route path="/supplier-page" element={<SupplierPage supplierId={0} />} />
        <Route path="/user-orders" element={<UserOrdersPage />} />
        <Route path="/order-page" element={<OrderPage />} />

        {/* עמודים מוגנים */}
        <Route element={<ProtectedRoute />}>

        </Route>

        {/* ברירת מחדל - הפניה לעמוד ההתחברות */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
