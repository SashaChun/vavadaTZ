// Firebase Authentication Module
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: Replace with your actual Firebase project configuration
// To get this configuration:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select an existing one
// 3. Add a web app to your project
// 4. Copy the firebaseConfig object from the SDK snippet
const firebaseConfig = {
  apiKey: "AIzaSyDKz3iV685jiSkC42LN0E-4G6ojMleIErw",
  authDomain: "casino-8c5db.firebaseapp.com",
  projectId: "casino-8c5db",
  storageBucket: "casino-8c5db.firebasestorage.app",
  messagingSenderId: "813191171701",
  appId: "1:813191171701:web:624ab368f2d1af3f54b23c",
  measurementId: "G-RW85L9JT25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// DOM Elements
let loginBtn;
let registerBtn;
let logoutBtn;
let userDisplayElement;
let loginModal;
let registerModal;
let closeLoginModalBtn;
let closeRegisterModalBtn;
let loginForm;
let registerForm;
let googleLoginBtn;

// Authentication state
let currentUser = null;

// Initialize auth UI elements after DOM is loaded
function initAuthUI() {
  // Get all login buttons (header and bonus page)
  const loginBtns = document.querySelectorAll('.btn--login');
  // Get all register buttons (header and bonus page)
  const registerBtns = document.querySelectorAll('.btn--register');

  // Add event listeners to all login buttons
  loginBtns.forEach(btn => {
    btn.addEventListener('click', openLoginModal);
  });

  // Add event listeners to all register buttons
  registerBtns.forEach(btn => {
    btn.addEventListener('click', openRegisterModal);
  });

  // Create modals if they don't exist
  createAuthModals();

  // Check if user is already logged in
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      currentUser = user;
      updateUIForLoggedInUser();
    } else {
      // User is signed out
      currentUser = null;
      updateUIForLoggedOutUser();
    }
  });
}

// Create authentication modals
function createAuthModals() {
  // Create login modal if it doesn't exist
  if (!document.getElementById('loginModal')) {
    const loginModalHTML = `
      <div id="loginModal" class="modal auth-modal">
        <div class="modal-content">
          <span class="close-modal" id="closeLoginModal">&times;</span>
          <div class="modal-header">
            <h2>Login to Vavada Casino</h2>
          </div>
          <div class="modal-body">
            <form id="loginForm">
              <div class="form-group">
                <label for="loginEmail">Email</label>
                <input type="email" id="loginEmail" required>
              </div>
              <div class="form-group">
                <label for="loginPassword">Password</label>
                <input type="password" id="loginPassword" required>
              </div>
              <button type="submit" class="btn btn--submit">Login</button>
            </form>
            <div class="social-login">
              <button id="googleLoginBtn" class="btn btn--google">Login with Google</button>
            </div>
            <p class="auth-switch">Don't have an account? <a href="#" id="switchToRegister">Register</a></p>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', loginModalHTML);
  }

  // Create register modal if it doesn't exist
  if (!document.getElementById('registerModal')) {
    const registerModalHTML = `
      <div id="registerModal" class="modal auth-modal">
        <div class="modal-content">
          <span class="close-modal" id="closeRegisterModal">&times;</span>
          <div class="modal-header">
            <h2>Register at Vavada Casino</h2>
          </div>
          <div class="modal-body">
            <form id="registerForm">
              <div class="form-group">
                <label for="registerEmail">Email</label>
                <input type="email" id="registerEmail" required>
              </div>
              <div class="form-group">
                <label for="registerPassword">Password</label>
                <input type="password" id="registerPassword" required>
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" required>
              </div>
              <button type="submit" class="btn btn--submit">Register</button>
            </form>
            <div class="social-login">
              <button id="googleRegisterBtn" class="btn btn--google">Register with Google</button>
            </div>
            <p class="auth-switch">Already have an account? <a href="#" id="switchToLogin">Login</a></p>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', registerModalHTML);
  }

  // Add CSS for auth modals if not already in style.css
  const authStyle = document.createElement('style');
  authStyle.textContent = `
    .auth-modal .modal-content {
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
      color: #ccc;
    }
    .form-group input {
      width: 100%;
      padding: 10px;
      border: 1px solid #444;
      background-color: #222;
      color: #fff;
      border-radius: 4px;
    }
    .btn--submit {
      width: 100%;
      margin-top: 10px;
    }
    .social-login {
      margin-top: 20px;
      text-align: center;
    }
    .btn--google {
      background-color: #4285F4;
      color: white;
      width: 100%;
    }
    .auth-switch {
      margin-top: 15px;
      text-align: center;
      color: #ccc;
    }
    .auth-switch a {
      color: var(--red);
      text-decoration: none;
    }
    .user-display {
      display: flex;
      align-items: center;
    }
    .user-email {
      margin-right: 10px;
      color: var(--yellow);
    }
  `;
  document.head.appendChild(authStyle);

  // Get modal elements
  loginModal = document.getElementById('loginModal');
  registerModal = document.getElementById('registerModal');
  closeLoginModalBtn = document.getElementById('closeLoginModal');
  closeRegisterModalBtn = document.getElementById('closeRegisterModal');
  loginForm = document.getElementById('loginForm');
  registerForm = document.getElementById('registerForm');
  googleLoginBtn = document.getElementById('googleLoginBtn');
  const googleRegisterBtn = document.getElementById('googleRegisterBtn');
  const switchToRegister = document.getElementById('switchToRegister');
  const switchToLogin = document.getElementById('switchToLogin');

  // Add event listeners
  closeLoginModalBtn.addEventListener('click', closeLoginModal);
  closeRegisterModalBtn.addEventListener('click', closeRegisterModal);
  loginForm.addEventListener('submit', handleLogin);
  registerForm.addEventListener('submit', handleRegister);
  googleLoginBtn.addEventListener('click', handleGoogleLogin);
  googleRegisterBtn.addEventListener('click', handleGoogleLogin);
  switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    closeLoginModal();
    openRegisterModal();
  });
  switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    closeRegisterModal();
    openLoginModal();
  });

  // Close modals when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
      closeLoginModal();
    }
    if (event.target === registerModal) {
      closeRegisterModal();
    }
  });

  // Create user display and logout button in header
  const headerAuth = document.querySelector('.header__auth');
  if (headerAuth) {
    // Create container for user info and logout button (initially hidden)
    const userAuthHTML = `
      <div class="user-display" style="display: none;">
        <span class="user-email"></span>
        <button class="btn btn--logout">Logout</button>
      </div>
    `;
    headerAuth.insertAdjacentHTML('beforeend', userAuthHTML);

    // Get user display elements
    userDisplayElement = document.querySelector('.user-display');
    logoutBtn = document.querySelector('.btn--logout');

    // Add event listener to logout button
    logoutBtn.addEventListener('click', handleLogout);
  }
}

