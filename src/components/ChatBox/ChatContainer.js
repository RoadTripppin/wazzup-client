import React from "react";
import * as ck from "@chatscope/chat-ui-kit-react";
import * as api from "../../api/WazzupServerLib.js";
import _ from "lodash";

class ChatContainer extends React.Component {
  loadData = async (chatId) => {
    let chats = await api.getChats(chatId);
    console.log(chats);
    this.props.setMessages(chats);
  };

  render = () => {
    console.log(this.props);
    if (this.props.chatId == null) {
      return null;
    }
    console.log(this.props);
    const convHeader = this.generateChatHeader();
    let messageList = this.generateMessageList();
    const messageInput = this.getMessageInputBox();
    const chatContainer = React.createElement(ck.ChatContainer, {}, [convHeader, messageList, messageInput]);
    return chatContainer;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.chatId !== this.props.chatId) {
      this.loadData(this.props.chatId);
    }
  }

  componentDidMount() {
    api.initChatRoom(this.props.chatId);
  }

  generateMessageList = () => {
    let selfUserId = localStorage.getItem("id");
    const messages = [];
    let currDate = new Date(_.get(this.props, "messages.0.timestamp"));
    const firstSeparator = React.createElement(ck.MessageSeparator, {
      key: "separator1",
      content: currDate.toDateString(),
    });
    messages.push(firstSeparator);
    _.forEach(_.get(this.props, "messages"), (messageInfo) => {
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
          direction: selfUserId === _.get(messageInfo, "sender_id") ? "outgoing" : "incoming",
        },
      });
      messages.push(messageElement);
    });

    return React.createElement(ck.MessageList, { key: _.get(this.props, "chatId") + "message-list" }, messages);
  };

  generateChatHeader() {
    return React.createElement(ck.ConversationHeader, { key: _.get(this.props, "chatId") }, [
      React.createElement(ck.ConversationHeader.Back, { key: "back" }),
      React.createElement(ck.ConversationHeader.Content, {
        key: _.get(this.props, "chatId") + "_HeaderContent",
        userName: _.get(this.props, "currentName"),
        info: "",
      }),
    ]);
  }

  getMessageInputBox() {
    return React.createElement(ck.MessageInput, {
      key: `notMe_${_.get(this.props, "chatId")}_MessageInput`,
      placeholder: "Type message ... ",
      onSend: (msg) => {
        let selfUserId = localStorage.getItem("id");
        let messageData = { sender_id: selfUserId, text: msg, timestamp: Date.now() };
        this.props.setMessages([...this.props.messages, messageData]);
        console.log(`sending message: ${msg}`);
        api.sendMessage(this.props.ws, msg, _.get(this.props, "chatId"), this.props.currentName);
      },
    });
  }
}

export default ChatContainer;
