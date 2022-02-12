import "./styles/App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import ChatContainer from "./components/ChatContainer/ChatContainer";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/chat" element={<ChatContainer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update" element={<UpdateUser />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
