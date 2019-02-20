preferences = {
  "accommodation": "hostels",
  "food": "street food",
  "party": 1
}

function onLoad() {
  generatePricesTable();
}

function calculatePrice(countryName) {
  var price = 0;
  var miscFactor = 1.13;
  price += countries[countryName][preferences.accommodation];
  price += countries[countryName][preferences.food]*3;
  switch(preferences.party) {
    case 0:
      break;
    case 1:
      price += countries[countryName].beer * 2;
      break;
    case 2:
      price += countries[countryName].beer * 6;
      break;
  }
  price *= miscFactor;
  return price;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function clearTable() {
  $("#prices tr").remove();
}

function generatePricesRow(countryName) {
  return '<tr><td>' + capitalize(countryName) + '</td><td>$' + Math.round(calculatePrice(countryName)) + '</td></tr>';
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
    case 'hostels':
      preferences.accommodation = "hostels";
      $("#hostels").addClass("selected");
      $("#hotels").removeClass("selected");
      break;
    case 'hotels':
      preferences.accommodation = "hotels";
      $("#hotels").addClass("selected");
      $("#hostels").removeClass("selected");
      break;
    case 'street food':
      preferences.food = "street food";
      $("#streetFood").addClass("selected");
      $("#cheapRestaurants").removeClass("selected");
      break;
    case 'cheap restaurants':
      preferences.food = "cheap restaurants";
      $("#cheapRestaurants").addClass("selected");
      $("#streetFood").removeClass("selected");
      break;
    case 'party0':
      preferences.party = 0;
      $("#party0").addClass("selected");
      $("#party1").removeClass("selected");
      $("#party2").removeClass("selected");
      break;
    case 'party1':
      preferences.party = 1;
      $("#party0").removeClass("selected");
      $("#party1").addClass("selected");
      $("#party2").removeClass("selected");
      break;
    case 'party2':
      preferences.party = 2;
      $("#party0").removeClass("selected");
      $("#party1").removeClass("selected");
      $("#party2").addClass("selected");
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
