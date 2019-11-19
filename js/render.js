'use strict';
(function () {
  var MAX_PINS_DRAWING = 5;

  // Добавление disabled на Формы
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  var disabledElement = function (elem) {
    for (var i = 0; i < elem.children.length; i++) {
      elem.children[i].setAttribute('disabled', true);
    }
  };

  disabledElement(adForm);
  disabledElement(mapFilters);

  // Отрисовка pin на карте
  var renderPins = function (array) {
    var templatePin = document
      .querySelector('#pin')
      .content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();
    if (array.length > MAX_PINS_DRAWING) {
      array.length = MAX_PINS_DRAWING;
    }
    for (var i = 0; i < array.length; i++) {
      var element = templatePin.cloneNode(true);
      var img = element.querySelector('img');
      element.setAttribute('style', 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;');
      img.setAttribute('src', array[i].author.avatar);
      img.setAttribute('alt', array[i].offer.title);
      fragment.appendChild(element);
    }
    window.data.mapPins.appendChild(fragment);
    window.card.setEventPin(array);
  };

  // Рендер пинов при удачной загрузки даных
  var onSuccess = function (pins) {
    renderPins(pins);
  };

  // Показ окна ошибки при неудачной отправке
  var onError = function () {
    var templateError = document.querySelector('#error').content.querySelector('.error');
    var error = templateError.cloneNode(true);
    document.querySelector('body').prepend(error);
    // Снятие окна ошибки кликом
    var onBtnErrorClick = function () {
      document.querySelector('.error').remove();
      btnError.removeEventListener('click', onBtnErrorClick);
      window.isActive = false;
    };
    var btnError = document.querySelector('.error__button');
    btnError.addEventListener('click', onBtnErrorClick);
  };

  // Добавление активации страницы по клику
  var mainUnblocking = function () {
    formUnblocking();
    window.backend.loadData(onSuccess, onError);
  };


  var onPinEnterPress = function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      mainUnblocking();
    }
  };

  // удаление дизейблов
  var includeElement = function (elem) {
    for (var i = 0; i < elem.children.length; i++) {
      elem.children[i].removeAttribute('disabled', true);
    }
  };

  var formUnblocking = function () {
    window.data.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    includeElement(adForm);
    includeElement(mapFilters);

    window.data.mainPin.removeEventListener('mousedown', mainUnblocking);

    window.data.mainPin.removeEventListener('keydown', onPinEnterPress);
  };

  window.data.mainPin.addEventListener('mousedown', mainUnblocking);

  window.data.mainPin.addEventListener('keydown', onPinEnterPress);

  window.render = {
    'formUnblocking': formUnblocking,
    'onPinEnterPress': onPinEnterPress,
    'mainUnblocking': mainUnblocking,
    'disabledElement': disabledElement,
    'includeElement': includeElement,
    'adForm': adForm,
    'mapFilters': mapFilters,
    'renderPins': renderPins
  };
})();
