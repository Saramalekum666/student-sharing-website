function showVerification() {
    document.getElementById('verify').classList.add('active');
}

function showSignUp() {
    document.getElementById('signup').classList.add('active');
}

function showForgot() {
    document.getElementById('forgot').classList.add('active');
}

function closePopup(id) {
    document.getElementById(id).classList.remove('active');
}

function handleSignUp() {
    const username = document.getElementById('reg-username').value;
    const fullName = document.getElementById('reg-fullname').value;
    const email = document.getElementById('reg-email').value;
    const schoolID = document.getElementById('reg-id').value; 
    const password = document.getElementById('reg-password').value;
    const confirmPass = document.getElementById('reg-confirm').value;
    const fileInput = document.getElementById('reg-pic');

    // 1. Basic Validation
    if (!username || !password || !email) {
        alert("Please fill in all required fields.");
        return;
    }

    if (password !== confirmPass) {
        alert("Passwords do not match!");
        return;
    }

    // 2. Define the save logic in a reusable function
    const saveUser = (imageData) => {
        const userData = {
            username: username,
            fullName: fullName,
            email: email,
            schoolID: schoolID,
            password: password,
            profilePic: imageData || "img/profile-removebg-preview.png"
        };

        localStorage.setItem('registeredUser', JSON.stringify(userData));
        alert('Account Created Successfully!');
        closePopup('signup');
    };

    // 3. Handle Image Upload if exists
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            saveUser(e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        saveUser(null);
    }
}

function handleLogin() {
    const usernameInput = document.getElementById('login-username').value;
    const passwordInput = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    const storedData = localStorage.getItem('registeredUser');

    if (storedData) {
        const user = JSON.parse(storedData);

        if (usernameInput === user.username && passwordInput === user.password) {
            errorDiv.style.display = 'none';
            alert('Login Successful!');
            window.location.href = "home.html";
        } else {
            errorDiv.style.display = 'block';
        }
    } else {
        errorDiv.style.display = 'block';
    }
}

function showSignUp() { document.getElementById('signup').style.display = 'flex'; }
function closePopup(id) { document.getElementById(id).style.display = 'none'; }
function showForgot() { document.getElementById('forgot').style.display = 'flex'; }

// Update the 'Forgot' logic to redirect to the new page
function handleForgotRequest() {
    // Simulate sending email
    alert('Password reset email sent! Redirecting to change password page...');
    
    // Redirect to the separate file
    window.location.href = "changepassword.html";
}

function updatePassword() {
    console.log("Update Password button clicked"); // Debugging line

    const code = document.getElementById('reset-code').value;
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-new-password').value;
    const errorDiv = document.getElementById('change-error');

    // 1. Check if fields are empty
    if (!code || !newPass || !confirmPass) {
        errorDiv.innerText = "Please fill in all fields.";
        errorDiv.style.display = 'block';
        return;
    }

    // 2. Check if passwords match
    if (newPass !== confirmPass) {
        errorDiv.innerText = "Passwords do not match!";
        errorDiv.style.display = 'block';
        return;
    }

    // 3. Success
    errorDiv.style.display = 'none';
    alert('Password updated successfully! Redirecting to login...');
    window.location.href = "signupregistered.html"; 
}