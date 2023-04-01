export const containsOnlyLetters = (textToCheck) => {
  const letterRegex = /^[A-Za-z]+$/;
  const checkedText = letterRegex.test(textToCheck);
  return checkedText;
};
export const phoneNumberIsCorrect = (numbersToCheck) => {
  const numberRegex =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const checkedNumber = numberRegex.test(numbersToCheck);
  return checkedNumber;
};
