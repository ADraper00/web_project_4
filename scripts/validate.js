function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
  inputElement.classList.add(formValidate.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formValidate.errorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass) {
  const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
  inputElement.classList.remove(formValidate.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(formValidate.errorClass);
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
      hideInputError(formElement, inputElement);
  }
}

function createInputList(formElement, settings) {
  return Array.from(formElement.querySelectorAll(settings.inputSelector));
}

function setEventListeners(formElement) {
  const inputList = createInputList(formElement, formValidate);
  const buttonElement = formElement.querySelector(formValidate.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
          checkInputValidity(formElement, inputElement);
          toggleButtonState(inputList, buttonElement);
      });
  });
}

function enableValidation(settingsObject) {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
      });
      setEventListeners(formElement);
  });
}

function resetValidation(form) {
  form.reset();
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
      return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(formValidate.inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(formValidate.inactiveButtonClass);
      buttonElement.disabled = false;
  }
}

const formValidate = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: ".popup__save-button_disabled",
  inputErrorClass: ".popup__input_invalid",
  errorClass: ".popup__input-error_active",
};

enableValidation(formValidate);
