/**
 * @file users-table.component.tsx
 * @fileoverview This defines the users table component of the application.
 */

import React from "react";
import { MESSAGES, UI_STRINGS } from "../constants";
import type { User, UsersRecord } from "../models/user.model";

type UsersTableProps = {
  users: UsersRecord;
  setUsers: React.Dispatch<React.SetStateAction<UsersRecord>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * The users table component of the application.
 * It displays a table of users, with columns for name, email, phone, gender, edit, and delete.
 * The component also handles the edit and delete functionality for each user.
 * @param {UsersTableProps} props - the props object containing the users, setUsers, setSelectedUser, and setIsEditing functions.
 * @returns {JSX.Element} the JSX element representing the users table component.
 */
const UsersTable: React.FC<UsersTableProps> = ({ users, setUsers, setSelectedUser, setIsEditing }) => {
  const handleEdit = (user: User) => {
    setSelectedUser({ ...user });
    setIsEditing(true);
  };

  /**
   * Handles the deletion of a user by confirming with the user and then updating the users record.
   * @param {User} user - the user to delete
   */
  const handleDelete = (user: User) => {
    if (!window.confirm(MESSAGES.CONFIRM_DEL_USER_MSG)) return;
    const updatedUsers = { ...users };
    delete updatedUsers[user.id];
    setUsers(updatedUsers);
    setSelectedUser({ id: "", name: "", email: "", phone: "", gender: "male" });
    setIsEditing(false);
  };

  return (
    <section id="user-table-container">
      <table id="user-table" className="table-fixed w-100">
        <thead>
          <tr>
            <th className="w-25 text-left">Name</th>
            <th className="w-25 text-left">Email</th>
            <th className="w-15 text-left">Phone</th>
            <th className="w-15 text-left">Gender</th>
            <th className="w-10 text-center">Edit</th>
            <th className="w-10 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(users).length > 0 ? (
            Object.entries(users).map(([id, user]) => (
              <tr key={id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td className="text-center">
                  <button className="edit-btn" onClick={() => handleEdit(user)}>
                    {UI_STRINGS.EDIT_BTN_TEXT}
                  </button>
                </td>
                <td className="text-center">
                  <button className="delete-btn" onClick={() => handleDelete(user)}>
                    {UI_STRINGS.DELETE_BTN_TEXT}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                {MESSAGES.NO_USERS_MSG}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default UsersTable;
