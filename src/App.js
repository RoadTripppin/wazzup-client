import "./styles/App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import ChatContainer from "./components/ChatBox/ChatContainer.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<ChatContainer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update" element={<UpdateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
