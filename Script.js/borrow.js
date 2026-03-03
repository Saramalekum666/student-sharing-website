function updateStatus(status) {
    const bubble = document.getElementById('statusBubble');
    if (status === 'Approved') {
        bubble.innerText = "APPROVED ✅ Proceed to meet and borrow.";
        bubble.style.background = "#6b7a4a";
        bubble.style.color = "white";
    } else if (status === 'Cancelled') {
        bubble.innerText = "Request Cancelled ❌";
        bubble.style.background = "#e74c3c";
        bubble.style.color = "white";
    }
}

function chatStudent() {
    alert("Opening chat with NINONIEL DAKAY...");
}