/**
 * Truncates a string to a specified length and adds ellipsis if needed
 * @param {string} str - The string to truncate
 * @param {number} n - Maximum length of the resulting string
 * @returns {string} Truncated string with ellipsis if needed
 */
export const truncate = (str, n) => {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};