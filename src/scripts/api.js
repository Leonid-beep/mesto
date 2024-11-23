import {createCard, placesList} from './cards.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
  headers: {
    authorization: '3cf0ba86-8061-4f2c-930f-6d243543dd3d',
    'Content-Type': 'application/json'
  }
}

export let currentUserId = null;

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
      currentUserId = result._id;
      document.querySelector('.profile__title').textContent = result.name;
      document.querySelector('.profile__description').textContent = result.about;
      const profileAvatar = document.querySelector('.profile__image');
      profileAvatar.style.backgroundImage = `url(${result.avatar})`;
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
        const cardElement = createCard(item.name, item.link, item.likes.length, item._id, item.owner._id, item.likes.map(like => like._id));
        const deleteButton = cardElement.querySelector('.card__delete-button');
        if (item.owner._id !== currentUserId) {
          deleteButton.hidden = true;
        }
        placesList.append(cardElement);
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
      return result;
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

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      console.log('Лайк поставлен:', result);
    });
}

export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
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
      console.log('Лайк убран:', result);
    });
}

export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      console.log('Аватар обновлен:', result);
    });
}
