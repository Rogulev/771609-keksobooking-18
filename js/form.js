'use strict';
(function () {
  // Сценарий сопоставления гостей и кол-во комнат  в форме

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var options = capacity.querySelectorAll('option');

  var disabledOptions = function (opt) {
    for (var i = 0; i < options.length - 1; i++) {
      options[i].removeAttribute('disabled', 'disabled');
    }

    if (opt >= 0 && opt <= 2) {
      options[options.length - 1].setAttribute('disabled', 'disabled');

      for (var k = 0; k < opt; k++) {
        options[i].setAttribute('disabled', 'disabled');
      }
    } else {
      for (var l = 0; l < options.length - 1; l++) {
        options[l].setAttribute('disabled', 'disabled');
      }
      options[options.length - 1].removeAttribute('disabled');
    }
  };

  roomNumber.addEventListener('change', function () {
    switch (roomNumber.value) {
      case '1':
        disabledOptions(2);
        // capacity.setCustomValidity('Количество гостей не более 1');
        break;
      case '2':
        disabledOptions(1);
        // capacity.setCustomValidity('Количество гостей не более 2');
        break;
      case '3':
        disabledOptions(0);
        // capacity.setCustomValidity('Количество гостей не более 3');
        break;
      case '100':
        disabledOptions(3);
        // capacity.setCustomValidity('Не для гостей');
        break;
    }
  });

  // Валидация аппартаментов vs цены
  var appartamentsType = document.querySelector('#type');
  var appartamentsPrice = document.querySelector('#price')

  var displayMinPrice = function (price) {
    appartamentsPrice.setAttribute('minlength', price)
    appartamentsPrice.setAttribute('placeholder', price)
  }

  appartamentsType.addEventListener('change', function () {
    switch (appartamentsType.value) {
      case 'bungalo':
        displayMinPrice(0);
      break;
    case 'flat':
      displayMinPrice(1000);
      break;
    case 'house':
      displayMinPrice(5000);
      break;
    case 'palace':
      displayMinPrice(10000);
      break;
    }
  })

  // Валидация времени заезда/выезда
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var timeSynchronization = function (firstTime, secondTime) {
    switch (firstTime.value) {
      case '12:00':
        secondTime.value = "12:00";
      break;
      case '13:00':
        secondTime.value = "13:00";
      break;
      case '14:00':
        secondTime.value = "14:00";
      break;
    }
  };

  timeIn.addEventListener('change', function () {
    timeSynchronization(timeIn, timeOut)
  });

  timeOut.addEventListener('change', function () {
    timeSynchronization(timeOut, timeIn)
  });
})();
