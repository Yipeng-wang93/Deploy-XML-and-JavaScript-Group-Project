function submitReview() {
    const userName = document.getElementById('user-name').value;
    const reviewText = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;

    if (userName && reviewText && rating) {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';

        // Crear contenido del comentario
        const reviewContent = document.createElement('div');
        reviewContent.className = 'review-text';
        reviewContent.innerHTML = `
            <h4>${userName}</h4>
            <p>${reviewText}</p>
        `;

        // Crear estrellas de calificación
        const stars = document.createElement('div');
        stars.className = 'stars';
        stars.innerHTML = '★'.repeat(rating) + '☆'.repeat(5 - rating);

        // Crear los botones de emoticones
        const emojiButtons = document.createElement('div');
        emojiButtons.className = 'emoji-buttons';

        // Botón de "Me gusta"
        const likeButton = document.createElement('span');
        likeButton.textContent = '👍';
        const likeCount = document.createElement('span');
        likeCount.className = 'emoji-count';
        likeCount.textContent = '0';
        likeButton.onclick = () => updateEmojiCount(likeButton, likeCount);

        // Botón de "Me encanta"
        const loveButton = document.createElement('span');
        loveButton.textContent = '❤️';
        const loveCount = document.createElement('span');
        loveCount.className = 'emoji-count';
        loveCount.textContent = '0';
        loveButton.onclick = () => updateEmojiCount(loveButton, loveCount);

        // Botón de "Me molesta"
        const angryButton = document.createElement('span');
        angryButton.textContent = '😡';
        const angryCount = document.createElement('span');
        angryCount.className = 'emoji-count';
        angryCount.textContent = '0';
        angryButton.onclick = () => updateEmojiCount(angryButton, angryCount);

        // Agregar botones y contadores
        emojiButtons.appendChild(likeButton);
        emojiButtons.appendChild(likeCount);
        emojiButtons.appendChild(loveButton);
        emojiButtons.appendChild(loveCount);
        emojiButtons.appendChild(angryButton);
        emojiButtons.appendChild(angryCount);

        // Agregar contenido del comentario, estrellas y emoticones
        reviewItem.appendChild(reviewContent);
        reviewItem.appendChild(stars);
        reviewItem.appendChild(emojiButtons);

        document.getElementById('reviews-list').appendChild(reviewItem);

        // Guardar la reseña en localStorage
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push({ username: userName, reviewText: reviewText, rating: rating });
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Limpiar el formulario
        document.getElementById('user-name').value = '';
        document.getElementById('review').value = '';
        document.getElementById('rating').value = '';
    } else {
        alert('Please fill out all fields before submitting your review.');
    }
}

function updateEmojiCount(button, countSpan) {
    let currentCount = parseInt(countSpan.textContent);
    countSpan.textContent = currentCount + 1;
}

// Función para mostrar reseñas almacenadas (para el perfil)
function displayReviews() {
    const username = document.getElementById('username').value; // Obtener nombre de usuario
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const userReviewsContainer = document.getElementById('user-reviews');
    userReviewsContainer.innerHTML = ''; // Limpiar las reseñas previas

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
}

// Llamar a la función para mostrar reseñas al cargar la página del perfil
window.onload = function() {
    displayReviews();
};
