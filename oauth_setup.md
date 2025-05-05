# Google OAuth Setup Guide

This guide provides detailed instructions on how to set up Google OAuth for your React application.
## 1. Create a Google Cloud Project

*   Go to the [Google Cloud Console](https://console.cloud.google.com/).
*   If you don't have a project already, create a new project. Give it a name and select an organization (if applicable).

## 2. Enable the Google Sign-In API

*   In the Cloud Console, go to "APIs & Services" > "Library".
*   Search for "Google Sign-In API" and enable it.

## 3. Create OAuth 2.0 Credentials

*   In the Cloud Console, go to "APIs & Services" > "Credentials".
*   Click "Create Credentials" and select "OAuth client ID".
*   You might be prompted to configure the consent screen. If so, click "Configure consent screen".
    *   Choose "External" as the user type and click "Create".
    *   Fill in the required information, such as the app name, user support email, and developer contact information.
    *   For scopes, add "openid", "profile", and "email".
        *   **openid:**  This scope is required for OpenID Connect, which is used for authentication. It allows you to retrieve basic information about the user, such as their user ID.
        *   **profile:** This scope allows you to access the user's profile information, such as their name, profile picture, and other public profile details.
        *   **email:** This scope allows you to access the user's email address.
    *   Save the consent screen configuration.
*   Now, back to creating the OAuth client ID:
    *   Select "Web application" as the application type.
    *   Give it a name (e.g., "React App").
    *   In the "Authorized JavaScript origins" field, add the origin of your React app (e.g., `http://localhost:3000` for local development).
        *   **Important:** This is the URL where your React app is running. If you are deploying your app to a different domain, you need to add that domain to the authorized JavaScript origins.
    *   In the "Authorized redirect URIs" field, add the redirect URI for your app. This will be the URL that Google redirects the user to after they authenticate. In this case, it will be `http://localhost:3000/auth/signup` for local development.
        *   **Important:** This URL must match the URL that you are using in your React app to handle the Google Auth callback.
    *   Click "Create".

## 4. Get Your Client ID and Client Secret

*   After creating the OAuth client ID, you'll see a dialog box containing your client ID and client secret.
*   **Important:** Keep your client secret secure. Do not expose it in your client-side code.

## 5. Configure the `GoogleOAuthProvider` in your React app

*   In your React app, wrap your app component with the `GoogleOAuthProvider` component.
*   Pass your Google Client ID as the `clientId` prop to the `GoogleOAuthProvider` component.

    ```javascript
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      {/* Your app content */}
    </GoogleOAuthProvider>
    ```
    *   Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Google Client ID.

## 6. Use the `useGoogleLogin` hook

*   Use the `useGoogleLogin` hook to initiate the Google sign-in process.
*   The `onSuccess` callback will be called when the user successfully authenticates.
*   The `onError` callback will be called if there is an error during the authentication process.

    ```javascript
    const login = useGoogleLogin({
      onSuccess: tokenResponse => {
        console.log(tokenResponse);
        // Here you can send the token to your backend to validate the user
        // and create a session.
      },
      onError: errorResponse => console.log(errorResponse),
    });
    ```

## 7. Handle the Token Response

*   In the `onSuccess` callback, you will receive a `tokenResponse` object containing the Google access token.
*   Send this token to your backend to validate the user and create a session.
*   **Important:** Do not directly use the access token to access Google APIs from your client-side code. Always validate the token on your backend first.

## 8. Backend Integration

*   Set up an endpoint on your backend (e.g., `/api/auth/google`) to receive the Google access token.
*   Use a server-side Google authentication library (e.g., `google-auth-library` for Node.js) to validate the token with Google's servers.
*   If the token is valid, create a user account in your database (if one doesn't already exist) and create a session for the user.
*   Return a success response to the client-side app.

## 9. Redirect the User

*   After successfully creating a session on the backend, redirect the user to the landing page or any other page in your app.

## Troubleshooting

*   **Error: "redirect_uri_mismatch"**
    *   This error occurs when the redirect URI in your Google Cloud Console project does not match the redirect URI in your React app.
    *   Make sure that the "Authorized redirect URIs" field in your Google Cloud Console project is set to the correct redirect URI for your app (e.g., `http://localhost:3000/auth/signup` for local development).
*   **Error: "Origin is not allowed"**
    *   This error occurs when the origin of your React app is not authorized in your Google Cloud Console project.
    *   Make sure that the "Authorized JavaScript origins" field in your Google Cloud Console project is set to the correct origin for your app (e.g., `http://localhost:3000` for local development).
*   **Error: "Invalid client"**
    *   This error occurs when the client ID in your React app is not valid.
    *   Make sure that you have replaced `YOUR_GOOGLE_CLIENT_ID` with your actual Google Client ID.

## Additional Notes

*   **Client Secret Security:** Never expose your client secret in your client-side code. This is a sensitive piece of information that should be kept confidential.
*   **Backend Validation:** Always validate the Google access token on your backend before creating a user session. This is important for security and to prevent unauthorized access to your app.
*   **User Data Storage:** When you create a user account in your database, make sure to store the user's information securely. Follow best practices for data storage and security.
*   **Error Handling:** Implement proper error handling in your React app and on your backend to handle any errors that may occur during the Google Auth process.
*   **Testing:** Thoroughly test your Google Auth implementation to make sure that it is working correctly. Test all possible scenarios, including successful login, failed login, and error conditions.

This guide should help you set up Google OAuth for your React application. If you have any questions, please feel free to ask.