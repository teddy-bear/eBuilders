/**
 * User Login, Registration, Logout forms handler.
 */

// Get Name and Password input values from the form-register
var inputName = document.getElementById('name');
var inputPassword = document.getElementById('password');

// Set variables for html elements
var statusBlock = document.getElementById('form-status');
var credentialsBlock = document.getElementById('user-credentials');
var formLogin = document.getElementById('form-login');
var formRegister = document.getElementById('form-register');

// Entered data from the form-login
var userName = document.getElementById('userName');
var userPassword = document.getElementById('userPassword');

var storedName = localStorage.getItem('name');
var storedPassword = localStorage.getItem('password');

// Check if user is already registered.
function userStatusCheck() {
    if (storedName && storedPassword) {
        hideForms();
        statusBlock.innerHTML = "Welcome, " + storedName + "!<br/><em class='link' onclick='userLogout()'>Logout</em>";
        credentialsBlock.style.display = "block";
        document.body.className = 'registered';
    }
}

// Set local storage form-register submit
function submitRegistrationForm() {
    localStorage.setItem('name', inputName.value);
    localStorage.setItem('password', inputPassword.value);
    document.body.className = 'logged-in';
    statusBlock.style.display = "block";
    statusBlock.innerHTML = "<p class='message-success'>Congratulations, " + inputName.value + "! You`ve been successfully registered.<br/><em class='link' onclick='userLogout()'>Logout</em></p>";
    hideForms();
}

// Show login form and hide registration.
function showLoginForm() {
    formLogin.style.display = 'block';
    formRegister.style.display = 'none';
    credentialsBlock.style.display = 'none';
}

// Show registration form and hide login.
function showRegistrationForm() {
    formLogin.style.display = 'none';
    if (storedName && storedPassword) {
        statusBlock.style.display = "none";
        showCredentials();
    } else {
        formRegister.style.display = 'block';
    }
}

// Hide both forms.
function hideForms() {
    formLogin.style.display = 'none';
    formRegister.style.display = 'none';
}

// User logout hooks.
function userLogout() {
    showLoginForm();
    localStorage.removeItem('user_status');
    document.body.className = '';
    statusBlock.innerHTML = 'Logged out';
    setTimeout(function () {
        statusBlock.style.display = "none"
    }, 3000);
}

// Check if stored data from form-register is equal to entered data in the form-login
function submitLoginForm() {
    storedName = localStorage.getItem('name');
    storedPassword = localStorage.getItem('password');

    // Refresh fields validation on submit.
    document.getElementById('userName').classList.remove('invalid');
    document.getElementById('userName').classList.remove('invalid');

    // Check if stored data from form-register is equal to data from login form
    if (userName.value == storedName && userPassword.value == storedPassword) {
        statusBlock.style.display = "block";
        statusBlock.innerHTML = "<p class='message-success'>Welcome, " + storedName + "!<br/><em class='link' onclick='userLogout()'>Logout</em></p>";
        localStorage.setItem('user_status', 'logged_in');
        document.body.className = 'logged-in';
        hideForms();
        console.log('ok');
    } else if (userName.value != storedName) {
        document.getElementById("userName").className = 'invalid';
        statusBlock.style.display = "block";
        statusBlock.innerHTML = "<span class='message-error'>wrong username</span>";
        localStorage.removeItem('user_status');
    }
    else if (userPassword.value != storedPassword) {
        document.getElementById("userPassword").className = 'invalid';
        statusBlock.style.display = "block";
        statusBlock.innerHTML = "<span class='message-error'>wrong password</span>";
        localStorage.removeItem('user_status');
    }
}

// Display user details when logged in.
function showCredentials() {
    credentialsBlock.style.display = 'block';
    credentialsBlock.innerHTML = "You are already registered!<br>User Name: " + storedName + "<br> Password: " + storedPassword;
    credentialsBlock.innerHTML += '<br>';
    credentialsBlock.innerHTML += "<em class='link' onclick='showLoginForm()'>back to login</em>";
}

// Clear username / password session values.
function clearLocalStorage() {
    localStorage.removeItem('name');
    localStorage.removeItem('password');
    location.reload();
}
