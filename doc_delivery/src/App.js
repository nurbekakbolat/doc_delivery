import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Signin from "./Pages/Auth.js";
import Courier from "./Pages/Courier";
import Psc from "./Pages/Psc";
import ClientSignin from "./Pages/User";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/courier" element={<Courier />} />
          <Route path="/psc" element={<Psc />} />
          <Route path="/user" element={<ClientSignin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
