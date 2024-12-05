// Initialize the map
const map = L.map('map').setView([39.925533, 32.866287], 6);
// Custom colored markers for each category
const icons = {
    "General Knowledge": L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Default blue marker
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41]
    }),
    "Food": L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@1.0/img/marker-icon-red.png', // Red marker
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41]
    }),
    "Geography": L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@1.0/img/marker-icon-green.png', // Green marker
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41]
    })
};

const usedIcon = L.icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@1.0/img/marker-icon-grey.png', // Gri marker
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
});

let answeredMarkers = new Set(); 


// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

const categories = {
    "General Knowledge": [
        { name: "Istanbul", coords: [41.0082, 28.9784], question: "This city connects which two continents?", options: ["Asia and Europe", "Asia and Africa", "Europe and America"], answer: "Asia and Europe" },
        { name: "Edirne", coords: [41.6771, 26.5557], question: "Which historical empire made Edirne its capital?", options: ["Ottoman Empire", "Roman Empire", "Byzantine Empire"], answer: "Ottoman Empire" },
        { name: "Ankara", coords: [39.9208, 32.8541], question: "What year did Ankara become the capital of Turkey?", options: ["1923", "1919", "1938"], answer: "1923" },
        { name: "Antalya", coords: [36.8969, 30.7133], question: "Antalya is known as the 'capital of' what?", options: ["Tourism", "Agriculture", "Technology"], answer: "Tourism" },
        { name: "Bursa", coords: [40.1826, 29.0665], question: "Which Ottoman sultan made Bursa the first capital of the empire?", options: ["Osman I", "Orhan Gazi", "Suleiman the Magnificent"], answer: "Orhan Gazi" },
        { name: "Samsun", coords: [41.2867, 36.33], question: "Samsun is associated with the start of which event?", options: ["Turkish War of Independence", "World War I", "The Republic's Foundation"], answer: "Turkish War of Independence" },
        { name: "Mardin", coords: [37.3129, 40.7339], question: "Mardin is famous for its ancient architecture made of which material?", options: ["Stone", "Wood", "Marble"], answer: "Stone" },
        { name: "Van", coords: [38.4946, 43.3832], question: "Van is famous for its unique breed of?", options: ["Cats", "Dogs", "Sheep"], answer: "Cats" },
        { name: "Gaziantep", coords: [37.0662, 37.3833], question: "Gaziantep is recognized by UNESCO for which heritage?", options: ["Cuisine", "Architecture", "Music"], answer: "Cuisine" },
        { name: "Trabzon", coords: [41.0039, 39.7168], question: "What is the name of the famous monastery located in Trabzon?", options: ["Sumela Monastery", "St. Sophia Monastery", "Monastery of St. John"], answer: "Sumela Monastery" }
    ],
    "Food": [
        { name: "Adana", coords: [37.0, 35.3213], question: "Which food is Adana most famous for?", options: ["Adana Kebab", "Lahmacun", "Baklava"], answer: "Adana Kebab" },
        { name: "Hatay", coords: [36.4018, 36.3498], question: "Which type of dessert is Hatay most famous for?", options: ["Kunefe", "Baklava", "Rice Pudding"], answer: "Kunefe" },
        { name: "Kayseri", coords: [38.7225, 35.4875], question: "Kayseri is well known for which food?", options: ["Manti", "Kebab", "Pide"], answer: "Manti" },
        { name: "Kars", coords: [40.6013, 43.0945], question: "What type of cheese is Kars famous for?", options: ["Gravyer", "Feta", "Cheddar"], answer: "Gravyer" },
        { name: "Rize", coords: [41.0201, 40.5234], question: "What is the famous drink produced in Rize?", options: ["Tea", "Coffee", "Ayran"], answer: "Tea" },
        { name: "Bursa", coords: [40.1826, 29.0665], question: "Which dish originated in Bursa?", options: ["Iskender Kebab", "Lahmacun", "Doner Kebab"], answer: "Iskender Kebab" },
        { name: "Gaziantep", coords: [37.0662, 37.3833], question: "Which dessert is most associated with Gaziantep?", options: ["Baklava", "Lokum", "Kunefe"], answer: "Baklava" },
        { name: "Izmir", coords: [38.4192, 27.1287], question: "Izmir is famous for which street food?", options: ["Boyoz", "Pide", "Simit"], answer: "Boyoz" },
        { name: "Ankara", coords: [39.9208, 32.8541], question: "Which dish is Ankara most known for?", options: ["Tandoori Kebab", "Ankara Tava", "Manti"], answer: "Ankara Tava" },
        { name: "Denizli", coords: [37.7765, 29.0864], question: "Which fruit is grown abundantly in Denizli?", options: ["Grapes", "Apples", "Oranges"], answer: "Grapes" }
    ],
    "Geography": [
        { name: "Nevsehir", coords: [38.6245, 34.7239], question: "Nevsehir is home to which famous natural wonder?", options: ["Cappadocia", "Pamukkale", "Mount Nemrut"], answer: "Cappadocia" },
        { name: "Mersin", coords: [36.8121, 34.6415], question: "What is the longest beach in Mersin called?", options: ["Cleopatra Beach", "Silifke Beach", "Tisan Beach"], answer: "Silifke Beach" },
        { name: "Antalya", coords: [36.8969, 30.7133], question: "Which canyon is located in Antalya?", options: ["Koprulu Canyon", "Saklikent Canyon", "Ihlara Canyon"], answer: "Koprulu Canyon" },
        { name: "Erzurum", coords: [39.9042, 41.2678], question: "What is Erzurum most famous for geographically?", options: ["Palandoken Mountains", "Van Lake", "Black Sea"], answer: "Palandoken Mountains" },
        { name: "Denizli", coords: [37.7765, 29.0864], question: "Pamukkale in Denizli is famous for its?", options: ["Thermal Pools", "Mountains", "Rivers"], answer: "Thermal Pools" },
        { name: "Van", coords: [38.4946, 43.3832], question: "Van Lake is the largest lake in?", options: ["Turkey", "Europe", "Asia"], answer: "Turkey" },
        { name: "Rize", coords: [41.0201, 40.5234], question: "What kind of geographical area is Rize known for?", options: ["Tea Plantations", "Deserts", "Rivers"], answer: "Tea Plantations" },
        { name: "Izmir", coords: [38.4192, 27.1287], question: "Izmir is surrounded by which sea?", options: ["Aegean Sea", "Black Sea", "Mediterranean Sea"], answer: "Aegean Sea" },
        { name: "Adana", coords: [37.0, 35.3213], question: "Which river flows through Adana?", options: ["Seyhan River", "Ceyhan River", "Firat River"], answer: "Seyhan River" },
        { name: "Trabzon", coords: [41.0039, 39.7168], question: "Which highlands are located in Trabzon?", options: ["Uzungol Highlands", "Kaçkar Highlands", "Sumela Highlands"], answer: "Uzungol Highlands" }
    ]
};




