import React, { useEffect, useState } from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";

// We import all the components we need in our app
import WordList from "./pages/WordList";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route
          exact
          path="/Home"
          element={currentSessionId ? <WordList /> : <Navigate to={"/Login"} />}
        />
        <Route
          exact
          path="/Login"
          element={currentSessionId ? <Navigate to={"/Home"} /> : <Login />}
        /> */}
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Home" element={<WordList />} />
        <Route exact path="/Register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
