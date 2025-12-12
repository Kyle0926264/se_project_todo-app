import { validationConfig as _settings } from "../utils/constants.js";

class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );

    this._submitButton = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    // Used for smooth fade-out
    this._fadeTimeout = null;
  }

  // ==========================
  //     PUBLIC METHODS
  // ==========================

  enableValidation() {
    this._setEventListeners();
  }

  disableSubmitButton() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  resetValidation() {
    clearTimeout(this._fadeTimeout);

    this._inputList.forEach((input) => {
      const errorElement = this._formElement.querySelector(
        `#${input.id}-error`
      );
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);
    });

    this._toggleButtonState(); // re-disable button after clearing
  }

  // ==========================
  //     PRIVATE METHODS
  // ==========================

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();

        // fade-out logic if valid while typing
        if (inputElement.validity.valid) {
          this._fadeOutError(inputElement);
        }
      });
    });
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    if (!inputElement.validity.valid) {
      this._showInputError(errorElement, inputElement.validationMessage);
    } else {
      this._hideInputError(errorElement);
    }
  }

  _showInputError(errorElement, errorMessage) {
    clearTimeout(this._fadeTimeout);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass); // fade IN (CSS handles it)
  }

  _hideInputError(errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
  }

  _fadeOutError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    clearTimeout(this._fadeTimeout);

    // wait 2 seconds with the message showing, THEN animate fade-out
    this._fadeTimeout = setTimeout(() => {
      errorElement.classList.remove(this._settings.errorClass); // CSS fades it OUT in 2s
    }, 2000); // keep message visible for 2 seconds before fade-out
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }
}

export default FormValidator;