function startGame(category) {
    const selectedQuestions = categories[category].sort(() => 0.5 - Math.random()).slice(0, 10);

    // Add selected questions to the map
    selectedQuestions.forEach(city => {
        const marker = L.marker(city.coords).addTo(map);
        marker.bindPopup(`
            <b>${city.name}</b><br>
            ${city.question}<br>
            ${city.options.map((opt, i) => `<button class="answer-btn" onclick="answerQuestion('${city.name}', '${opt}', '${city.answer}', ${marker._leaflet_id})">${opt}</button>`).join('')}
        `);
    });
}


// Timer logic (placeholder)
let timeRemaining = 300; // 10 minutes in seconds
const timer = setInterval(() => {
    if (timeRemaining <= 0) {
        clearInterval(timer);
        showGameOverPopup(); // Süre bittiğinde popup göster
    } else {
        timeRemaining--;
        document.getElementById('time').innerText = `${Math.floor(timeRemaining / 60)}:${String(timeRemaining % 60).padStart(2, '0')}`;
    }
}, 1000);


let points = 0;

function answerQuestion(cityName, selectedAnswer, correctAnswer, markerId) {
    const marker = map._layers[markerId];
    const popup = marker.getPopup();

    if (answeredMarkers.has(markerId)) {
        alert("You have already answered this question!");
        return;
    }

    if (selectedAnswer === correctAnswer) {
        points += 10; 
        alert(`Correct answer! Points: ${points}`);
    } else {
        points -= 5; 
        alert(`Wrong answer! The correct answer was: ${correctAnswer}. Points: ${points}`);
    }

    // Markerı gri yap ve set'e ekle
    marker.setIcon(usedIcon);
    answeredMarkers.add(markerId);

    // Puanı güncelle
    document.getElementById('points').innerText = points;

    // Pop-up'ı kapat
    popup.remove();
}




