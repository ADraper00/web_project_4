import Card from "./Card.js"
import { settings, FormValidator } from "./FormValidator.js"

const body = document.querySelector(".page");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const placesContainer = document.querySelector(".cards");

const editButton = document.querySelector(".profile__edit-button");
const closeProfileEditor = document.querySelector(".popup__close_role_edit");
const profileEditor = document.querySelector(".popup_role_edit");
const profileEditorForm = document.querySelector(".popup__form_role_edit");
const popupName = document.querySelector(".popup__input_role_name");
const popupTitle = document.querySelector(".popup__input_role_title");

const addButton = document.querySelector(".profile__add-button");
const closeImageAdder = document.querySelector(".popup__close_role_add");
const newPlaceAdder = document.querySelector(".popup_role_add");
const imageAdderForm = document.querySelector(".popup__form_role_add");
const popupImageTitle = document.querySelector(".popup__input_role_image-title");
const popupImageLink = document.querySelector(".popup__input_role_image-link");
const closePreviewButton = document.querySelector(".popup__close_role_image");
const imagePreview = document.querySelector(".popup_role_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

const addPlaceValidation = new FormValidator(settings, imageAdderForm);
const profileValidation = new FormValidator(settings, profileEditorForm);
profileValidation.enableValidation();
addPlaceValidation.enableValidation();

let profile = {};
updateProfile();

const initialCards = [
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

initialCards.forEach((place) => {
    addPlace(place);
});

function updateProfile() {
    profile = {
        name: profileName.textContent,
        title: profileTitle.textContent,
    };
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeWithEscape);
    document.addEventListener("click", clickAway);
}
function editProfile() {
    popupName.value = profile.name;
    popupTitle.value = profile.title;
    profileValidation.toggleButtonState();
    openPopup(profileEditor);
}
function openPlaceAdder() {
    addPlaceValidation.toggleButtonState();
    openPopup(newPlaceAdder);
    popupImageTitle.value = "";
    popupImageLink.value = "";
}

function createCard(data) {
    const newPlace = new Card(data, "#place-template", openPopup);
    return newPlace.createCard();
}

function closePopup() {
    const openPopup = document.querySelector(".popup_opened");
    openPopup.classList.remove("popup_opened");

    document.removeEventListener("keydown", closeWithEscape);
    document.removeEventListener("click", clickAway);
}

function addPlace(data) {
    placesContainer.prepend(createCard(data));
}

function savePlace(evt) {
    evt.preventDefault();
    const newPlace = {
        name: popupImageTitle.value,
        link: popupImageLink.value,
    };
    addPlace(newPlace);
    closePopup();
    evt.target.reset();
}

function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileTitle.textContent = popupTitle.value;
    updateProfile();
    closePopup();
    evt.target.reset();
}
function closeWithEscape(evt) {
    if (evt.key === "Escape") {
        closePopup();
    }
}
function clickAway(evt) {
    if (evt.target.classList.contains("popup_opened")) {
        closePopup();
    }
}

editButton.addEventListener("click", editProfile);
addButton.addEventListener("click", openPlaceAdder);
closeProfileEditor.addEventListener("click", closePopup);
closeImageAdder.addEventListener("click", closePopup);
closePreviewButton.addEventListener("click", closePopup);
profileEditorForm.addEventListener("submit", saveProfile);
imageAdderForm.addEventListener("submit", savePlace);

export { openPopup, imagePreview, popupImage, popupImageCaption };
