preferences = {
  "accommodation": "hostel",
  "food": "street food",
  "party": 1
}

function onLoad() {
  generatePricesTable();
}

function calculatePrice(countryName) {
  var price = 0;
  price += countries[countryName][preferences.accommodation];
  price += countries[countryName][preferences.food];
  price += countries[countryName].beer * preferences.party;
  return price;
}

function clearTable() {
  $("#prices tr").remove();
}

function generatePricesRow(countryName) {
  return '<tr><td>' + countryName + '</td><td>$' + Math.round(calculatePrice(countryName)) + '/day</td></tr>';
}

function generatePricesTable() {
  clearTable();
  var tbody = $('#prices').find('tbody:last');
  tbody.append(generatePricesRow("vietnam"));
  tbody.append(generatePricesRow("cambodia"));
  tbody.append(generatePricesRow("singapore"));
  tbody.append(generatePricesRow("thailand"));
  tbody.append(generatePricesRow("laos"));
  tbody.append(generatePricesRow("malaysia"));
  tbody.append(generatePricesRow("indonesia"));
  sortTable();
}

function setPreference(preference) {
  switch(preference) {
    case 'hostel':
      preferences.accommodation = "hostel";
      break;
    case 'hotel':
      preferences.accommodation = "hotel";
      break;
    case 'street food':
      preferences.food = "street food";
      break;
    case 'cheap restaurants':
      preferences.food = "cheap restaurants";
      break;
    case 'party':
      preferences.party = $('input[type="range"]').val();
      break;
  }
  generatePricesTable();
}

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("prices");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = parseInt(rows[i].getElementsByTagName("TD")[1].innerHTML.replace('/day', '').replace('$', ''));
      y = parseInt(rows[i + 1].getElementsByTagName("TD")[1].innerHTML.replace('/day', '').replace('$', ''));
      if (x > y) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
