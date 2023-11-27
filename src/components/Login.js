import { useState } from 'react';
import useValidation from "../hooks/useValidation";


export default function Login({ onLogin }) {

  // Созданиее стейт переменных для валидации
  const [isEmail, setIsEmail] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const {
    inputEmailValid,
    inputEmailError,
    inputEmailTouched
  } = useValidation(isEmail, { isEmpty: true, isEmail: true }, 'Email');
  const {
    inputPasswordValid,
    inputPasswordError,
    inputPasswordTouched
  } = useValidation(isPassword, { isEmpty: true, minLength: 5 }, 'Password');

  // Устанавливаем Email пользователя
  function handleChangeEmail(event) {
    setIsEmail(event.target.value);
  }

  // Устанавливаем пароль пользователя
  function handleChangePassword(event) {
    setIsPassword(event.target.value);
  }

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    onLogin(isEmail, isPassword);
  }


  return (
    <form
      className="authorization"
      onSubmit={handleSubmit}
      name="signInForm"
      noValidate
    >
      <h2 className="authorization__title">Вход</h2>
      <input
        value={isEmail || ''}
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
        value={isPassword || ''}
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
      <button className="authorization__button" type="submit" aria-label="Кнопка входа">Войти</button>
    </form>
  )

}