preferences = {
  "accommodation": "hostel",
  "food": "street food"
}

function onLoad() {
  generatePricesTable();
}

function calculatePrice(countryName) {
  var price = 0;
  price += countries[countryName][preferences.accommodation];
  price += countries[countryName][preferences.food];
  price += countries[countryName].beer;
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
  }
  generatePricesTable();
}
