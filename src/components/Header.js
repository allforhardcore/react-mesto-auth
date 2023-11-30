import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import headerLogo from '../images/logo.svg';

function Header({ loggedIn, authUserEmail, onSingOut, goToSignUp, goToSignIn }) {
  const [isClickBurgerMenu, setIsClickBurgerMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsClickBurgerMenu(false);
  }, [location]);

  function handleClickBurgerMenu() {
    setIsClickBurgerMenu(!isClickBurgerMenu);
  }

  return (
    <header className={`${loggedIn ? 'header header_mobile' : 'header'}`}>
      <img aria-label="Логотип Mesto Russia" className="header__logo" src={headerLogo} alt="Logo" />

      {loggedIn ? (
        <>
          <button className="menu" onClick={handleClickBurgerMenu}>
            <span className={`${isClickBurgerMenu ? 'menu__line menu__line_active' : 'menu__line'}`}></span>
            <span className={`${isClickBurgerMenu ? 'menu__line menu__line_active' : 'menu__line'}`}></span>
            <span className={`${isClickBurgerMenu ? 'menu__line menu__line_active' : 'menu__line'}`}></span>
          </button>

          <div className={`${isClickBurgerMenu ? 'profile-menu' : 'profile-menu profile-menu_inactive'}`}>
            <p className="profile-menu__email">{authUserEmail}</p>
            <button
              onClick={() => {
                setIsClickBurgerMenu(!isClickBurgerMenu);
                onSingOut();
              }}
              className="profile-menu__link"
            >
              Выйти
            </button>
          </div>
        </>
      ) : (
        <>
          {location.pathname !== '/sign-up' && (
            <Link to='sign-up' className="header__link" onClick={goToSignUp}>
              Регистрация
            </Link>
          )}
          {location.pathname !== '/sign-in' && (
            <Link to='sign-in' className="header__link" onClick={goToSignIn}>
              Войти
            </Link>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
