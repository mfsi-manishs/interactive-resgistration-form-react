/**
 * @file utils.ts
 * @fileoverview This defines the utils class of the application.
 */

/**
 * @class Utils
 * @description The utils class of the application.
 */
export class Utils {
  /**
   * Generates a unique ID based on the current timestamp.
   * @returns {string} a unique ID
   */
  public static generateId(): string {
    return Date.now().toString();
  }
}
