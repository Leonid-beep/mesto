import '../images/add-icon.svg';
import '../images/card_1.jpg';
import '../images/card_2.jpg';
import '../images/card_3.jpg';
import '../images/close.svg';
import '../images/delete-icon.svg';
import '../images/edit-icon.svg';
import '../images/like-active.svg';
import '../images/like-inactive.svg';
import '../images/logo.svg';
import '../images/avatar.jpg';
import '../vendor/fonts/Inter-Black.woff2';
import '../vendor/fonts/Inter-Medium.woff2';
import '../vendor/fonts/Inter-Regular.woff2';
import '../pages/index.css';
import './validate.js';
import './cards.js';
import './modal.js';

import {enableValidation, toggleButtonState} from './validate.js';
import {openModal, closeModal, closeByEsc} from './modal.js';
import {placesList, createCard} from './cards.js'

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonEdit = profilePopup.querySelector('.popup__close');
const closeButtonCard = cardPopup.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

export let popup = document.querySelectorAll('.popup');
//Добавление анимации каждой карточке
popup.forEach((item) => {
  item.classList.add('popup_is-animated');
})

// Обработчик нажатия на кнопку редактирования профиля
editButton.addEventListener('click', function() {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  const submitButton = profilePopup.querySelector(validationSettings.submitButtonSelector);
  if (submitButton.classList.contains(validationSettings.inactiveButtonClass)) {
    submitButton.classList.remove(validationSettings.inactiveButtonClass);
    submitButton.disabled = false;
  }
  openModal(profilePopup);
});
// Обработчик нажатия на кнопку закрытия редактирования профиля
closeButtonEdit.addEventListener('click', () => closeModal(profilePopup));

// Закрытие попапа редактирования нажатием на оверлей
profilePopup.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModal(profilePopup)
  }
});

const profileFormElement = profilePopup.querySelector('.popup__form');
// Сохранение данных, введенных в окно редактирования профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
// Обработчик нажатия на кнопку добавления новой карточки
addButton.addEventListener('click', function() {
  const cardName = document.querySelector('.popup__input_type_card-name');
  const cardURL = document.querySelector('.popup__input_type_url');
  cardName.value = '';
  cardURL.value = '';
  const inputList = Array.from(cardPopup.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = cardPopup.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  openModal(cardPopup);
});
// Обработчик нажатия на кнопку закрытия добавления новой карточки
closeButtonCard.addEventListener('click', () => closeModal(cardPopup));

// Закрытие попапа добавления карточки нажатием на оверлей
cardPopup.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModal(cardPopup)
  }
});

const cardFormElement = cardPopup.querySelector('.popup__form');
// Добавление новой карточки
function handlecardFormSubmit(evt) {
    evt.preventDefault();
    const cardName = document.querySelector('.popup__input_type_card-name');
    const cardURL = document.querySelector('.popup__input_type_url');
    placesList.prepend(createCard(cardName.value, cardURL.value));
    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handlecardFormSubmit);

export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

enableValidation(validationSettings);
