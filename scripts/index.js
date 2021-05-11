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
const imagePreview = document.querySelector(".popup_role_image");
const closePreviewButton = document.querySelector(".popup__close_role_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

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
    addPlace(place.name, place.link);
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
    updateProfile();
    popupName.value = profile.name;
    popupTitle.value = profile.title;
    openPopup(profileEditor);
}

function openPlaceAdder() {
    openPopup(newPlaceAdder);
    popupImageTitle.value = "";
    popupImageLink.value = "";
}

function createCard(title, link) {
    const placeTemplate = document.querySelector("#place-template").content;
    const newPlace = placeTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = newPlace.querySelector(".card__delete");
    deleteButton.addEventListener("click", (evt) => evt.target.parentElement.remove());
    const likeButton = newPlace.querySelector(".card__heart");
    likeButton.addEventListener("click", (evt) => evt.target.classList.toggle("card__heart_liked"));
    const placeImage = newPlace.querySelector(".card__image");
    placeImage.addEventListener("click", openPreview);
    newPlace.querySelector(".card__title").textContent = title;
    placeImage.src = link;
    placeImage.alt = `${title}`;
    return newPlace;
}

function addPlace(title, link) {
    const newPlace = createCard(title, link);
    placesContainer.prepend(newPlace);
}

function savePlace(evt) {
    evt.preventDefault();
    addPlace(popupImageTitle.value, popupImageLink.value);
    closePopup();
}

function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileTitle.textContent = popupTitle.value;
    updateProfile();
    closePopup();
}

function closePopup() {
    const openPopup = document.querySelector(".popup_opened");
    openPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeWithEscape);
    document.removeEventListener("click", clickAway);
}

function openPreview(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt;
    openPopup(imagePreview);
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