"use strict";
(function () {
  var ENTER_KEYCODE = 13;
  var OFFERS_AMMOUNT = 8;
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var mapPins = document.querySelector(".map__pins");
  var mainMapPin = document.querySelector(".map__pin--main");
  var TYPE_HOUSING = ["palace", "flat", "house", "bungalo"];
  var times = ["12:00", "13:00", "14:00"];
  /*var features = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner"
  ];*/
  var inputAddress = document.getElementById("address");
  var map = document.querySelector(".map");
  var mainPin = document.querySelector(".map__pin--main");

  window.data = {
    'ENTER_KEYCODE': ENTER_KEYCODE,
    'OFFERS_AMMOUNT': OFFERS_AMMOUNT,
    'MIN_X': MIN_X,
    'MAX_X': MAX_X,
    'MIN_Y': MIN_Y,
    'MAX_Y': MAX_Y,
    'mapPins': mapPins,
    'mainMapPin': mainMapPin,
    'TYPE_HOUSING': TYPE_HOUSING,
    'times': times,
    //'features': features,
    'inputAddress': inputAddress,
    'map': map,
    'mainPin': mainPin
  };
})();
