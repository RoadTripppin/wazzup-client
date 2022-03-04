import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ChatContainer from "../../components/ChatBox/ChatContainer";

const domTestingLib = require("@testing-library/dom");
const { queryHelpers } = domTestingLib;

let domObj;
const queryByClass = queryHelpers.queryByAttribute.bind(null, "class");
const queryAllByClass = queryHelpers.queryAllByAttribute.bind(null, "class");
beforeEach(() => {
  domObj = render(
    <Router>
      <ChatContainer />
    </Router>
  );
});

test("Renders Header", () => {
  const header = queryByClass(domObj.container, "cs-conversation-header");
  const backButton = queryByClass(header, "cs-conversation-header__back");
  const headerContent = queryByClass(header, "cs-conversation-header__content");

  const userNameDiv = queryByClass(headerContent, "cs-conversation-header__user-name");
  const headerInfo = queryByClass(headerContent, "cs-conversation-header__info");

  expect(headerInfo).not.toBeNull();
  expect(backButton).not.toBeNull();
  expect(headerContent).not.toBeNull();
  expect(userNameDiv).not.toBeNull();
  expect(headerInfo).not.toBeNull();
});

test("Renders message input", () => {
  const chatContainer = queryByClass(domObj.container, "cs-chat-container");

  const input = queryByClass(chatContainer, "cs-message-input");
  const tools = queryAllByClass(input, "cs-message-input__tools");
  const editor = queryByClass(input, "cs-message-input__content-editor-wrapper");
  const sendButton = queryByClass(tools[1], "cs-button cs-button--send");
  const attachmentButton = queryByClass(tools[0], "cs-button cs-button--attachment");

  expect(input).not.toBeNull();
  expect(editor).not.toBeNull();

  expect(tools).not.toBeNull();
  expect(attachmentButton).not.toBeNull();
  expect(sendButton).not.toBeNull();
});

test("Renders Chat Body", () => {
  const chatContainer = queryByClass(domObj.container, "cs-chat-container");

  const messageList = queryByClass(chatContainer, "cs-message-list");

  expect(messageList).not.toBeNull();
});
