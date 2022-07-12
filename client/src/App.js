import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";


// We import all the components we need in our app
import WordList from "./pages/WordList";
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
    return (
      <div>
        <Routes>
          <Route path="/Home" element={<WordList/>} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
        </Routes>
      </div>
    );
   };
    
export default App;
