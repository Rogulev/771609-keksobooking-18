'use strict';
(function () {

  var inputRoomNumber = document.querySelector('#room_number');
  var inputCapacity = document.querySelector('#capacity');
  var options = inputCapacity.querySelectorAll('option');
  var onFormSubmitButton = document.querySelector('.ad-form__submit');
  var mapFilter = document.querySelector('.map__filters');
  var pins = document.querySelectorAll('.map__pin--rendered');

  var NumberOfRooms = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    HUNDRED: '100'
  };

  var setMessage = function () {
    if (options[inputCapacity.selectedIndex].hasAttribute('disabled')) {
      inputCapacity.setCustomValidity('Количество людей указано не верно');
    }
  };

  // Сценарий сопоставления гостей и кол-во комнат  в форме
  var disabledOptions = function (opt) {
    window.render.includeElement(inputCapacity);
    inputCapacity.setCustomValidity('');

    if (opt >= 0 && opt <= 2) {
      options[options.length - 1].setAttribute('disabled', 'disabled');

      for (var i = 0; i < opt; i++) {
        options[i].setAttribute('disabled', 'disabled');
      }
    } else {
      for (var l = 0; l < options.length - 1; l++) {
        options[l].setAttribute('disabled', 'disabled');
      }
      options[options.length - 1].removeAttribute('disabled');
    }
    setMessage();
  };
  disabledOptions(2);

  var roomNumberCheck = function () {
    switch (inputRoomNumber.value) {
      case NumberOfRooms.ONE:
        disabledOptions(2);
        break;
      case NumberOfRooms.TWO:
        disabledOptions(1);
        break;
      case NumberOfRooms.THREE:
        disabledOptions(0);
        break;
      case NumberOfRooms.HUNDRED:
        disabledOptions(3);
        break;
    }
  };

  var inputTitle = document.querySelector('#title');
  var inputTitleValidityText = function () {
    inputTitle.setCustomValidity('');
  };

  // Чек инпута титла на случай нулевого заполнения
  var inputTitleCheck = function () {
    if (inputTitle.value < 30) {
      inputTitle.setCustomValidity('Заполните заголовок объявления более подробно');
      setTimeout(inputTitleValidityText, 1000);
    }
  };

  inputRoomNumber.addEventListener('change', roomNumberCheck);
  onFormSubmitButton.addEventListener('click', function () {
    roomNumberCheck();
    inputTitleCheck();
  });

  // Валидация аппартаментов vs цены
  var appartamentsPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var inputType = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');

  var displayMinPrice = function (price) {
    inputPrice.setAttribute('min', price);
    inputPrice.setAttribute('placeholder', price);
  };

  var inputTypeCheked = function () {
    switch (inputType.value) {
      case 'bungalo':
        displayMinPrice(appartamentsPrice.bungalo);
        break;
      case 'flat':
        displayMinPrice(appartamentsPrice.flat);
        break;
      case 'house':
        displayMinPrice(appartamentsPrice.house);
        break;
      case 'palace':
        displayMinPrice(appartamentsPrice.palace);
        break;
    }
  };
  inputTypeCheked(inputType.value);

  inputType.addEventListener('change', inputTypeCheked);

  // Валидация времени заезда/выезда
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var timeSynchronization = function (firstTime, secondTime) {
    switch (firstTime.value) {
      case '12:00':
        secondTime.value = '12:00';
        break;
      case '13:00':
        secondTime.value = '13:00';
        break;
      case '14:00':
        secondTime.value = '14:00';
        break;
    }
  };

  timeIn.addEventListener('change', function () {
    timeSynchronization(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    timeSynchronization(timeOut, timeIn);
  });

  // Деактивация после отправки формы
  var deactivateForms = function () {
    if (!window.data.map.classList.contains('map--faded')) {
      window.data.map.classList.add('map--faded');
    }

    if (!window.data.adForm.classList.contains('ad-form--disabled')) {
      window.data.adForm.classList.add('ad-form--disabled');
    }
  };

  var removePins = function () {
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var prepareForm = function () {
    removePins(pins);
    form.reset();
    window.data.mainPin.style.top = '375px';
    window.data.mainPin.style.left = '570px';
    window.events.coordinatePinInput(window.events.getCoordinatePinStart.x, window.events.getCoordinatePinStart.y);
    deactivateForms();
  };

  var form = document.querySelector('.ad-form');
  var templateSucces = document.querySelector('#success').content.querySelector('.success');

  // Дейстия при отправке формы
  var onSubmitSucces = function () {
    window.render.disabledElement(window.render.adForm);
    window.render.disabledElement(window.render.mapFilters);
    window.card.closePopup();
    prepareForm();

    var succes = templateSucces.cloneNode(true);
    window.data.main.prepend(succes);

    var succesElem = document.querySelector('.success');

    var removeSucces = function () {
      succesElem.remove();
    };

    window.events.addEvents(document, ['keydown', 'click'], removeSucces);

    window.data.mainPin.addEventListener('mousedown', window.render.mainUnblocking);

    window.data.mainPin.addEventListener('keydown', window.render.onPinEnterPress);
  };
  // Сброс страницы
  var mainReset = function () {
    onSubmitSucces();
    mapFilter.reset();
    window.events.addEvents(window.data.mainPin, ['keydown', 'click'], window.render.renderPins);
    window.data.mainMapPin.addEventListener('mousedown', window.events.onMainPinMove);
    window.data.mainPin.addEventListener('mousedown', window.render.mainUnblocking);
  };

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', mainReset);

  // window.events.addEvents(resetButton, ['keydown', 'click'], mainReset);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.saveData(new FormData(form), onSubmitSucces, window.onError);
  });
  window.form = {
    'inputTitleCheck': inputTitleCheck,
    'removePins': removePins
  };
})();
