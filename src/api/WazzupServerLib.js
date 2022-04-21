"use strict";

import _ from "lodash";
import constants from "../util/Constants.js";

/**
 * This file contains functions to make REST calls to wazzup-server.
 *
 */

const url = "10.20.63.15";

function handleMessageReception(data) {
  console.log(data);
}

function handleRoomJoined(data) {
  console.log("rj :" + data);
}
export function initWebSocket() {
  let ws = new WebSocket("ws://" + url + ":8882/ws?ID=" + localStorage.getItem("id"));
  ws.onmessage = function (event) {
    switch (event.data.actions) {
      case constants.WebSocket.Actions.SEND_MESSAGE: {
        handleMessageReception(event.data);
        break;
      }
      case constants.WebSocket.Actions.ROOM_JOINED: {
        handleRoomJoined(event.data);
        break;
      }
      default: {
        console.log("error: " + event);
        break;
      }
    }
  };
  return ws;
}

export function closeWebSocket(ws) {
  if (!ws) {
    ws.close();
  }
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

// eslint-disable-next-line
export async function getChats(chatId) {
  if (!_.isNull(chatId)) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt_token") },
      body: JSON.stringify({ roomid: chatId }),
    };
    const response = await fetchWithTimeout("http://" + url + ":8882/messages", requestOptions);
    const data = await response.json();
    return data.chats;
  }
  return [];
}

// eslint-disable-next-line
export function sendMessage(ws, message, chatRoomId, chatName) {
  console.log("aha");
  console.log(ws);

  if (ws) {
    console.log("kaboom");
    let wsMessage = {
      action: constants.WebSocket.Actions.SEND_MESSAGE,
      message: message,
      target: {
        id: chatRoomId,
        name: chatName,
      },
    };
    console.log(wsMessage);
    console.log(ws);
    ws.send(wsMessage);
  }
}

export async function searchUser(userName) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt_token") },
    body: JSON.stringify({ querystring: userName }),
  };
  const response = await fetchWithTimeout("http://" + url + ":8882/users", requestOptions);
  return response;
}

export async function initChatRoom(ws, userId) {
  if (!ws) {
    let wsMessage = {
      action: constants.WebSocket.Actions.JOIN_PRIVATE_ROOM,
      message: userId,
    };
    ws.sendMessage(wsMessage);
  }
}

// eslint-disable-next-line
export async function getUsersDetails() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt_token") },
  };
  const response = await fetchWithTimeout("http://" + url + ":8882/user/interacted", requestOptions); //Change when backend code is ready
  const data = await response.json();

  return { data: data.rooms, status: response.status };
}

/**
 * Function for user to login
 *
 * @param { string } EmailID
 * @param { string } Password
 *
 */
export async function LoginAPI(emailId, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailId, password: password }),
  };
  const response = await fetchWithTimeout("http://" + url + ":8882/login", requestOptions);
  const data = await response.json();

  return { data: data, status: response.status };
}

/**
 * Function for user to register
 *
 * @param { string } EmailID
 * @param { string } Password
 * @param { string } Name
 * @param { base64 } Image
 *
 */
export async function RegisterAPI(emailId, password, name, image) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailId, password: password, name: name, profilepic: image }),
  };
  const response = await fetchWithTimeout("http://" + url + ":8882/register", requestOptions);
  const data = await response.json();

  return { data: data, status: response.status };
}

/**
 * Function for user to update profile
 *
 * @param { string } Name
 * @param { string } Password
 * @param { base64 } Image
 *
 */
export async function UpdateAPI(name, password, image) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt_token") },
    body: JSON.stringify({ name: name, password: password, profilepic: image }),
  };
  const response = await fetchWithTimeout("http://" + url + ":8882/user/update", requestOptions);
  const data = await response.json();

  return { data: data, status: response.status };
}
