/**
 * @file api.ts
 * @fileoverview This defines the api class of the application.
 */

import { MESSAGES } from "../constants";
import type { User } from "../models/user.model";

const API_URL = import.meta.env.VITE_API_URL;

export const USERS_ENDPOINT = `${API_URL}/users`;

/**
 * Fetches the list of users from the API.
 * Returns an array of User objects on success.
 * Throws an error if the API request fails.
 */
export async function fetchUsers() {
  try {
    const response = await fetch(USERS_ENDPOINT);
    if (!response.ok) {
      new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Users failed:", error);
    throw new Error(MESSAGES.FAILED_TO_FETCH_USERS);
  }
}

/**
 * Adds a new user to the list of users.
 * Makes a POST request to the API with the user object as the request body.
 * Returns nothing on success.
 * Throws an error if the API request fails.
 * @param {User} user - The user object to add.
 */
export async function addUser(user: User) {
  try {
    const response = await fetch(USERS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Add User failed:", error);
    throw new Error(MESSAGES.FAILED_TO_ADD_USER);
  }
}

/**
 * Updates an existing user in the list of users.
 * Makes a PUT request to the API with the user object as the request body.
 * Returns nothing on success.
 * Throws an error if the API request fails.
 * @param {User} user - The user object to update.
 */
export async function updateUser(user: User) {
  try {
    const response = await fetch(`${USERS_ENDPOINT}/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Update User failed:", error);
    throw new Error(MESSAGES.FAILED_TO_UPDATE_USER);
  }
}

/**
 * Deletes an existing user from the list of users.
 * Makes a DELETE request to the API with the user's id as the request path.
 * Returns nothing on success.
 * Throws an error if the API request fails.
 * @param {User} user - The user object to delete.
 */
export async function deleteUser(user: User) {
  try {
    const response = await fetch(`${USERS_ENDPOINT}/${user.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Delete User failed:", error);
    throw new Error(MESSAGES.FAILED_TO_DELETE_USER);
  }
}
