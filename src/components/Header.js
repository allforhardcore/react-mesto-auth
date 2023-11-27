import React, {useState} from 'react';
import headerLogo from '../images/logo.svg';

function Header({ isLoggedIn, isProfileEmail, onLogout }) {

  const [isClickBurgerMenu, setIsClickBurgerMenu] = useState(false);

  function handleClickBurgerMenu() {
    setIsClickBurgerMenu(!isClickBurgerMenu)
  }

  return (
    <header className={`${isLoggedIn ? 'header header_mobile' : 'header'}`}>
      <img href="#" aria-label="Логотип Mesto Russia" className="header__logo" src={headerLogo}/>
      {isLoggedIn && (
        <>
          <button className="menu" onClick={handleClickBurgerMenu}>
            <span className={`${isClickBurgerMenu ? 'menu__line menu__line_active' : 'menu__line'}`}></span>
          </button>
          <div className={`${isClickBurgerMenu ? 'profile-menu' : 'profile-menu profile-menu_inactive'}`}>
            <p className="profile-menu__email">{isProfileEmail}</p>
            <button
              onClick={() => {
                setIsClickBurgerMenu(!isClickBurgerMenu);
                onLogout();
              }}
              className="profile-menu__link fade-opacity"
            >
              Выйти
            </button>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