// Start Game Pop-up with Rules
window.onload = () => {
    const startGamePopup = document.createElement('div');
    startGamePopup.id = 'start-popup';
    startGamePopup.innerHTML = `
        <div class="popup-content">
            <h2>Welcome to GeoAce Turkey!</h2>
            <p>
                Test your knowledge about Turkey by answering questions in different categories: 
                General Knowledge, Food, and Geography. Each category has 10 questions.
            </p>
            <p>
                <b>How to Play:</b><br>
                1. Choose a category to begin the game.<br>
                2. Answer questions by clicking on the markers on the map.<br>
                3. You have 30 seconds to answer each question.<br>
                4. Correct answers give you +10 points, and wrong answers deduct -10 points.
            </p>
            <p>
                Try to score as high as you can before the time runs out. Good luck!
            </p>
            <button id="start-game">Choose a Category</button>
        </div>
    `;
    document.body.appendChild(startGamePopup);

    document.getElementById('start-game').addEventListener('click', () => {
        startGamePopup.remove(); 
        openCategoryPopup();
    });
};


function openCategoryPopup() {
    const categoryPopup = document.createElement('div');
    categoryPopup.id = 'category-popup';
    categoryPopup.innerHTML = `
        <div class="popup-content">
            <h2>Select a Category</h2>
            <button class="category-btn" data-category="General Knowledge">General Knowledge</button>
            <button class="category-btn" data-category="Food">Food</button>
            <button class="category-btn" data-category="Geography">Geography</button>
        </div>
    `;
    document.body.appendChild(categoryPopup);

    // Add event listeners for category buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            categoryPopup.remove(); 
            startGame(category); 
        });
    });
}


function startTimerForQuestion(markerId) {
    let timeLeft = 30;
    const popup = map._layers[markerId].getPopup();

    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Süre doldu!");
            popup.remove(); 
        } else {
            timeLeft--;
        }
    }, 1000);
}

window.onload = () => {
    const startGamePopup = document.createElement('div');
    startGamePopup.id = 'start-popup';
    startGamePopup.innerHTML = `
        <div class="popup-content">
            <h2>GeoAce Turkey</h2>
            <p>Click the button below to start the game!</p>
            <button id="start-game">Start Game</button>
        </div>
    `;
    document.body.appendChild(startGamePopup);

    document.getElementById('start-game').addEventListener('click', () => {
        startGamePopup.remove();
        startGame();
    });
};

function restartGame() {
    location.reload(); 
}

// Logout işlemi
document.getElementById('logout').addEventListener('click', () => {
    const confirmation = confirm("Are you sure you want to exit the game?");
    if (confirmation) {
        
        window.open('', '_self', ''); 
        window.close(); 
    }
});


