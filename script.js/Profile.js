function openPopup(id) {
    document.getElementById(id).classList.add('active');
}

function closePopup() {
    document.querySelectorAll('.popup').forEach(p => p.classList.remove('active'));
}

function submitReport() {
    alert("Report submitted successfully!");
    closePopup();
}

const profileName = sessionStorage.getItem('userName');
const profileEmail = sessionStorage.getItem('userEmail');
const profileID = sessionStorage.getItem('userID');
const profilePic = sessionStorage.getItem('userPic');

if (profileName) document.getElementById('profileName').innerText = profileName;
if (profileEmail) document.getElementById('profileEmail').innerText = profileEmail;
if (profileID) document.getElementById('profileID').innerText = "ID Number: " + profileID;
if (profilePic) document.getElementById('profilePic').src = profilePic;

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const viewUserId = urlParams.get('viewUser');
    const items = JSON.parse(localStorage.getItem('lendrItems')) || [];

    if (viewUserId) {
        // SCENARIO A: Viewing a Lender's Profile
        const lenderData = items.find(i => i.id == viewUserId);
        
        if (lenderData) {
            document.getElementById('profileName').textContent = lenderData.ownerName;
            document.getElementById('profilePic').src = lenderData.ownerPhoto || "img/profile-removebg-preview.png";
            document.getElementById('profileEmail').textContent = `${lenderData.ownerName.toLowerCase().replace(/\s/g, '.')}@example.com`;
            // Hide private options if viewing someone else
            document.querySelectorAll('.option').forEach(opt => {
                if(opt.innerText.includes("Log Out")) opt.style.display = 'none';
            });
        }
    } else {
        // SCENARIO B: Viewing Your Own Profile (Existing Logic)
        const data = localStorage.getItem('registeredUser');
        if (data) {
            const user = JSON.parse(data);
            if(user.fullName) document.getElementById('profileName').textContent = user.fullName;
            if(user.email) document.getElementById('profileEmail').textContent = user.email;
            if(user.schoolID) document.getElementById('profileID').textContent = "ID Number: " + user.schoolID;
            if(user.profilePic) document.getElementById('profilePic').src = user.profilePic;
        }
    }
});

function openPopup(id) { document.getElementById(id).style.display = 'flex'; }
function closePopup() { 
    const popups = document.querySelectorAll('.popup');
    popups.forEach(p => p.style.display = 'none');
}

function openPopup(id) {
    document.getElementById(id).style.display = 'flex';
}

function closePopup() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(p => p.style.display = 'none');
}