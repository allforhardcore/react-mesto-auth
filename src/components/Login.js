import { useState } from 'react';
import useValidation from "../hooks/useValidation";


export default function Login({ onLogin }) {

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

  // Устанавливаем Email пользователя
  function handleSetEmail(event) {
    setEmail(event.target.value);
  }

  // Устанавливаем пароль пользователя
  function handleSetPassword(event) {
    setPassword(event.target.value);
  }

  // Запрет браузера на переход по адресу формы
  function handleSubmit(event) {
    event.preventDefault();
    onLogin(email, password);
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
        value={email || ''}
        onChange={handleSetEmail}
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
        onChange={handleSetPassword}
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