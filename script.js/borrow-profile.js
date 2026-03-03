const itemName = sessionStorage.getItem('itemName');
const itemImg = sessionStorage.getItem('itemImg');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the data of the item that was clicked from localStorage
    const profileImg = document.querySelector('.profile'); // Changed from '.left .profile' for better targeting
    if (data && data.lenderPhoto) {
        profileImg.src = data.lenderPhoto;
    }

    if (data) {
        // 2. Update Lender Details using your IDs
        document.getElementById('StudentProfile').innerText = data.lender.toUpperCase();
        document.getElementById('StudentRoom').innerText = `ROOM: ${data.room}`;
        document.getElementById('StudentSection').innerText = `SECTION: ${data.section}`;
        document.getElementById('StudentEmail').innerText = `${data.lender.toLowerCase().replace(/\s/g, '.')}@example.com`;

        // Update ID Number if you have it in your data
        if (data.idNumber) {
            document.getElementById('profileID').innerText = `ID Number: ${data.idNumber}`;
        }

        // 3. Update Profile Picture and Item Picture
        const profileImg = document.querySelector('.left .profile');
        if (data.lenderPhoto) profileImg.src = data.lenderPhoto;

        const itemImg = document.querySelector('.middle .calculator');
        if (data.itemImg) itemImg.src = data.itemImg;

        // 4. Update Item Information Text
        document.querySelector('.item-title').innerText = data.itemName;
        document.querySelector('.right p strong').nextSibling.textContent = ` ${data.itemName}`;
    }
});

// Function to update the status and notify the user
function updateStatus(status) {
    const bubble = document.getElementById('statusBubble');
    const studentName = document.getElementById('StudentProfile').innerText;
    const itemName = document.querySelector('.item-title').innerText;

    if (status === 'Approved') {
        bubble.innerText = "BORROW REQUEST APPROVED";
        bubble.style.backgroundColor = "#4CAF50"; // Green for success
        alert(`Notification sent to ${studentName}: You have agreed to lend the ${itemName}.`);
    } else if (status === 'Cancelled') {
        bubble.innerText = "REQUEST DECLINED";
        bubble.style.backgroundColor = "#f44336"; // Red for decline
        alert(`Notification: You have declined the request from ${studentName}.`);
    }
}

// Function for the "Notify" button (Quick Ping)
function chatStudent() {
    const studentName = document.getElementById('StudentProfile').innerText;
    alert(`Nudge sent! ${studentName} has been notified to pick up the item.`);
}

// In js/borrow-profile.js

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    const items = JSON.parse(localStorage.getItem('lendrItems')) || [];

    // Find the item that matches the ID from the URL
    const selectedItem = items.find(i => i.id == itemId);

    if (selectedItem) {
        // Update Lender Profile
        document.getElementById('StudentProfile').innerText = selectedItem.ownerName;
        document.getElementById('StudentRoom').innerText = "Room: " + selectedItem.room;
        document.getElementById('StudentSection').innerText = "Section: " + selectedItem.section;

        // Update Item Image and Details
        document.querySelector('.calculator').src = selectedItem.image;
        document.querySelector('.item-title').innerText = selectedItem.itemName;

        const rightSideInfo = document.querySelector('.right p');
        rightSideInfo.innerHTML = `
            <strong>Item Name:</strong> ${selectedItem.itemName}<br>
            <strong>Details:</strong> ${selectedItem.itemInfo}<br><br>
            Please handle with care. Return to ${selectedItem.ownerName} in ${selectedItem.room}.
        `;
    }
};