document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.getElementById('leaderboard-body');
    const storedData = localStorage.getItem('registeredUser');

    // Start with an empty list for a newly made system
    let borrowers = [];

    // If someone has registered, add them to the real-time list
    if (storedData) {
        const user = JSON.parse(storedData);
        borrowers.push(user);
    }

    // Clear the "Static" rows from the HTML
    tbody.innerHTML = "";

    if (borrowers.length === 0) {
        tbody.innerHTML = "<tr><td colspan='7' style='text-align:center;'>No borrowers yet. Be the first!</td></tr>";
    } else {
        // Sort and Display
        borrowers.sort((a, b) => b.itemsBorrowed - a.itemsBorrowed);

        // Inside your borrowers.forEach loop in js/leaderboard.js
        borrowers.forEach((borrower, index) => {
            const row = `
        <tr>
            <td>${index + 1}</td>
            <td>${borrower.username}</td>
            <td>${borrower.room || "No Room Set"}</td> <td>${borrower.itemsBorrowed}</td>
            <td>${borrower.accuracy}</td>
            <td>0h 0m</td>
            <td>${borrower.notes}</td>
        </tr>
    `;
            tbody.innerHTML += row;
        });
    }
});