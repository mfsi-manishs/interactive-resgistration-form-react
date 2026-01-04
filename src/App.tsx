/**
 * @file App.tsx
 * @fileoverview This defines the app component of the application.
 */

import React, { useState } from "react";

import "./App.css";

import Toast, { type ToastMessage } from "./components/toast.component";
import UserForm from "./components/user-form.component";
import UsersTable from "./components/users-table.component";
import { MESSAGES } from "./constants";
import type { User } from "./models/user.model";
import { addUser, fetchUsers, updateUser } from "./services/api";

/**
 * The app component of the application.
 * It renders a user registration form, a users table, and a toast component.
 * The user registration form is used to add or update a user.
 * The users table is used to display all the users in the application.
 * The toast component is used to display success or error messages when a user is added or updated.
 * The component also handles the isEditing state, which is used to toggle the form's submit button text.
 * @returns {JSX.Element} The rendered React element.
 */
function App() {
  const [selectedUser, setSelectedUser] = useState<User>({ id: "", name: "", email: "", phone: "", gender: "male" });
  const [users, setUsers] = useState<Record<string, User>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  /**
   * Adds or updates a user in the application.
   * If the user is being edited, the updateUser API is called.
   * If the user is being added, the addUser API is called.
   * The user is then added or updated in the users record.
   * A toast message is displayed to indicate the success or failure of the operation.
   * The isEditing and isLoading states are set to false after the operation is complete.
   */
  const addOrUpdateUser = async (user: User) => {
    try {
      setIsLoading(true);
      if (isEditing) {
        await updateUser(user);
        handleToastMessage({ toastType: "success", message: MESSAGES.USER_UPDATED_SUCCESS });
      } else {
        await addUser(user);
        handleToastMessage({ toastType: "success", message: MESSAGES.USER_ADDED_SUCCESS });
      }
      setUsers({ ...users, [user.id]: user });
    } catch (error) {
      handleToastMessage({ toastType: "error", message: isEditing ? MESSAGES.FAILED_TO_UPDATE_USER : MESSAGES.FAILED_TO_ADD_USER });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles a toast message by displaying it in the toast component.
   * If the toast message is null, it sets the toast state to null.
   * If the toast message is not null, it sets the toast state to the given message and type.
   * The toast message is then cleared after 3 seconds using setTimeout.
   * @param {ToastMessage | null} toastMessage - The toast message to display or null if no message should be displayed.
   */
  const handleToastMessage = (toastMessage: ToastMessage | null) => {
    if (!toastMessage) {
      setToast(null);
      return;
    }
    setToast({ toastType: toastMessage.toastType, message: toastMessage.message });
    setTimeout(() => setToast(null), 3000);
  };

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUsers();
        const usersRec: Record<string, User> = data.reduce((acc: Record<string, User>, user: User) => ({ ...acc, [user.id]: user }), {});
        setUsers(usersRec);
        handleToastMessage({ toastType: "success", message: MESSAGES.USERS_FETCHED_SUCCESS });
      } catch (error) {
        handleToastMessage({ toastType: "error", message: MESSAGES.FAILED_TO_FETCH_USERS });
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <section id="main-container">
      <div className="toast-container">{toast && <Toast toastType={toast.toastType} message={toast.message} onClose={() => setToast(null)} />}</div>
      <div>
        <h1>User Registration</h1>
      </div>
      <div id="app-content" className="flex-box-row gap-m h-90">
        <UserForm user={selectedUser} upsertUser={addOrUpdateUser} isEditing={isEditing} setIsEditing={setIsEditing} />
        <UsersTable users={users} setUsers={setUsers} setSelectedUser={setSelectedUser} setIsEditing={setIsEditing} showToast={handleToastMessage} />
      </div>
    </section>
  );
}

export default App;