// Open login modal
function openLoginModal(e) {
  if (e) e.preventDefault();
  loginModal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close login modal
function closeLoginModal() {
  loginModal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
  loginForm.reset(); // Clear form
}

// Open register modal
function openRegisterModal(e) {
  if (e) e.preventDefault();
  registerModal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close register modal
function closeRegisterModal() {
  registerModal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
  registerForm.reset(); // Clear form
}

// Handle login form submission
async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Login response:', userCredential);
    console.log('User info:', userCredential.user);
    showNotification('Login successful!', 'success');
    closeLoginModal();
  } catch (error) {
    console.error('Login error:', error);
    showNotification(`Login failed: ${error.message}`, 'error');
  }
}

// Handle register form submission
async function handleRegister(e) {
  e.preventDefault();

  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Check if passwords match
  if (password !== confirmPassword) {
    showNotification('Passwords do not match!', 'error');
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    closeRegisterModal();
    showNotification('Registration successful!', 'success');
  } catch (error) {
    console.error('Registration error:', error);
    showNotification(`Registration failed: ${error.message}`, 'error');
  }
}

// Handle Google login
async function handleGoogleLogin() {
  try {
    await signInWithPopup(auth, googleProvider);
    closeLoginModal();
    closeRegisterModal();
    showNotification('Google login successful!', 'success');
  } catch (error) {
    console.error('Google login error:', error);
    showNotification(`Google login failed: ${error.message}`, 'error');
  }
}

// Handle logout
async function handleLogout() {
  try {
    await signOut(auth);
    showNotification('Logout successful!', 'success');
  } catch (error) {
    console.error('Logout error:', error);
    showNotification(`Logout failed: ${error.message}`, 'error');
  }
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
  // Hide login and register buttons
  const loginBtns = document.querySelectorAll('.btn--login');
  const registerBtns = document.querySelectorAll('.btn--register');

  loginBtns.forEach(btn => {
    btn.style.display = 'none';
  });

  registerBtns.forEach(btn => {
    btn.style.display = 'none';
  });

  // Show user display and logout button
  if (userDisplayElement) {
    userDisplayElement.style.display = 'flex';
    const userEmailElement = userDisplayElement.querySelector('.user-email');
    if (userEmailElement) {
      userEmailElement.textContent = currentUser.email;
    }
  }

  // Update bonus page buttons if on bonus page
  const bonusLoginBtns = document.querySelectorAll('.bonus-card .btn--login');
  bonusLoginBtns.forEach(btn => {
    btn.textContent = 'Claim Now';
    btn.classList.remove('btn--login');
    btn.classList.add('btn--claim');
  });

  const bonusRegisterBtns = document.querySelectorAll('.bonus-card .btn--register');
  bonusRegisterBtns.forEach(btn => {
    btn.textContent = 'Claim Now';
    btn.classList.remove('btn--register');
    btn.classList.add('btn--claim');
  });
}

// Update UI for logged out user
function updateUIForLoggedOutUser() {
  // Show login and register buttons
  const loginBtns = document.querySelectorAll('.btn--login');
  const registerBtns = document.querySelectorAll('.btn--register');

  loginBtns.forEach(btn => {
    btn.style.display = 'inline-block';
  });

  registerBtns.forEach(btn => {
    btn.style.display = 'inline-block';
  });

  // Hide user display and logout button
  if (userDisplayElement) {
    userDisplayElement.style.display = 'none';
  }

  // Reset bonus page buttons if on bonus page
  const bonusClaimBtns = document.querySelectorAll('.bonus-card .btn--claim');
  bonusClaimBtns.forEach(btn => {
    if (btn.parentElement.querySelector('.btn--login')) {
      btn.textContent = 'Login to Claim';
      btn.classList.remove('btn--claim');
      btn.classList.add('btn--login');
    } else {
      btn.textContent = 'Register Now';
      btn.classList.remove('btn--claim');
      btn.classList.add('btn--register');
    }
  });
}

// Show notification
function showNotification(message, type) {
  // Create notification element if it doesn't exist
  let notification = document.getElementById('notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'notification';
    document.body.appendChild(notification);

    // Add CSS for notification
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
      #notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      #notification.show {
        opacity: 1;
      }
      #notification.success {
        background-color: #4CAF50;
      }
      #notification.error {
        background-color: #F44336;
      }
    `;
    document.head.appendChild(notificationStyle);
  }

  // Set notification content and style
  notification.textContent = message;
  notification.className = type;
  notification.classList.add('show');

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAuthUI);

export { auth, currentUser };


