class AuthApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    // Обработка ответа сервера
    handleServerResponse(result) {
        if (result.ok) {
            return result.json();
        } else {
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${result.status}`);
        }
    }

    // Регистрация 
    userRegister(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => this.handleServerResponse(res));
    }

    // Вход 
    userLogin(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => this.handleServerResponse(res));
    }

    // Проверка токена
    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => this.handleServerResponse(res));
    }
}

const authApi = new AuthApi('https://auth.nomoreparties.co');

export default authApi;