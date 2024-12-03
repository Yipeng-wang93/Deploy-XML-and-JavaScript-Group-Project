// Complete list of Canadian cities and towns (Sample set, you can add more)
const cities = [
  "Toronto", "Ottawa", "Mississauga", "Scarborough", "Brampton", "Hamilton", 
  "London", "Markham", "Vaughan", "Kitchener", "Windsor", 
  "Guelph", "Kingston", "Waterloo", "Peterborough", "Oshawa",
  "Edmonton", "Calgary", "Vancouver", "Montreal", "Quebec City", 
  "Winnipeg", "Saskatoon", "Regina", "Halifax", "St. John's", 
  "Victoria", "Charlottetown", "Fredericton", "Whitehorse", 
  "Yellowknife", "Iqaluit", "Sherbrooke", "Trois-Rivières", "Saint-Jean-sur-Richelieu",
  "Grande Prairie", "Lethbridge", "Thunder Bay", "Langley", "Richmond Hill",
  "Surrey", "Burnaby", "Abbotsford", "Kelowna", "Barrie",
  "Chilliwack", "Saint John", "Burlington", "Ajax", "Sault Ste. Marie",
  "Grande Prairie", "Saint-Jérôme", "Levis", "Châteauguay", "Sherbrooke"
];

window.onload = function () {
  const locationSelect = document.getElementById("location");
  const destinationSelect = document.getElementById("destination");

  cities.forEach(city => {
    let option1 = new Option(city, city.toLowerCase());
    let option2 = new Option(city, city.toLowerCase());
    locationSelect.appendChild(option1);
    destinationSelect.appendChild(option2);
  });
};

async function submitBooking() {
    const customerName = document.getElementById("customerName").value;
    const transportMode = document.getElementById("transportMode").value;
    const location = document.getElementById("location").value;
    const destination = document.getElementById("destination").value;
    const schedule = document.getElementById("schedule").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    const bookingDetails = {
        customerName: customerName,
        transportationMode: transportMode,
        departureLocation: location,
        destinationLocation: destination,
        schedule: schedule,
        paymentMethod: paymentMethod,
        bookingDate: new Date().toLocaleString()
  };

  displaySummary(bookingDetails);

  // Fetch data from external APIs
  fetchWeather(destination);
  fetchTraffic(location,destination,transportMode);
  fetchTransportationDeals();
}

function displaySummary(details) {
  const summary = `
    <p><strong>Name:</strong> ${details.customerName}</p>
    <p><strong>Transportation Mode:</strong> ${details.transportationMode}</p>
    <p><strong>Departure:</strong> ${details.departureLocation}</p>
    <p><strong>Destination:</strong> ${details.destinationLocation}</p>
    <p><strong>Schedule:</strong> ${details.schedule}</p>
    <p><strong>Payment Method:</strong> ${details.paymentMethod}</p>
    <p><strong>Booking Date:</strong> ${details.bookingDate}</p>
  `;
  document.getElementById("summaryContainer").innerHTML = summary;
}

async function fetchWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=74ae01b787c3ac57b5767f6052a45ff2&units=metric`
    );
    const data = await response.json();

    // Display the weather data
    document.getElementById("weatherContainer").innerHTML = `
      <div style="display: flex; justify-content: space-around">
        <h3>Weather for ${location}</h3>
        <div>
          <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
          <p>${data.weather[0].description}</p>
        </div>
      </div>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
  } catch (error) {
    document.getElementById("weatherContainer").innerText = "Failed to fetch weather data.";
    console.error("Weather API Error:", error);
  }
}

function fetchTraffic(origin, destination, mode) {
  fetch(`https://google-distance.onrender.com/api/distance/?origins=${origin}&destinations=${destination}&mode=${mode}&departure_time=now`)
  .then(response => response.json())
  .then(data => {
      console.log(data)
      document.getElementById(
        "trafficContainer"
      ).innerHTML = `
      <div style="margin-top: 20px"> 
        <h3>Trip Details from  ${origin} to ${destination}</h3>
       <div>
          <p>Distance: ${data.rows[0].elements[0].distance.text}</p>
          <p>Duration: ${data.rows[0].elements[0].duration.text}</p>
        </div>
      `;
  });
}

async function fetchTransportationDeals() {
  const dealsApiUrl = 'https://example.com/api/transportation-deals'; // Replace with a real API

  try {
    const response = await fetch(dealsApiUrl);
    const dealsData = await response.json();
    const dealsInfo = dealsData.deals.map(deal => `
      <p><strong>Mode:</strong> ${deal.mode}</p>
      <p><strong>Price:</strong> $${deal.price}</p>
      <p><strong>Available Cities:</strong> ${deal.cities.join(', ')}</p>
    `).join('<hr>');

    document.getElementById("dealsContainer").innerHTML = dealsInfo;
  } catch (error) {
    document.getElementById("dealsContainer").innerText = "Failed to fetch transportation deals.";
    console.error("Deals API Error:", error);
  }
}

function printSummary() {
  window.print();
}

function emailSummary() {
  const summary = document.getElementById("summaryContainer").innerText;
  window.location.href = `mailto:?subject=Ontario%20Transportation%20Booking&body=${encodeURIComponent(summary)}`;
}
