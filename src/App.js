import { Routes, Route, useNavigate } from "react-router-dom";

import Header from './components/header';
import Landing from './pages/landing';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';


const SignUp = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      // Here you can send the token to your backend to validate the user
      // and create a session. For this example, we'll just redirect to the landing page.
      navigate("/");
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <button onClick={() => login()}>
      Sign in with Google 🚀
    </button>
  );
};

export default function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex flex-col items-center justify-center w-full h-[100vh]">
        <Header />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/signup" element={<SignUp />} />

        {/* 
        <Route path="/auth">
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/game">
          <Route path="/menu" element={<GameMenu />} />
          <Route path="/play" element={<GameScreen />} />
        </Route>

        <ProtectedRoute>
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </ProtectedRoute>
        */}
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
};