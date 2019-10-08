"use strict";
(function () {
  // Отрисовка pin на карте
  var renderPins = function (info) {
    var template = document
      .querySelector("#pin")
      .content.querySelector(".map__pin");
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.fillingBooking.bookingInfo.length; i++) {
      var element = template.cloneNode(true);
      var img = element.querySelector("img");
      element.style.left = info[i].location.x + "px";
      element.style.top = info[i].location.y + "px";
      img.src = info[i].autor.avatar;
      img.alt = info[i].offer.type;
      fragment.appendChild(element);
    }
    window.data.mapPins.appendChild(fragment);
  };

  //Вычисление координат стартовой метки
  var coordinatePinStart = {
    y: Math.round(window.data.mapPins.offsetHeight / 2 + window.data.mainMapPin.offsetHeight / 2)
  };

  //Заполнение поля адреса
  window.data.inputAddress.value = coordinatePinStart.x + "," + coordinatePinStart.y;

  // Добавление disabled на Формы
  var adForm = document.querySelector(".ad-form");
  var mapFilters = document.querySelector(".map__filters");

  var formDisabled = function () {
    for (var i = 0; i < adForm.children.length; i++) {
      adForm.children[i].setAttribute("disabled", true);
    }
    for (var i = 0; i < mapFilters.children.length; i++) {
      mapFilters.children[i].setAttribute("disabled", true);
    }
  };
  formDisabled();

  // Добавление активации страницы по клику
  var mainUnblocking = function () {
    formUnblocking(), renderPins(window.fillingBooking.bookingInfo);
  };

  var onPinEnterPress = function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      mainUnblocking();
    }
  };

  var formUnblocking = function () {
    window.data.map.classList.remove("map--faded");
    adForm.classList.remove("ad-form--disabled");

    for (var i = 0; i < adForm.children.length; i++) {
      adForm.children[i].removeAttribute("disabled", true);
    }
    for (var i = 0; i < mapFilters.children.length; i++) {
      mapFilters.children[i].removeAttribute("disabled", true);
    }
    window.data.mainPin.removeEventListener("mousedown", mainUnblocking);

    window.data.mainPin.removeEventListener("keydown", onPinEnterPress);
  };

  window.data.mainPin.addEventListener("mousedown", mainUnblocking);

  window.data.mainPin.addEventListener("keydown", onPinEnterPress);
})();
