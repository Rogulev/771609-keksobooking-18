"use strict";
(function () {
  // Отрисовка pin на карте
  var renderPins = function (info) {
    var template = document
      .querySelector("#pin")
      .content.querySelector(".map__pin");
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < bookingInfo.length; i++) {
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

  // Добавление активации страницы по клику
  var mainUnblocking = function () {
    formUnblocking(), renderPins(bookingInfo);
  };

  var onPinEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      mainUnblocking();
    }
  };

  var formUnblocking = function () {
    map.classList.remove("map--faded");
    adForm.classList.remove("ad-form--disabled");

    for (var i = 0; i < adForm.children.length; i++) {
      adForm.children[i].removeAttribute("disabled", true);
    }
    for (var i = 0; i < mapFilters.children.length; i++) {
      mapFilters.children[i].removeAttribute("disabled", true);
    }
    mainPin.removeEventListener("mousedown", mainUnblocking);

    mainPin.removeEventListener("keydown", onPinEnterPress);
  };

  mainPin.addEventListener("mousedown", mainUnblocking);

  mainPin.addEventListener("keydown", onPinEnterPress);
})();
