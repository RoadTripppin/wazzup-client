import { CssBaseline, Drawer, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getUsersDetails } from "../../api/WazzupServerLib";
import ChatContainer from "../ChatBox/ChatContainer";
import SideBar from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import UserSearch from "../UserSearch/UserSearch";

const drawerWidth = 240;

const MainApp = () => {
  const [users, setUsers] = useState([]);
  const [chatId, setChatId] = useState(-1);
  const [currentName, setCurrentName] = useState("");
  const [currentPhoto, setCurrentPhoto] = useState("");
  let navigate = useNavigate();

  const getUsers = async () => {
    try {
      const res = await getUsersDetails();

      const status = res.status;
      const ret_data = res.data;

      if (status == 200) {
        setUsers(ret_data);
      } else if (status != 400) {
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

  const handleOnClick = () => {
    navigate("/update");
  };

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
        <Button onClick={handleOnClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update Profile
        </Button>

        <UserSearch setUsers={setUsers} users={users} />

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
