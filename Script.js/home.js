let nextReturn = new Date().getTime() + 1 * 60 * 60 * 1000;
const timerEl = document.getElementById('returnTimer');

function updateTimer() {
    const now = new Date().getTime();
    let distance = nextReturn - now;

    if (distance < 0) {
        timerEl.innerText = "No upcoming returns.";
        clearInterval(timerInterval);
        return;
    }

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerEl.innerText = `Next item return in: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

let timerInterval = setInterval(updateTimer, 1000);
updateTimer();


// In js/home.js

/**
 * Handles the borrow request by updating the popup with specific item details
 * @param {string} name - The name of the item
 * @param {string} image - The path to the item image
 * @param {string} details - A brief description of the item
 */
function requestBorrow(name, image, details) {
    // 1. Get the elements from the popup
    const titleElement = document.getElementById('borrow-title');
    const descElement = document.getElementById('borrow-description');
    const popup = document.getElementById('borrow-popup');

    // 2. Set the content based on the item clicked
    titleElement.innerText = "Requesting: " + name;
    descElement.innerText = details;

    // 3. Show the popup
    popup.style.display = "flex"; 
}

function closePopup() {
    document.getElementById('borrow-popup').style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.querySelector('.content'); // The container in home.html
    const items = JSON.parse(localStorage.getItem('lendrItems')) || [];

    // Clear existing static items if you want only uploaded items to show
    // contentDiv.innerHTML = ''; 

    items.forEach(item => {
        const itemBox = document.createElement('div');
        itemBox.className = 'item-box';
        itemBox.innerHTML = `
            <img src="${item.image}" alt="${item.itemName}">
            <h3>${item.itemName}</h3>
            <button class="borrow-btn" onclick="location.href='borrow-profile.html?id=${item.id}'">
                Tap to Borrow
            </button>
        `;
        contentDiv.appendChild(itemBox);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // Check for new notifications every 3 seconds
    setInterval(checkForNotifications, 3000);
});

function checkForNotifications() {
    const requestData = localStorage.getItem('pendingRequest');

    if (requestData) {
        const request = JSON.parse(requestData);
        showNotificationPopup(request);
        
        // Remove it so it doesn't pop up again repeatedly
        localStorage.removeItem('pendingRequest');
    }
}

function showNotificationPopup(data) {
    // Create the notification element dynamically
    const notifyDiv = document.createElement('div');
    notifyDiv.className = 'borrow-notification';
    notifyDiv.innerHTML = `
        <div style="background: #fff; border-left: 5px solid #ffcc00; padding: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); position: fixed; top: 20px; right: 20px; z-index: 1000; border-radius: 8px;">
            <strong>New Borrow Request!</strong><br>
            ${data.message}<br>
            <small>Location: ${data.room} | ${data.timestamp}</small><br>
            <button onclick="this.parentElement.remove()" style="margin-top:10px; cursor:pointer;">Dismiss</button>
        </div>
    `;
    document.body.appendChild(notifyDiv);

    // Auto-hide after 10 seconds
    setTimeout(() => { if(notifyDiv) notifyDiv.remove(); }, 10000);
}