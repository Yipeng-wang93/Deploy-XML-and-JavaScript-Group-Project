const transportData = [
    {
        mode: "Bus",
        company: "City Transit",
        duration: "45 mins",
        cost: "$2.50",
        departure: "Downtown Terminal",
        arrival: "Picnic Park Entrance"
    },
    {
        mode: "Car",
        company: "Uber",
        duration: "30 mins",
        cost: "$15.00",
        departure: "Your Home",
        arrival: "Picnic Park Entrance"
    },
    {
        mode: "Bike",
        company: "Bike Share",
        duration: "60 mins",
        cost: "$5.00",
        departure: "Your Home",
        arrival: "Picnic Park Entrance"
    }
];

let itineraries = JSON.parse(localStorage.getItem('itineraries')) || [];

const fiveStarHotels = [
    "Fairmont Banff Springs, Alberta",
    "Fairmont Chateau Lake Louise, Alberta",
    "The Rimrock Resort Hotel, Alberta",
    "Fairmont Pacific Rim, Vancouver",
    "Rosewood Hotel Georgia, Vancouver",
    "Shangri-La Hotel, Vancouver",
    "The Westin Bayshore, Vancouver",
    "The Fort Garry Hotel, Winnipeg",
    "The Ritz-Carlton, Toronto",
    "Four Seasons Hotel, Toronto",
    "Shangri-La Hotel, Toronto",
    "Fairmont Royal York, Toronto",
    "St. Regis Toronto, Toronto",
    "Langdon Hall Country House Hotel & Spa, Cambridge",
    "Fairmont Le Château Frontenac, Quebec City",
    "Hôtel Le Germain, Quebec City",
    "Ritz-Carlton Montreal, Montreal",
    "Four Seasons Hotel Montreal, Montreal",
    "Delta Hotels by Marriott Bessborough, Saskatoon",
    "Fox Harb’r Resort, Wallace",
    "Fogo Island Inn, Fogo Island",
    "Algonquin Resort St. Andrews by-the-Sea, St. Andrews",
    "The Great George, Charlottetown"
];

window.onload = function populateHotelsDropdown() {
    const hotelDropdown = document.getElementById('hotel');
    fiveStarHotels.forEach(hotel => {
        const option = document.createElement('option');
        option.value = hotel;
        option.textContent = hotel;
        hotelDropdown.appendChild(option);
    });

    renderSavedItineraries();
};

function createItinerary() {
    const username = document.getElementById('username').value;
    const destination = document.getElementById('destination').value;
    const hotel = document.getElementById('hotel').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const activities = document.getElementById('activities').value;

    if (!username || !destination || !hotel || !startDate || !endDate || !activities) {
        alert('Please fill out all fields.');
        return;
    }

    const newItinerary = {
        username,
        destination,
        hotel,
        startDate,
        endDate,
        activities
    };

    itineraries.push(newItinerary);
    localStorage.setItem('itineraries', JSON.stringify(itineraries));

    const itineraryHTML = `
        <div class="itinerary-item">
            <h3>${destination}</h3>
            <p><strong>User:</strong> ${username}</p>
            <p><strong>Hotel:</strong> ${hotel}</p>
            <p><strong>Start Date:</strong> ${startDate}</p>
            <p><strong>End Date:</strong> ${endDate}</p>
            <p><strong>Activities:</strong> ${activities}</p>
            <button onclick="showTransportOptions('${destination}')">Show Transport Options</button>
        </div>
        <hr>
    `;

    document.getElementById('guides-list').innerHTML += itineraryHTML;

    document.getElementById('username').value = '';
    document.getElementById('destination').value = '';
    document.getElementById('hotel').value = '';
    document.getElementById('start-date').value = '';
    document.getElementById('end-date').value = '';
    document.getElementById('activities').value = '';
}

function renderSavedItineraries() {
    const savedItineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
    const guidesList = document.getElementById('guides-list');

    savedItineraries.forEach(itinerary => {
        const itineraryHTML = `
            <div class="itinerary-item">
                <h3>${itinerary.destination}</h3>
                <p><strong>User:</strong> ${itinerary.username}</p>
                <p><strong>Hotel:</strong> ${itinerary.hotel}</p>
                <p><strong>Start Date:</strong> ${itinerary.startDate}</p>
                <p><strong>End Date:</strong> ${itinerary.endDate}</p>
                <p><strong>Activities:</strong> ${itinerary.activities}</p>
                <button onclick="showTransportOptions('${itinerary.destination}')">Show Transport Options</button>
            </div>
            <hr>
        `;
        guidesList.innerHTML += itineraryHTML;
    });
}

function showTransportOptions(destination) {
    const transportOptionsHTML = transportData
        .map(option => {
            return `
                <div class="transport-card">
                    <h3>${option.mode}</h3>
                    <p><strong>Company:</strong> ${option.company}</p>
                    <p><strong>Duration:</strong> ${option.duration}</p>
                    <p><strong>Cost:</strong> ${option.cost}</p>
                    <p><strong>Departure:</strong> ${option.departure}</p>
                    <p><strong>Arrival:</strong> ${option.arrival}</p>
                </div>
            `;
        })
        .join('');

    const guidesList = document.getElementById('guides-list');
    guidesList.innerHTML += `
        <div class="transport-options">
            <h4>Transport Options for ${destination}:</h4>
            ${transportOptionsHTML}
        </div>
        <hr>
    `;
}
