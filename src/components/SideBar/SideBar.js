import { ConversationList, Conversation, Avatar } from "@chatscope/chat-ui-kit-react";
import { Container, CssBaseline, Box } from "@mui/material";

const SideBar = (props) => {
  const setDetails = (id, name, image) => {
    props.setChat(id);
    props.setCurrentName(name);
    props.setCurrentPhoto(image);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ConversationList>
          {props.conversations
            ? props.conversations.map((c) => (
                <Conversation key={c.id} name={c.name} onClick={setDetails(c.id, c.name, c.avatarSrc)}>
                  <Avatar src={c.avatarSrc} />
                </Conversation>
              ))
            : null}
        </ConversationList>
      </Box>
    </Container>
  );
};

export default SideBar;
