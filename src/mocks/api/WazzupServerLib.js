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
