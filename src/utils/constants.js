
export const placesContainerSelector = ".cards";
export const editButton = document.querySelector('.profile__edit-button');
export const profileEditorForm = document.querySelector('.popup__form_role_edit');
export const avatarButton = document.querySelector('.profile__avatar-overlay');
export const avatarUpdateForm = document.querySelector('.popup__form_role_avatar');
export const addButton = document.querySelector('.profile__add-button');
export const imageAdderForm = document.querySelector('.popup__form_role_add');
export const profileNameElement = document.querySelector('.profile__name');
export const profileAboutElement = document.querySelector('.profile__title');
export const profileAvatarElement = document.querySelector('.profile__avatar');
export const popupName = document.querySelector('.popup__input_role_name');
export const popupTitle = document.querySelector('.popup__input_role_title');
export const popupChangeAvatar = ".popup_type_avatar";
export const popupProfileEditor = ".popup_role_edit";
export const popupNewPlaceAdder = ".popup_role_add";
export const popupImagePreview = ".popup_role_image";
export const placeTemplate = "#place-template";

export const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
];

export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error_active",
};