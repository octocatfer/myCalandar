window.onload = function() {
  var monthName = document.getElementById('monthName');
  var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre',
                'Diciembre'];
  var btnBack = document.getElementById('back');
  var btnForward = document.getElementById('forward');
  var fecha = new Date();
  var counter = fecha.getMonth();
  var actualMonth = months[counter];
  var actualYear = fecha.getFullYear();
  var totalMonths = months.length - 1;
  monthName.innerText = actualMonth + ' ' + actualYear;

  var tabla = document.getElementById('days');
  var col = 6;

  displayDays();

  function displayDays() {
    var numberOfDays = 7;
    var day = 1;
    var firstDay = new Date(actualYear, counter, 1);
    var limit = null;

    switch (counter) {
      case 1:
        var bisiesto = new Date(actualYear, counter, 29);

        if (bisiesto.getMonth() != counter) {
          limit = 28;
        } else {
          limit = 29;
        }
        break;
      case 3:
      case 5:
      case 8:
      case 10:
        limit = 30;
        break;
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        limit = 31;
        break;
    }

    for (var c = 1; c <= col; c++) {
      var row = document.createElement('tr');

      for (var i = 1; i <= numberOfDays; i++) {
        var data = document.createElement('td');

        if (day == fecha.getDate() && counter == fecha.getMonth()) {
          if (actualYear == fecha.getFullYear()) {
            data.id = 'today';
          }
        }

        if (c == 1 && i <= firstDay.getDay()) {
          var values = document.createTextNode('');
        } else {
          if (day <= limit) {
            var values = document.createTextNode(day++);
          } else {
            var values = document.createTextNode('');
          }
        }
        data.appendChild(values);
        row.appendChild(data);
      }

      tabla.appendChild(row);
    }
  }

  btnBack.addEventListener('click', function() {
    calendar(-1);
  });

  btnForward.addEventListener('click', function() {
    calendar(1);
  });

  function calendar(x) {
    counter += x;

    if (counter > totalMonths) {
      counter = 0;
      actualYear++;
    } else if (counter < 0) {
      counter = totalMonths;
      actualYear--;
    }

    var actualMonth = months[counter];
    monthName.innerText = actualMonth + ' ' + actualYear;

    for (d = 0; d < col; d++) {
      tabla.removeChild(tabla.lastChild);
    }

    displayDays();
  }
}
