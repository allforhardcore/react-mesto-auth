import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useValidation from "../hooks/useValidation";

export default function Register({ onRegister }) {

  // Созданиее стейт переменных для валидации
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const {
    inputEmailValid,
    inputEmailError,
    inputEmailTouched
  } = useValidation(Email, { isEmpty: true, Email: true }, 'Email');
  const {
    inputPasswordValid,
    inputPasswordError,
    inputPasswordTouched
  } = useValidation(Password, { isEmpty: true, minLength: 5 }, 'Password');


  // Устанавливаем Email пользователя
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }


  // Устанавливаем пароль пользователя
  function handleChangePassword(event) {
    setPassword(event.target.value);
  }


  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    onRegister(Email, Password);
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
        value={Email || ''}
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
        value={Password || ''}
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