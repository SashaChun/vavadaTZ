// Reviews Module
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Firebase configuration is already defined in firebase-auth.js
// We'll use the same configuration here
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
const db = getFirestore(app);
const auth = getAuth(app);

// DOM Elements
let reviewForm;
let reviewsList;
let ratingInput;
let reviewTextInput;
let submitReviewBtn;
let currentUser = null;

// Initialize reviews UI elements after DOM is loaded
function initReviewsUI() {
  // Get DOM elements
  reviewForm = document.getElementById('reviewForm');
  reviewsList = document.getElementById('reviewsList');
  ratingInput = document.getElementById('rating');
  reviewTextInput = document.getElementById('reviewText');
  submitReviewBtn = document.getElementById('submitReview');

  // Check if user is logged in
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      currentUser = user;
      enableReviewForm();
    } else {
      // User is signed out
      currentUser = null;
      disableReviewForm();
    }
  });

  // Add event listener to review form
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleReviewSubmission);
  }

  // Load existing reviews
  loadReviews();
}

// Enable review form for logged in users
function enableReviewForm() {
  if (reviewForm) {
    reviewForm.classList.remove('disabled');
    submitReviewBtn.disabled = false;
    document.getElementById('loginToReview').style.display = 'none';
  }
}

// Disable review form for logged out users
function disableReviewForm() {
  if (reviewForm) {
    reviewForm.classList.add('disabled');
    submitReviewBtn.disabled = true;
    document.getElementById('loginToReview').style.display = 'block';
  }
}

// Handle review submission
async function handleReviewSubmission(e) {
  e.preventDefault();

  if (!currentUser) {
    showNotification('Please login to submit a review', 'error');
    return;
  }

  const rating = parseInt(ratingInput.value);
  const reviewText = reviewTextInput.value.trim();

  if (!rating || !reviewText) {
    showNotification('Please provide both a rating and review text', 'error');
    return;
  }

  try {
    // Add review to Firestore
    await addDoc(collection(db, "reviews"), {
      userId: currentUser.uid,
      userEmail: currentUser.email,
      rating: rating,
      text: reviewText,
      timestamp: new Date()
    });

    // Clear form
    reviewForm.reset();

    // Show success notification
    showNotification('Review submitted successfully!', 'success');

    // Reload reviews
    loadReviews();
  } catch (error) {
    console.error('Error submitting review:', error);
    showNotification(`Error submitting review: ${error.message}`, 'error');
  }
}

// Load reviews from Firestore
async function loadReviews() {
  if (!reviewsList) return;

  try {
    // Clear existing reviews
    reviewsList.innerHTML = '<div class="loading">Loading reviews...</div>';

    // Get reviews from Firestore, ordered by timestamp (newest first)
    const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"), limit(10));
    const querySnapshot = await getDocs(q);

    // Clear loading message
    reviewsList.innerHTML = '';

    if (querySnapshot.empty) {
      reviewsList.innerHTML = '<div class="no-reviews">No reviews yet. Be the first to leave a review!</div>';
      return;
    }

    // Add reviews to the list
    querySnapshot.forEach((doc) => {
      const review = doc.data();
      const reviewElement = createReviewElement(review);
      reviewsList.appendChild(reviewElement);
    });
  } catch (error) {
    console.error('Error loading reviews:', error);
    reviewsList.innerHTML = '<div class="error">Error loading reviews. Please try again later.</div>';
  }
}

// Create a review element
function createReviewElement(review) {
  const reviewElement = document.createElement('div');
  reviewElement.classList.add('review-item');

  // Format date
  const date = review.timestamp.toDate();
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  // Create stars for rating
  let starsHTML = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= review.rating) {
      starsHTML += '<span class="star filled">★</span>';
    } else {
      starsHTML += '<span class="star">☆</span>';
    }
  }

  // Set review content
  reviewElement.innerHTML = `
    <div class="review-header">
      <div class="review-user">${review.userEmail.split('@')[0]}</div>
      <div class="review-date">${formattedDate}</div>
    </div>
    <div class="review-rating">${starsHTML}</div>
    <div class="review-text">${review.text}</div>
  `;

  return reviewElement;
}

// Show notification (reusing the function from firebase-auth.js)
function showNotification(message, type) {
  // Create notification element if it doesn't exist
  let notification = document.getElementById('notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'notification';
    document.body.appendChild(notification);

    // Add CSS for notification if not already added
    if (!document.getElementById('notification-style')) {
      const notificationStyle = document.createElement('style');
      notificationStyle.id = 'notification-style';
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
document.addEventListener('DOMContentLoaded', initReviewsUI);

export { loadReviews };
