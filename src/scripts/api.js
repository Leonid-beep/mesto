import {createCard, placesList} from './cards.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
  headers: {
    authorization: '3cf0ba86-8061-4f2c-930f-6d243543dd3d',
    'Content-Type': 'application/json'
  }
}

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      document.querySelector('.profile__title').textContent = result.name;
      document.querySelector('.profile__description').textContent = result.about;
      const profileAvatar = document.querySelector('.profile__image'),
      style = profileAvatar.currentStyle || window.getComputedStyle(profileAvatar, false),
      bi = style.backgroundImage.slice(4, -1).replace(/"/g, result.avatar);
    });
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      result.forEach(function (item) {
        placesList.append(createCard(item.name, item.link, item.likes.length, item._id));
      });
    });
}


export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      console.log('Профиль обновлен успешно:', result);
    });
}

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      console.log('Карточка успешно добавлена:', result);
    });
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      console.log('Карточка успешно удалена:', result);
    });
}
