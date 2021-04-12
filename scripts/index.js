let body = document.querySelector(".page");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close");
let profileEditor = document.querySelector(".popup");
let profileEditorForm = document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");
let popupName = document.querySelector(".popup__input_role_name");
let popupTitle = document.querySelector(".popup__input_role_title");
let card = document.querySelector(".card");
let card__heart = document.querySelector(".card__heart");
const hearts = Array.from(document.querySelectorAll(".card__heart"));

let profile = {};
updateProfile();

function updateProfile() {
  profile = {
    name: profileName.textContent,
    title: profileTitle.textContent,
  };
}

function editProfile() {
  updateProfile();

  popupName.value = profile.name;
  popupTitle.value = profile.title;
  profileEditor.classList.add("popup_opened");

  body.addEventListener("keyup", function escOut(e) {
    if (e.key === "Escape") {
      closeEditor();
    }
  });
}

function saveProfile(e) {
  e.preventDefault();

  profileName.textContent = popupName.value;
  profileTitle.textContent = popupTitle.value;

  updateProfile();
  closeEditor();
}

function closeEditor() {
  profileEditor.classList.remove("popup_opened");
}

function toggleHeart(evt) {
  evt.target.classList.toggle("card__heart_liked");
}

editButton.addEventListener("click", editProfile);
closeButton.addEventListener("click", closeEditor);
profileEditorForm.addEventListener("submit", saveProfile);

for (const heart of hearts) {
  heart.addEventListener("click", toggleHeart);
}
