import { ConversationList, Conversation, Avatar } from "@chatscope/chat-ui-kit-react";
import { CssBaseline, Box } from "@mui/material";

const SideBar = (props) => {
  const setDetails = (id, name, image) => {
    props.setChat(id);
    props.setCurrentName(name);
    props.setCurrentPhoto(image);
    console.log(id, name);
  };

  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ConversationList>
          {props.conversations
            ? props.conversations.map((c, i) => {
                console.log("sidebar", c);
                return (
                  <Conversation
                    key={c.id + i}
                    name={c.name}
                    onClick={() => setDetails(c.id, c.name, c.profilepic)}
                    active={props.activeId === c.id}
                  >
                    <Avatar src={c.profilepic} />
                  </Conversation>
                );
              })
            : null}
        </ConversationList>
      </Box>
    </div>
  );
};

export default SideBar;
