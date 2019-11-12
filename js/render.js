'use strict';
(function () {
  // Отрисовка pin на карте
  var renderPins = function (array) {
    var templatePin = document
      .querySelector('#pin')
      .content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var element = templatePin.cloneNode(true);
      var img = element.querySelector('img');
      element.setAttribute('style', 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px;');
      img.setAttribute('src', array[i].author.avatar);
      img.setAttribute('alt', array[i].offer.title);
      fragment.appendChild(element);
    }
    window.data.mapPins.appendChild(fragment);
    window.setEventPin(array);
  };

  // Добавление disabled на Формы
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  var formDisabled = function () {
    for (var i = 0; i < adForm.children.length; i++) {
      adForm.children[i].setAttribute('disabled', true);
    }
    for (var k = 0; k < mapFilters.children.length; k++) {
      mapFilters.children[k].setAttribute('disabled', true);
    }
  };
  formDisabled();

  window.onSuccess = function (pins) {
    renderPins(pins);
  };

  window.onError = function () {
    var templateError = document.querySelector('#error').content.querySelector('.error');
    var error = templateError.cloneNode(true);
    document.querySelector('body').prepend(error);

    var onBtnErrorClick = function () {
      document.querySelector('.error').remove();
      btnError.removeEventListener('click', onBtnErrorClick);
      window.deactivateForms();
      window.isActive = false;
    };
    var btnError = document.querySelector('.error__button');
    btnError.addEventListener('click', onBtnErrorClick);
  };

  // Добавление активации страницы по клику
  var mainUnblocking = function () {
    formUnblocking();
    window.backend.load(window.onSuccess, window.onError);
  };


  var onPinEnterPress = function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      mainUnblocking();
    }
  };

  var formUnblocking = function () {
    window.data.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < adForm.children.length; i++) {
      adForm.children[i].removeAttribute('disabled', true);
    }
    for (var k = 0; k < mapFilters.children.length; k++) {
      mapFilters.children[k].removeAttribute('disabled', true);
    }
    window.data.mainPin.removeEventListener('mousedown', mainUnblocking);

    window.data.mainPin.removeEventListener('keydown', onPinEnterPress);
  };

  window.data.mainPin.addEventListener('mousedown', mainUnblocking);

  window.data.mainPin.addEventListener('keydown', onPinEnterPress);
})();
