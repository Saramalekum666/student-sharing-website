const itemsData = {
    calculator: [
        { name: "Standard Calculator", img: "img/gray-calculator-26572070-removebg-preview.png" },
        { name: "Basic Calculator", img: "img/calcu-removebg-preview.png" }
    ],
    scientific: [
        { name: "Scientific Calculator FX-991ES", img: "img/fx-991ES_F-removebg-preview.png" },
        { name: "Scientific Calculator FX-82MS", img: "img/1572188_SPR_JPG_Output-removebg-preview.png" }
    ],
    periodic: [
        { name: "Periodic Table (Large)", img: "img/A19hmCn31zL._AC_UF1000,1000_QL80_.jpg" },
        { name: "Periodic Table (Pocket)", img: "img/il_fullxfull.2850166762_iagd-removebg-preview.png" }
    ]
};

function showItems(category) {
    const container = document.getElementById('items-container');
    container.innerHTML = "";
    itemsData[category].forEach(item => {
        const card = document.createElement('div');
        card.classList.add('item-card');
        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <button class="borrow-btn" onclick="goToBorrow('${item.name}', '${item.img}')">Tap to Borrow</button>
        `;
        container.appendChild(card);
    });
}

function goToBorrow(itemName, itemImg) {
    sessionStorage.setItem('itemName', itemName);
    sessionStorage.setItem('itemImg', itemImg);
    window.location.href = 'borrow-profile.html';
}

// Function to run when a user borrows an item
function requestBorrow(itemName) {
    const user = JSON.parse(localStorage.getItem('registeredUser'));
    
    const notification = {
        message: `${user.username} wants to borrow ${itemName}`,
        room: user.room || "Room TBD",
        timestamp: new Date().toLocaleTimeString()
    };

    // Store the request for the Home Page to see
    localStorage.setItem('pendingRequest', JSON.stringify(notification));
    alert("Request sent!");
}

function closePopup() {
    document.getElementById('borrow-popup').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    displayUploadedItems();
});

