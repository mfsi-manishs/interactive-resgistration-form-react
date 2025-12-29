/**
 * @file user.validation.ts
 * @fileoverview This defines the user validation class of the application.
 */

import { ERROR_MESSAGES } from "../constants.js";
import type { User } from "../models/user.model.js";
import { Validation, type ValidationResult } from "./validation.js";

/**
 * @class UserValidation
 * @description The user validation class of the application.
 */
export class UserValidation extends Validation<User> {
  /**
   * Validates a user object based on the required fields and their respective constraints.
   * @param {User} user The user object to validate.
   * @returns {ValidationResult} An object containing the validation result and any error messages.
   */
  validate(user: User): ValidationResult {
    const errors: Record<string, string> = {};
    let isValid = true;

    if (!user.name) {
      errors.name = ERROR_MESSAGES.NAME_REQ_TXT;
    } else if (user.name.trim().length < 2) {
      errors.name = ERROR_MESSAGES.NAME_TOO_SHORT_TXT;
    }

    if (!user.email.trim()) {
      errors.email = ERROR_MESSAGES.EMAIL_REQ_TXT;
    } else if (!user.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = ERROR_MESSAGES.INVALID_EMAIL_TXT;
    }

    if (!user.phone.trim()) {
      errors.phone = ERROR_MESSAGES.PHONE_REQ_TXT;
    } else if (!user.phone.match(/^[6-9]\d{9}$/)) {
      errors.phone = ERROR_MESSAGES.INVALID_PHONE_TXT;
    }

    if (Object.keys(errors).length > 0) {
      isValid = false;
    }

    return { isValid, errors };
  }
}
