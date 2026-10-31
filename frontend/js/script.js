
const movies = [
    {
        id: 1,
        title: "Money Heist",
        genre: "Crime | Thriller",
        year: 2021,
        image: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
        description: "A criminal mastermind and his team plan the biggest robbery in history."
    },
    {
        id: 2,
        title: "Wednesday",
        genre: "Mystery | Fantasy",
        year: 2022,
        image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
        description: "Wednesday Addams investigates mysterious events at Nevermore Academy."
    },
    {
        id: 3,
        title: "Dark",
        genre: "Sci-Fi | Mystery",
        year: 2020,
        image: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
        description: "A missing child exposes secrets across generations in a small German town."
    },
    {
        id: 4,
        title: "The Witcher",
        genre: "Fantasy | Action",
        year: 2023,
        image: "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
        description: "A monster hunter struggles to find his place in a dangerous world."
    },
    {
        id: 5,
        title: "Extraction",
        genre: "Action | Thriller",
        year: 2023,
        image: "https://image.tmdb.org/t/p/w500/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg",
        description: "A black-market mercenary embarks on a dangerous rescue mission."
    },
    {
        id: 6,
        title: "Lucifer",
        genre: "Fantasy | Crime",
        year: 2021,
        image: "https://image.tmdb.org/t/p/w500/ekZobS8isE6mA53RAiGDG93hBxL.jpg",
        description: "The Devil moves to Los Angeles and becomes a consultant for the police."
    },
    {
        id: 7,
        title: "Squid Game",
        genre: "Drama | Thriller",
        year: 2024,
        image: "https://image.tmdb.org/t/p/w500/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg",
        description: "Desperate contestants enter a deadly competition for a huge prize."
    },
    {
        id: 8,
        title: "All of Us Are Dead",
        genre: "Horror | Action",
        year: 2022,
        image: "https://image.tmdb.org/t/p/w500/pTEFqAjLd5YTsMD6NSUxV6Dq7A6.jpg",
        description: "Students fight to survive when a zombie outbreak spreads through school."
    },
    {
        id: 9,
        title: "Avatar",
        genre: "Adventure | Sci-Fi",
        year: 2022,
        image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        description: "Explore the spectacular world of Pandora."
    },
    {
        id: 10,
        title: "Interstellar",
        genre: "Sci-Fi | Adventure",
        year: 2014,
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description: "A team travels through a wormhole in search of a new home for humanity."
    }
];

let myList = JSON.parse(localStorage.getItem("myNetflixList") || "[]");

function createMovieCard(movie) {
    const isAdded = myList.includes(movie.id);

    return `
        <div class="movie-card">
            <img src="${movie.image}" alt="${movie.title}"
                 onerror="this.style.display='none'">

            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre} | ${movie.year}</p>

                <div class="movie-actions">
                    <button onclick="showMovieInfo(${movie.id})">
                        Info
                    </button>

                    <button onclick="toggleList(${movie.id})">
                        ${isAdded ? "✓ Added" : "+ My List"}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function displayMovies(list = movies) {
    document.getElementById("movieContainer").innerHTML =
        list.slice(0, 5).map(createMovieCard).join("");

    document.getElementById("popularContainer").innerHTML =
        list.slice(5).map(createMovieCard).join("");

    displayMyList();
}

function displayMyList() {
    const selectedMovies = movies.filter(movie =>
        myList.includes(movie.id)
    );

    document.getElementById("myListContainer").innerHTML =
        selectedMovies.length
            ? selectedMovies.map(createMovieCard).join("")
            : "<p>No movies added yet. Add your favourite movies!</p>";
}

function toggleList(id) {
    if (myList.includes(id)) {
        myList = myList.filter(movieId => movieId !== id);
    } else {
        myList.push(id);
    }

    localStorage.setItem("myNetflixList", JSON.stringify(myList));
    displayMovies();
}

function searchMovies() {
    const searchValue = document
        .getElementById("searchInput")
        .value.toLowerCase()
        .trim();

    const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchValue) ||
        movie.genre.toLowerCase().includes(searchValue)
    );

    document.getElementById("movieContainer").innerHTML =
        results.length
            ? results.map(createMovieCard).join("")
            : "<p>No movies found!</p>";

    document.getElementById("popularContainer").innerHTML = "";
}

document.getElementById("searchInput").addEventListener("input", searchMovies);

function showMovieInfo(id) {
    const movie = movies.find(item => item.id === id);

    document.getElementById("modalTitle").textContent = movie.title;
    document.getElementById("modalDescription").textContent =
        movie.description + " Genre: " + movie.genre;

    document.getElementById("movieModal").style.display = "flex";
}

function showFeaturedInfo() {
    document.getElementById("modalTitle").textContent = "Stranger Things";

    document.getElementById("modalDescription").textContent =
        "A mysterious adventure involving a missing boy, secret experiments and supernatural forces.";

    document.getElementById("movieModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("movieModal").style.display = "none";
}

function playMovie() {
    alert("Welcome to StreamFlix! Connect a licensed video source for actual playback.");
}

displayMovies();
// Connect frontend with backend
async function checkBackendConnection() {
    const statusElement = document.getElementById("backendStatus");

    try {
        const response = await fetch("http://localhost:3001/api/health");

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        statusElement.textContent = "● Backend Connected";
        statusElement.className = "backend-status online";

        console.log("Backend Response:", data);

    } catch (error) {
        statusElement.textContent = "● Backend Disconnected";
        statusElement.className = "backend-status offline";

        console.error("Backend connection failed:", error);
    }
}

checkBackendConnection();