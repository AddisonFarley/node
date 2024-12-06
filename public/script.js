//Author: Addison Farley
//SDEV 372

// Load all golf balls when the page loads
document.addEventListener("DOMContentLoaded", fetchGolfBalls);

// Fetch all golf balls from the API
async function fetchGolfBalls() {
    try {
        const response = await fetch('/api/v1/golf/balls');
        const balls = await response.json();

        // Check if balls is an array
        if (Array.isArray(balls)) {
            const tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = ""; // Clear existing rows 
            
            for (let i = 0; i < balls.length; i++) {
                addTableRow(balls[i]);
            }
        } else {
            console.error("Expected an array, but received:", balls);
        }
    } catch (error) {
        console.error("Error fetching golf balls:", error);
    }
}

// Add a new row to the golf ball table
function addTableRow(ball) {
    const tableBody = document.getElementById("tableBody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${ball.ballId}</td>
        <td>${ball.equipmentName}</td>
        <td>${ball.description}</td>
        <td>${ball.price}</td>
        <td>${ball.stock}</td>
        <td>${ball.brand}</td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="editGolfBall(${ball.ballId})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteGolfBall(${ball.ballId})">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);
}

// Add a new golf ball to DB
document.getElementById("addForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const newBall = {
        equipmentName: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        stock: parseInt(document.getElementById("stock").value),
        brand: document.getElementById("brand").value,
    };

    const response = await fetch('/api/v1/golf/balls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBall),
    });

    if (response.ok) {
        const addedBall = await response.json();
        addTableRow(addedBall);
        document.getElementById("addForm").reset();
    }
});

// Edit an existing golf ball in DB
async function editGolfBall(ballId) {
    const name = prompt("Enter new name:");
    const description = prompt("Enter new description:");
    const price = prompt("Enter new price:");
    const stock = prompt("Enter new stock:");
    const brand = prompt("Enter new brand:");

    const updatedBall = { equipmentName: name, description, price, stock, brand };

    const response = await fetch(`/api/v1/golf/balls/${ballId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBall),
    });

    if (response.ok) {
        fetchGolfBalls(); // Reload table data after sending request
    } else {
        console.error("Failed to edit golf ball:", response.statusText);
    }
}

// Delete a golf ball
async function deleteGolfBall(id) {
    const response = await fetch(`/api/v1/golf/balls/${id}`, { method: 'DELETE' });

    if (response.ok) {
        fetchGolfBalls(); // Reload table data after sending request
    }
}
