const signupForm = document.getElementById('signup-form');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message');
const profilePage = document.getElementById('profile-page');
const signupPage = document.getElementById('signup-page');
const logoutButton = document.getElementById('logout');
const profileContainer = document.querySelector('.profile-container');

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!firstName || !lastName || !email || !password) {
        errorMessage.textContent = 'All fields are mandatory.';
        return;
    }

    const accessToken = generateRandomToken();

    const user = {
        firstName,
        lastName,
        email,
        accessToken,
    };

    localStorage.setItem('user', JSON.stringify(user));

    successMessage.textContent = 'Signup successful. Redirecting to profile...';
    setTimeout(() => {
        showProfilePage();
    }, 2000);
});

const user = JSON.parse(localStorage.getItem('user'));
if (user && user.accessToken) {
    showProfilePage();
}

function showProfilePage() {
    signupPage.style.display = 'none';
    profilePage.style.display = 'block';

    const fullName = user.firstName + ' ' + user.lastName;
    profileContainer.innerHTML = `<h2>Welcome, ${fullName}</h2><p>Email: ${user.email}</p>`;
}

logoutButton.addEventListener('click', function () {
    localStorage.clear();
    window.location.href = 'index.html';
});

function generateRandomToken(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        token += charset.charAt(randomIndex);
    }

    return token;
}