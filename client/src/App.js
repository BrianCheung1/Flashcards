import React, { useEffect, useState } from "react";

// We use Route in order to define the different routes of our application
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// We import all the components we need in our app
import WordList from "./pages/WordList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/Home" element={<WordList />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
