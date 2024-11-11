let profilePopup = document.querySelector('.popup_type_edit');
let cardPopup = document.querySelector('.popup_type_new-card');
let imagePopup = document.querySelector('.popup_type_image');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButtonEdit = profilePopup.querySelector('.popup__close');
let closeButtonCard = cardPopup.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

editButton.addEventListener('click', function() {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openModal(profilePopup);
});

closeButtonEdit.addEventListener('click', function () {
  closeModal(profilePopup);
});

const profileFormElement = profilePopup.querySelector('.popup__form');
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', function() {
  let cardName = document.querySelector('.popup__input_type_card-name');
  let cardURL = document.querySelector('.popup__input_type_url');
  cardName.value = '';
  cardURL.value = '';
  openModal(cardPopup);
});

closeButtonCard.addEventListener('click', function () {
  closeModal(cardPopup);
});

const cardFormElement = cardPopup.querySelector('.popup__form');
function handlecardFormSubmit(evt) {
    evt.preventDefault();
    let cardName = document.querySelector('.popup__input_type_card-name');
    let cardURL = document.querySelector('.popup__input_type_url');
    placesList.prepend(createCard(cardName.value, cardURL.value));
    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handlecardFormSubmit);
