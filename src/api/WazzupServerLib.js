"use strict";
/**
 * This file contains functions to make REST calls to wazzup-server.
 *
 */

// eslint-disable-next-line
function getChats(chatId, userId, offset, count) {
  //API Yet to be implemented in server.
}

// eslint-disable-next-line
function sendMessage(args) {
  //Websocket API Yet to be implemented in server.
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
export async function getUsersDetails() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt_token") },
  };
  const response = await fetchWithTimeout("http://10.20.63.4:8882/user/interacted", requestOptions); //Change when backend code is ready
  const data = await response.json().rooms;

  return { data: data, status: response.status };
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
  const response = await fetchWithTimeout("http://10.20.63.4:8882/login", requestOptions);
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
  const response = await fetchWithTimeout("http://10.20.63.4:8882/register", requestOptions);
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
  const response = await fetchWithTimeout("http://10.20.63.4:8882/user/update", requestOptions);
  const data = await response.json();

  return { data: data, status: response.status };
}
