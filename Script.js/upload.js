function previewImage(inputId, imgId) {
    const fileInput = document.getElementById(inputId);
    const preview = document.getElementById(imgId);
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}


function submitUpload() {
    // Get values from the upload form
    const newItem = {
        id: Date.now(), // Unique ID for the URL
        ownerName: document.getElementById('name').value,
        room: document.getElementById('room').value,
        section: document.getElementById('section').value,
        itemName: document.getElementById('itemName').value,
        itemInfo: document.getElementById('itemInfo').value,
        image: document.getElementById('itemPreview').src // The previewed image
    };

    // Get existing items or start a new list
    const items = JSON.parse(localStorage.getItem('lendrItems')) || [];
    items.push(newItem);

    // Save back to localStorage
    localStorage.setItem('lendrItems', JSON.stringify(items));

    alert("Item posted successfully!");
    window.location.href = 'home.html'; // Redirect to home to see the new item
}