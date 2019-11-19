'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var OFFERS_AMMOUNT = 8;
  var TYPE_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
  var adForm = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var times = ['12:00', '13:00', '14:00'];
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var main = document.querySelector('main');

  var translateType = function (type) {
    var translateName;
    switch (type) {
      case 'palace':
        translateName = 'Дворец';
        break;
      case 'flat':
        translateName = 'Квартира';
        break;
      case 'house':
        translateName = 'Дом';
        break;
      case 'bungalo':
        translateName = 'Бунгало';
        break;
    }
    return translateName;
  };

  window.data = {
    'ENTER_KEYCODE': ENTER_KEYCODE,
    'ESC_KEYCODE': ESC_KEYCODE,
    'OFFERS_AMMOUNT': OFFERS_AMMOUNT,
    'adForm': adForm,
    'mapPins': mapPins,
    'TYPE_HOUSING': TYPE_HOUSING,
    'times': times,
    'map': map,
    'mainPin': mainPin,
    'main': main,
    'translateType': translateType
  };
})();
