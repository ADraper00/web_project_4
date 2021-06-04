const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorClass: ".popup__input_invalid",
    errorClass: ".popup__input-error_active",
};

class FormValidator {
    constructor(settings, formElement) {
        this._input = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._form = formElement;
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(formElement.querySelectorAll(this._input));
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.popup__input-error_${inputElement.id}`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.popup__input-error_${inputElement.id}`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        this.toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }

    _hasInvalidInput(inputList) {
        return inputList.some((input) => {
            return !input.validity.valid;
        });
    }

    toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}
export { settings, FormValidator };
