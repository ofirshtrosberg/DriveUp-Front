export const validateNumbersOnly = (text) => {
  return /^\d+$/.test(text);
};
export const validateLettersOnly = (text) => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(text);
};
export const validateEmail = (text) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
export const validatePassword = (text) => {
  return text.length >= 6;
};
export const validatePhoneNumber = (text) => {
  return validateNumbersOnly(text) && text.length == 10;
};
export const validateFullName = (text) => {};
export const validateCarModel = (text) => {};
export const validateCarColor = (text) => {};
export const validatePlateNumber = (text) => {};
