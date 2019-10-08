"use strict";

(function () {

  // Функция получения рандомного числа
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Функция генерации доп.фцнкций жилья
  var getFeatures = function () {
    var newFeatures = [];
    var count = getRandomInt(0, features.length - 1);
    for (var i = 0; i < count; i++) {
      newFeatures[i] = features[i];
    }
    return newFeatures;
  };

  // Генерация получения массива ФОТО
  var getPhotos = function (min, max) {
    var photos = [];
    var count = getRandomInt(min, max);
    for (var i = 0; i < count; i++) {
      photos[i] =
        "http://o0.github.io/assets/images/tokyo/hotel" + (i + 1) + ".jpg";
    }
    return photos;
  };

  window.additionalFunctions = {
    'getFeatures': getFeatures,
    'getPhotos': getPhotos,
    'getRandomInt': getRandomInt
  }
})();
