import { CssBaseline, Drawer, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../mocks/api/WazzupServerLib";
import ChatContainer from "../ChatBox/ChatContainer";
import SideBar from "../SideBar/SideBar";

const drawerWidth = 240;

const MainApp = () => {
  const [users, setUsers] = useState([]);
  const [chatId, setChatId] = useState(-1);
  const [currentName, setCurrentName] = useState("");
  const [currentPhoto, setCurrentPhoto] = useState("");

  const getUsers = async () => {
    try {
      const res = await getUserDetails(localStorage.getItem("email"));
      const status = res.status;
      const ret_data = res.data;
      if (status == 200) {
        setUsers(ret_data); //Need to confirm what is being returned by backend
      } else {
        alert("Server Error!! Server may be down!");
      }
    } catch (e) {
      alert("Server Error!! Server may be down!");
    }
  };

  useEffect(() => {
    getUsers();

    /* [] => when to re-run*/
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <SideBar
          conversations={users}
          setChat={setChatId}
          setCurrentName={setCurrentName}
          setCurrentPhoto={setCurrentPhoto}
        />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <ChatContainer chatId={chatId} currentName={currentName} currentPhoto={currentPhoto} />
      </Box>
    </Box>
  );
};

export default MainApp;
