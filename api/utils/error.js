export const errorHandler = (statusCode, message) => {
  const error = new Error(message); // Corrected this line
  error.statusCode = statusCode;
  return error;
};
