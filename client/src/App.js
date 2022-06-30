import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Create from "./components/create";
import Words from "./components/words";

const App = () => {
    return (
      <div>
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/" element={<Words/>} />
        </Routes>
      </div>
    );
   };
    
export default App;
