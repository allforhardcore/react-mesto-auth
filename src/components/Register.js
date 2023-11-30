import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useValidation from "../hooks/useValidation";

export default function Register({ onRegister }) {

  // Созданиее стейт переменных для валидации
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    inputEmailValid,
    inputEmailError,
    inputEmailTouched
  } = useValidation(email, { isEmpty: true, email: true }, 'Email');
  const {
    inputPasswordValid,
    inputPasswordError,
    inputPasswordTouched
  } = useValidation(password, { isEmpty: true, minLength: 5 }, 'Password');


  // Устанавка Email 
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  // Установка пароля
  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  // Запрет браузера на переход по адресу формы
  function handleSubmit(event) {
    event.preventDefault();
    onRegister(email, password);
  }

  return (
    <form
      className="authorization"
      onSubmit={handleSubmit}
      name="signUpForm"
      noValidate
    >
      <h2 className="authorization__title">Регистрация</h2>
      <input
        value={email || ''}
        onChange={handleChangeEmail}
        className={`authorization__field ${!inputEmailValid && inputEmailTouched && 'authorization__field_type_error'}`}
        placeholder="Email"
        type="email"
        name="email"
        id="emailInput"
        autoComplete="off"
      />
      <span className={`authorization__input-error ${!inputEmailValid && inputEmailTouched && 'authorization__input-error_active'}`}>
        {inputEmailError}
      </span>
      <input
        value={password || ''}
        onChange={handleChangePassword}
        className={`authorization__field ${!inputPasswordValid && inputPasswordTouched && 'authorization__field_type_error'}`}
        placeholder="Пароль"
        type="password"
        name="password"
        id="passwordInput"
        autoComplete="off"
      />
      <span className={`authorization__input-error ${!inputPasswordValid && inputPasswordTouched && 'authorization__input-error_active'}`}>
        {inputPasswordError}
      </span>
      <button className="authorization__button" type="submit" aria-label="Кнопка регистрации">Зарегистрироваться</button>
      <Link to="/sign-in" className="authorization__link fade-opacity">Уже зарегистрированы? Войти</Link>
    </form>
  )

}