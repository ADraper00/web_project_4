export const body = document.querySelector(".page");
export const profileName = document.querySelector(".profile__name");
export const profileTitle = document.querySelector(".profile__title");
export const placesContainer = ".cards";

export const editButton = document.querySelector(".profile__edit-button");
//export const closeProfileEditor = document.querySelector(".popup__close_role_edit");

export const profileEditorForm = document.querySelector(".popup__form_role_edit");
export const popupName = document.querySelector(".popup__input_role_name");
export const popupTitle = document.querySelector(".popup__input_role_title");

export const addButton = document.querySelector(".profile__add-button");
//export const closeImageAdder = document.querySelector(".popup__close_role_add");

export const imageAdderForm = document.querySelector(".popup__form_role_add");
//export const popupImageTitle = document.querySelector(".popup__input_role_image-title");
//export const popupImageLink = document.querySelector(".popup__input_role_image-link");
//export const closePreviewButton = document.querySelector(".popup__close_role_image");

//export const popupImage = document.querySelector(".popup__image");
//export const popupImageCaption = document.querySelector(".popup__caption");
//export const cardTemplate = "#place-template";
export const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg",
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