document.querySelector('a[href="#"]').addEventListener('click', () => {
    const categoryPopup = document.createElement('div');
    categoryPopup.id = 'category-popup';
    categoryPopup.innerHTML = `
        <div class="popup-content">
            <h2>Select a Category</h2>
            <button class="category-btn" data-category="General Knowledge">General Knowledge</button>
            <button class="category-btn" data-category="Food">Food</button>
            <button class="category-btn" data-category="Geography">Geography</button>
        </div>
    `;
    document.body.appendChild(categoryPopup);

    // Add event listeners for category buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            categoryPopup.remove(); // Remove the pop-up
            startGame(category); // Start the game with selected category
        });
    });
});

window.onload = () => {
    const startGamePopup = document.createElement('div');
    startGamePopup.id = 'start-popup';
    startGamePopup.innerHTML = `
        <div class="popup-content">
            <h2>Welcome to GeoAce Turkey!</h2>
            <p>
                Test your knowledge about Turkey by answering questions in different categories: 
                General Knowledge, Food, and Geography.
            </p>
            <p>
                <b>Rules:</b><br>
                1. You have a total of 5 minutes.<br>
                2. Switch between categories to answer as many questions as you can.<br>
                3. Correct answers give you +10 points, and wrong answers deduct -5 points.<br>
                4. Try to score as high as possible before time runs out. Good luck!
            </p>
            <button id="start-game">Start Game</button>
        </div>
    `;
    document.body.appendChild(startGamePopup);

    document.getElementById('start-game').addEventListener('click', () => {
        startGamePopup.remove(); 
        openCategoryPopup(); 
    });
};


// Open Category Selection Pop-up
function openCategoryPopup() {
    const categoryPopup = document.createElement('div');
    categoryPopup.id = 'category-popup';
    categoryPopup.innerHTML = `
        <div class="popup-content">
            <h2>Select a Category</h2>
            <button class="category-btn" data-category="General Knowledge">General Knowledge</button>
            <button class="category-btn" data-category="Food">Food</button>
            <button class="category-btn" data-category="Geography">Geography</button>
        </div>
    `;
    document.body.appendChild(categoryPopup);

    // Add event listeners for category buttons
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            categoryPopup.remove(); // Remove the pop-up
            startGame(category); // Start the game with selected category
        });
    });
}

function startGame(category) {
    const selectedQuestions = categories[category].sort(() => 0.5 - Math.random()).slice(0, 10);

    // Add selected questions to the map
    selectedQuestions.forEach(city => {
        const marker = L.marker(city.coords, { icon: icons[category] }).addTo(map);
        marker.bindPopup(`
            <b>${city.name}</b><br>
            ${city.question}<br>
            ${city.options.map((opt, i) => `<button class="answer-btn" onclick="answerQuestion('${city.name}', '${opt}', '${city.answer}', ${marker._leaflet_id})">${opt}</button>`).join('')}
        `);

        marker.on('click', () => {
            if (answeredMarkers.has(marker._leaflet_id)) {
                alert("You have already answered this question!");
            }
        });
    });
}


function showGameOverPopup() {
    const answeredCount = answeredMarkers.size; 

    const gameOverPopup = document.createElement('div');
    gameOverPopup.id = 'game-over-popup';
    gameOverPopup.innerHTML = `
        <div class="popup-content">
            <h2>Congratulations!</h2>
            <p>You have completed the game!</p>
            <p><b>Answered Questions:</b> ${answeredCount}</p>
            <p><b>Your Score:</b> ${points}</p>
            <button id="restart-game">Play Again</button>
        </div>
    `;
    document.body.appendChild(gameOverPopup);


    document.getElementById('restart-game').addEventListener('click', () => {
        location.reload(); 
    });
}

document.getElementById('end-game').addEventListener('click', () => {
    clearInterval(timer); // Zamanlayıcıyı durdur
    showGameOverPopup(); // Popup'u göster
});
