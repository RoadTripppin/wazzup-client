"use strict";
import faker from "@faker-js/faker";

export function getChats(chatId, userId, offset, count) {
  let messages = [];
  const senderId = faker.datatype.uuid();
  for (let i = 0; i < count; i++) {
    let message = {
      id: faker.datatype.uuid(),
      text: faker.lorem.paragraph(1),
      sender_id: senderId,
      recipient_id: userId,
      timestamp: faker.time.recent(),
    };
    if (i % 2 == 1) {
      message.recipient_id = senderId;
      message.sender_id = userId;
    }
    messages.push(message);
  }
  const users = [senderId, userId];
  const isGroup = false;
  const chatName = faker.name.firstName();
  return { messages: messages, users: users, is_group: isGroup, chat_name: chatName };
}

export function getUserDetails(userIds) {
  let users = [];
  for (let userId in userIds) {
    let user = {
      id: userId,
      name: faker.name.firstName(),
      email: faker.internet,
    };
    users.push(user);
  }
  return users;
}

export function sendMessage() {
  //Websocket API Yet to be implemented in server.
}

export function getUsersDetails() {
  let users = [];
  for (let i = 0; i < 7; i++) {
    let user = {
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      email: faker.internet,
      image_url: faker.image.avatar(),
    };
    users.push(user);
  }
  return users;
}

export function searchUser() {
  let user = {
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    image_url: faker.image.avatar(),
  };
  return { users: [user] };
}

export function initChat() {}
