import { ConversationList, Conversation, Avatar } from "@chatscope/chat-ui-kit-react";
import { CssBaseline, Box } from "@mui/material";

//TODO: Remove if backend adds DP
import faker from "@faker-js/faker";

const SideBar = (props) => {
  const setDetails = (id, name, image) => {
    props.setChat(id);
    props.setCurrentName(name);
    props.setCurrentPhoto(image);
    console.log(image);
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
            ? props.conversations.map((c) => {
                //TODO: Remove if backend adds DP
                let temp_img = faker.image.avatar();
                return (
                  <Conversation key={c.id} name={c.name} onClick={() => setDetails(c.id, c.name, temp_img)}>
                    <Avatar src={temp_img} />
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
