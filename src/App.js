import "./styles/App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import MainApp from "./components/MainApp/MainApp";

function App() {
  const [ws, setWs] = useState(null);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Login ws={ws} setWs={setWs} />} />
          <Route path="/chat" element={<MainApp ws={ws} setWs={setWs} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update" element={<UpdateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
