export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = {
      authorization: options.authorization,
      'Content-Type': 'application/json',
    };
  };

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Что-то пошло не так... (${response.status})`);
  }

  _request(url, method, data) {
    const options = {
      method: method,
      headers: this.headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    return fetch(`${this.baseUrl}${url}`, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request('/users/me', 'GET');
  }

  getInitialCards() {
    return this._request('/cards', 'GET');
  }

  editUserInfo(data) {
    return this._request('/users/me', 'PATCH', data);
  }

  setAvatar(data) {
    return this._request('/users/me/avatar', 'PATCH', data);
  }

  addCard(data) {
    return this._request('/cards', 'POST', data);
  }

  removeCard(cardId) {
    return this._request(`/cards/${cardId}`, 'DELETE');
  }

  likeCard(cardId) {
    return this._request(`/cards/likes/${cardId}`, 'PUT');
  }

  removeLike(cardId) {
    return this._request(`/cards/likes/${cardId}`, 'DELETE');
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return this._request(`/cards/likes/${cardId}`, method);
  }
 
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-76',
  authorization: '5cd71d81-2a88-497e-99eb-8405496caa7c',
});

export default api;