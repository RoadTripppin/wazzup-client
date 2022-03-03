"use strict";
/**
 * This file coinatins fuctions to make REST calls to wazzup-server.
 *
 */

// eslint-disable-next-line
function getChats(chatId, userId, offset, count) {}

// eslint-disable-next-line
function getUserDetails(userIds) {}

/**
 * Function for user to login
 *
 * @param { string } EmailID
 * @param { string } Password
 *
 */
//TODO: Test fetchWithTimeout functionality with backend
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

export async function LoginAPI(emailId, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailId, password: password }),
  };
  const response = await fetchWithTimeout("http://10.20.63.42:8888/login", requestOptions);
  const data = await response.json();
  console.log(data); //TODO: Remove log
  return response.status;
}

/**
 * Function for user to login
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
    body: JSON.stringify({ email: emailId, password: password, name: name, photo: image }),
  };
  const response = await fetchWithTimeout("http://10.20.63.42:8888/register", requestOptions);
  const data = await response.json();
  console.log(data); //TODO: Remove log
  return response.status;
}
