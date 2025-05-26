# Vavada Casino Website

This is a casino website project with Firebase authentication integration.

## Firebase Authentication Setup

This project uses Firebase for authentication. Follow these steps to set up Firebase:

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Enable Google Analytics if desired

2. **Register Your Web App**:
   - In your Firebase project, click on the web icon (</>) to add a web app
   - Register your app with a nickname (e.g., "vavada-casino")
   - Copy the Firebase configuration object

3. **Update Firebase Configuration**:
   - Open `js/firebase-auth.js`
   - Replace the placeholder values in the `firebaseConfig` object with your actual Firebase project details

4. **Enable Authentication Methods**:
   - In Firebase Console, go to "Authentication" > "Sign-in method"
   - Enable "Email/Password" authentication
   - Enable "Google" authentication
   - Configure any other authentication methods as needed

## Authentication Features

The authentication system includes:

- **Email/Password Authentication**: Users can register and login with email and password
- **Google Authentication**: Users can sign in with their Google accounts
- **UI Integration**: Login/Register buttons in the header and on bonus pages
- **User State Management**: UI updates based on authentication state
- **Notification System**: Success/error messages for authentication actions

## Development

### Prerequisites

- Node.js and npm installed

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start development server:
   ```
   npm start
   ```

3. Build for production:
   ```
   npm run build
   ```

## Project Structure

- `index.html`, `review.html`, `bonus.html`: Main HTML pages
- `js/app.js`: Main application logic
- `js/firebase-auth.js`: Firebase authentication implementation
- `css/style.css`: Styles for the application

## Authentication UI

The authentication system adds the following UI elements:

- Login and registration modals
- User display with email and logout button in the header
- Notification system for success/error messages

When a user is logged in:
- Login/Register buttons are hidden
- User email and logout button are displayed
- Bonus page buttons change to "Claim Now"

## License

[License information]
