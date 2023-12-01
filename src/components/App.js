import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import ConfirmPopup from './ConfirmPopup';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';


import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip';
import Auth from '../utils/Auth';

function App() {

  const [currentUser, setCurrentUser] = useState({});




  // Стейты попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsEditPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);


  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmPopupOpen

  // Стейты данных пользователя и карточек

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // Стейты входа
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [authUserEmail, setAuthUserEmail] = useState('');

  const navigate = useNavigate();

  // Проверка токена и авторизация 
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && !isloggedIn) {
      Auth.checkToken(jwt)
        .then(data => {
          if (data) {
            setAuthUserEmail(data.data.email)
            setIsloggedIn(true)
            navigate('/', { replace: true });
          }
        })
        .catch(error => { console.log(error); })
    }
  }, [navigate]);

  // Обработчик регистрации пользователя
  function handleuserRegister(email, password) {
    Auth.userRegister(email, password)
      .then(data => {
        if (data) {
          setIsTooltipSuccess(true);
          navigate('/sign-in');
        }
      })
      .catch(error => {
        setIsTooltipSuccess(false);
        console.log(error);
      })
      .finally(() => setIsTooltipPopupOpen(true));
  }

  // Вход в аккаунт
  function handleuserLogin(email, password) {
    Auth.userLogin(email, password)
      .then(data => {
        if (data.token) {
          setAuthUserEmail(email)
          setIsloggedIn(true);
          localStorage.setItem('jwt', data.token);
          navigate('/', { replace: true });
        }
      })
      .catch(error => {
        setIsTooltipPopupOpen(true);
        setIsTooltipSuccess(false);
        console.log(error)
      })
  }

  // Выход из аккаунта
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setAuthUserEmail('')
    setIsloggedIn(false);
    navigate('/sign-in');
  }


  // Получение данных пользователя и карточек
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Проверяем, авторизован ли пользователь
        if (isloggedIn) {
          const [userData, cardsData] = await Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
          ]);

          setCurrentUser(userData);
          setCards(cardsData);
        }
      } catch (error) {
        console.error('Произошла ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, [isloggedIn]);


  function handleCardClick(props) {
    setSelectedCard(props);
  }

  // Обработчик открытия попапа аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  // Обработчик открытия попапа профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  // Обработчик открытия попапа добавления карточки
  function handleAddPlaceClick() {
    setIsEditPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setIsTooltipPopupOpen(false);

  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем статус лайка на карточке
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
    })
      .catch(console.error);
  }

  // Запроса удаления карточки
  function handleCardDeleteRequest(card) {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }

  // Функция удаления карточки
  function handleCardDelete(evt) {
    evt.preventDefault();
    api.removeCard(selectedCard._id)
      .then(
        () => {
          const newCards = cards.filter((elem) => elem !== selectedCard);
          setCards(newCards);
          closeAllPopups();
        },
        (err) => {
          console.log(err);
        }
      )
  }

  // Обработчик обновления данных пользвателя
  function handleUpdateUser(user) {
    const userData = {
      name: user.name,
      about: user.about
    };


    api.editUserInfo(userData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  // Обработчик обновления аватара
  function handleUpdateAvatar(user) {
    api.setAvatar({ avatar: user.avatar })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
  }

  // Обработчик добавления карточки
  function handleAddPlaceSubmit(card) {
    const cardData = {
      name: card.name,
      link: card.link,
      owner: currentUser._id
    };

    api.addCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">

        <PopupWithForm />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          selectedCard={selectedCard}
        />

        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isTooltipSuccess}
        />

        <Header
          loggedIn={isloggedIn}
          onSingOut={handleLogout}
          authUserEmail={authUserEmail}
        />

        <Routes>
          <Route path="/sign-up" element={<Register onRegister={handleuserRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleuserLogin} />} />
          <Route
            path="*"
            element={
              isloggedIn ? (
                <Routes>
                  <Route path="/" element={<Main />} />
                </Routes>
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onSubmit={handleCardDelete}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDeleteRequest={handleCardDeleteRequest}
                onCardDelete={handleCardDelete}
                loggedIn={isloggedIn}
              />
            }
          />
        </Routes>

        <Footer />

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;


