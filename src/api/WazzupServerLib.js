"use strict";
/**
 * This file coinatins fuctions to make REST calls to wazzup-server.
 *
 */

/**
 * Function for user to login
 *
 * @param { string } EmailID
 * @param { string } Password
 *
 */
export async function LoginAPI(emailId, password) {
  //TODO: Change return to true or false based on resposne status/message
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailId, password: password }),
  };
  const response = await fetch("http://10.20.63.42:8888/login", requestOptions);
  const data = await response.json();
  console.log(data);
  return response.status;
}

/**
 * Function for user to login
 *
 * @param { string } EmailID
 *
 * @param { string } Password
 *
 * @param { string } Name
 *
 * @param { base64 } image
 *
 */
export async function RegisterAPI(emailId, password, name, image) {
  //TODO: Change return to true or false based on resposne status/message
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailId, password: password, name: name, photo: image }),
  };
  const response = await fetch("http://10.20.63.42:8888/register", requestOptions);
  const data = await response.json();
  console.log(data);
  return response.status;
}
