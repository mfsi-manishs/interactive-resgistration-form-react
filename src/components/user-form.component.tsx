/**
 * @file user-form.component.tsx
 * @fileoverview This defines the user form component of the application.
 */

import React from "react";
import { UI_STRINGS } from "../constants";
import { UserValidation } from "../logic/user.validation";
import type { User } from "../models/user.model";
import { Utils } from "../utils/utils";

type UserFormProps = {
  user: User;
  upsertUser: (user: User) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

type UserFormErrors = { name?: string; email?: string; phone?: string };

/**
 * A React component that renders a user registration form.
 * The form is initially populated with the given user data.
 * The component handles form submission and validation.
 * If the form data is valid, the component calls the given upsertUser callback function.
 * If the form data is invalid, the component displays error messages.
 * The component also handles the isEditing state, which is used to toggle the form's submit button text.
 * @param {UserFormProps} props - The component's props.
 * @param {User} user - The user data to populate the form with.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsEditing - The function to toggle the isEditing state.
 * @param {(user: User) => void} upsertUser - The function to call when the form data is valid.
 * @returns {React.ReactElement} The rendered React element.
 */
const UserForm: React.FC<UserFormProps> = ({ user, upsertUser, isEditing, setIsEditing }) => {
  const [formData, setFormData] = React.useState<User>(user);
  const [formErrors, setFormErrors] = React.useState<UserFormErrors>({ name: "", email: "", phone: "" });

  /**
   * Handles a change event on an input element in the user registration form.
   * Extracts the name and value of the changed input element and updates the form data state.
   * The form data state is updated using the spread operator to preserve the existing form data values.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles the form submission event.
   * Prevents the default form submission behavior.
   * Trims the form data and validates it using the UserValidation class.
   * If the form data is valid, calls the upsertUser callback function with the trimmed form data.
   * If the form data is invalid, sets the form errors using the validationResult.errors object.
   * Resets the form data to its initial state and sets the isEditing state to false if the form data is valid.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedFormData = { ...formData, name: formData.name.trim(), email: formData.email.trim(), phone: formData.phone.trim() };
    const validationResult = new UserValidation().validate(trimmedFormData);
    setFormErrors(validationResult.errors);
    if (validationResult.isValid) {
      if (!isEditing) {
        trimmedFormData.id = Utils.generateId();
      }
      upsertUser(trimmedFormData);
      setFormData({ id: "", name: "", email: "", phone: "", gender: "male" });
      setIsEditing(false);
    }
  };

  React.useEffect(() => {
    setFormData(user);
    setFormErrors({});
  }, [user]);

  return (
    <section id="user-form-container">
      <form id="user-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          required
          className={formErrors.name ? "w-100 border-box mb-m" + " input-error" : "w-100 border-box mb-m"}
          value={formData.name}
          onChange={handleChange}
        />
        {formErrors.name && <span className="error-msg mb-m">{formErrors.name}</span>}
        <input
          name="email"
          placeholder="Email"
          required
          className={formErrors.email ? "w-100 border-box mb-m" + " input-error" : "w-100 border-box mb-m"}
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <span className="error-msg mb-m">{formErrors.email}</span>}
        <input
          name="phone"
          placeholder="Phone Number"
          required
          className={formErrors.phone ? "w-100 border-box mb-m" + " input-error" : "w-100 border-box mb-m"}
          value={formData.phone}
          onChange={handleChange}
        />
        {formErrors.phone && <span className="error-msg mb-m">{formErrors.phone}</span>}
        <div className="w-100 border-box border-thin mb-m">
          <span>Gender:</span>
          <label>
            <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} />
            Female
          </label>
          <label>
            <input type="radio" name="gender" value="others" checked={formData.gender === "others"} onChange={handleChange} />
            Others
          </label>
        </div>
        <button type="submit">{isEditing ? UI_STRINGS.UPDATE_BTN_TEXT : UI_STRINGS.SUBMIT_BTN_TEXT}</button>
      </form>
    </section>
  );
};

export default UserForm;
