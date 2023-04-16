export const validateNumbersOnly = (text) => {
  return /^\d+$/.test(text);
};
export const validateLettersOnly = (text) => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(text);
};
export const validateEmail = (text) => {
  text = trimText(text);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(text);
};
export const validatePassword = (text) => {
  return text.length >= 6;
};
export const validatePhoneNumber = (text) => {
  text = removeWhiteSpaces(text);
  return validateNumbersOnly(text) && text.length == 10;
};
export const validateFullName = (text) => {
  text = removeWhiteSpaces(text);
  return validateLettersOnly(text) && text.length >= 4;
};
export const validateCarModel = (text) => {
  text = removeWhiteSpaces(text);
  return validateLettersOnly(text) && text.length >= 3;
};
export const validateCarColor = (text) => {
  text = removeWhiteSpaces(text);
  return validateLettersOnly(text) && text.length >= 3;
};
export const validatePlateNumber = (text) => {
  text = removeWhiteSpaces(text);
  return validateNumbersOnly(text) && text.length == 10;
};
export const validateCardNumber = (cardType, cardNumber) => {
  cardNumber = removeWhiteSpaces(cardNumber);
  if (validateNumbersOnly(cardNumber)) {
    return (
      (cardType == "visa" && cardNumber.length == 16) ||
      (cardType == "masterCard" && cardNumber.length == 16) ||
      (cardType == "discover" && cardNumber.length == 16) ||
      (cardType == "diners" && cardNumber.length == 14) ||
      (cardType == "americanExpress" && cardNumber.length == 15)
    );
  }
  return false;
};
export const validateCVV = (text) => {
  text = removeWhiteSpaces(text);
  return validateNumbersOnly(text) && text.length == 3;
};
export const validateId = (text) => {
  text = removeWhiteSpaces(text);
  return validateNumbersOnly(text) && text.length == 9;
};

export const removeWhiteSpaces = (text) => {
  return text.replace(/\s+/g, "");
};
export const trimText = (text) => {
  return text.trim();
};
