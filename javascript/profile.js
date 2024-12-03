window.onload = function() {
    const username = document.getElementById('username').value;

    // Load saved itineraries from localStorage
    const itineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
    const savedItinerariesContainer = document.getElementById('saved-itineraries');
    if (itineraries.length > 0) {
        itineraries.forEach(itinerary => {
            if (itinerary.username === username) {
                const itineraryDiv = document.createElement('div');
                itineraryDiv.className = 'itinerary-item';
                itineraryDiv.innerHTML = `
                    <p><strong>Destination:</strong> ${itinerary.destination}</p>
                    <p><strong>Hotel:</strong> ${itinerary.hotel}</p>
                    <p><strong>Start Date:</strong> ${itinerary.startDate}</p>
                    <p><strong>End Date:</strong> ${itinerary.endDate}</p>
                    <p><strong>Activities:</strong> ${itinerary.activities}</p>
                `;
                savedItinerariesContainer.appendChild(itineraryDiv);
            }
        });
    } else {
        savedItinerariesContainer.innerHTML = "<p>No saved itineraries found.</p>";
    }

    // Load reviews from localStorage
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const userReviewsContainer = document.getElementById('user-reviews');
    if (reviews.length > 0) {
        reviews.forEach(review => {
            if (review.username === username) {
                const reviewDiv = document.createElement('div');
                reviewDiv.className = 'review-item';
                reviewDiv.innerHTML = `
                    <h4>${review.username}</h4>
                    <p>${review.reviewText}</p>
                    <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                `;
                userReviewsContainer.appendChild(reviewDiv);
            }
        });
    } else {
        userReviewsContainer.innerHTML = "<p>No reviews found.</p>";
    }
};

function editProfile() {
    // Code to allow the user to edit their profile
    alert('Edit profile functionality to be added');
}

