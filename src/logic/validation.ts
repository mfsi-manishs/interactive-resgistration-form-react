/**
 * @file validation.ts
 * @fileoverview This defines the validation class of the application.
 */

/**
 * @type ValidationResult
 * @description An object containing the validation result and any error messages.
 */
export type ValidationResult = { isValid: boolean; errors: Record<string, string> };

/**
 * @class Validation
 * @description The validation class of the application.
 */
export abstract class Validation<T> {
  constructor() {}

  protected abstract validate(input: T): ValidationResult;
}
