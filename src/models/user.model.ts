/**
 * @file user.model.ts
 * @fileoverview This defines the user model class of the application.
 */

/**
 * @type Gender
 * @description Possible genders for a user.
 */
export type Gender = "male" | "female" | "others";

/**
 * @interface User
 * @description A user object with id, name, email, phone, and gender properties.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
}

/**
 * @type UsersRecord
 * @description A record of users, where the key is the unique identifier and the value is the user object.
 */
export type UsersRecord = Record<string, User>;
