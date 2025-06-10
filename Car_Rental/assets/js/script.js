// Function to load an external HTML file into a specific element
function loadComponent(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

// Load header and footer on DOM ready
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("partials/header.html", "header-placeholder");
    loadComponent("partials/footer.html", "footer-placeholder");

    // Load default cars (no filter)
    loadCars();

    // Add filter button events
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            loadCars(type);
        });
    });
});

// Function to load cars via AJAX
function loadCars(filter = '') {
    fetch('../api/search.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `type=${encodeURIComponent(filter)}`
    })
    .then(response => response.json())
    .then(data => {
        const carList = document.getElementById('car-list');
        carList.innerHTML = ''; // Clear current content

        if (data.length === 0) {
            carList.innerHTML = '<p>No cars found.</p>';
            return;
        }

        data.forEach(car => {
            const carCard = `
                <div class="car-card">
                    <img src="../${car.image}" alt="${car.name}" class="car-image">
                    <h3>${car.name}</h3>
                    <p>${car.description}</p>
                    <p><strong>${car.price}</strong> ${car.period}</p>
                </div>
            `;
            carList.innerHTML += carCard;
        });
    })
    .catch(error => {
        console.error('Error loading cars:', error);
        document.getElementById('car-list').innerHTML = '<p>Error loading cars.</p>';
    });
}
