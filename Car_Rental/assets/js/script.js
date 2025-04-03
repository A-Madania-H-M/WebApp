// Function to load an external HTML file into a specific element
function loadComponent(file, elementId) {
    fetch(file)
        .then(response => response.text()) // Get the HTML content
        .then(data => {
            document.getElementById(elementId).innerHTML = data; // Insert into the element
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

// Load the header into the placeholder
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("partials/header.html", "header-placeholder");
});

// Load the footer into the placeholder
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("partials/footer.html", "footer-placeholder");
});