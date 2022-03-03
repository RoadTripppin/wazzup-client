import React from "react";
import * as ck from "@chatscope/chat-ui-kit-react";
import * as api from "../../mocks/api/WazzupServerLib.js";
import _ from "lodash";

class ChatContainer extends React.Component {
  state = { chat_id: "", user_id: "", messages: [], chat_name: "" };
  loadData = (chatId, userId) => {
    let chats = api.getChats(chatId, userId, 0, 25);
    this.setState({ user_id: userId, chat_id: chatId, messages: chats.messages, chat_name: chats.chat_name });
  };

  render = () => {
    const convHeader = this.generateChatHeader();
    let messageList = this.generateMessageList();
    const messageInput = this.getMessageInputBox();
    const chatContainer = React.createElement(ck.ChatContainer, {}, [convHeader, messageList, messageInput]);
    return chatContainer;
  };
  componentDidMount() {
    this.loadData("chat_id-xxx", "user_id-xxx");
  }
  generateMessageList = () => {
    const messages = [];
    let currDate = new Date(_.get(this.state, "messages.0.timestamp"));
    const firstSeparator = React.createElement(ck.MessageSeparator, {
      key: "separator1",
      content: currDate.toDateString(),
    });
    messages.push(firstSeparator);
    _.forEach(_.get(this.state, "messages"), (messageInfo) => {
      const messageDate = new Date(_.get(messageInfo, "timestamp"));
      if (messageDate.toDateString() != currDate.toDateString()) {
        const separator = React.createElement(ck.MessageSeparator, {
          key: `separator${currDate.toDateString()}`,
          content: messageDate.toDateString(),
        });
        messages.push(separator);
        currDate = messageDate;
      }
      let messageElement = React.createElement(ck.Message, {
        key: _.get(messageInfo, "id"),
        model: {
          message: _.get(messageInfo, "text"),
          sender: _.get(messageInfo, "sender_id"),
          sentTime: messageDate.toTimeString(),
          direction: _.get(this.state, "user_id") === _.get(messageInfo, "sender_id") ? "outgoing" : "incoming",
        },
      });
      messages.push(messageElement);
    });

    return React.createElement(ck.MessageList, { key: _.get(this.state, "chat_id") + "message-list" }, messages);
  };

  generateChatHeader() {
    return React.createElement(ck.ConversationHeader, { key: _.get(this.state, "chat_id") }, [
      React.createElement(ck.ConversationHeader.Back, { key: "back" }),
      React.createElement(ck.ConversationHeader.Content, {
        key: _.get(this.state, "chat_id") + "_HeaderContent",
        userName: _.get(this.state, "chat_name"),
        info: "",
      }),
    ]);
  }

  getMessageInputBox() {
    return React.createElement(ck.MessageInput, {
      key: `${_.get(this.state, "user_id")}_${_.get(this.state, "chat_id")}_MessageInput`,
      placeholder: "",
      onSend: (msg) => {
        let newMessageList = _.get(this.state, "messages", []);
        let messageData = { sender_id: _.get(this.state, "user_id"), text: msg, timestamp: Date.now() };
        newMessageList.push(messageData);
        this.setState({ messages: newMessageList });
        console.log(`sending message: ${msg}`);
      },
    });
  }
}

export default ChatContainer;
