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
})();
