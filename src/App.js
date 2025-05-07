import { Routes, Route } from "react-router-dom";

import Header from './components/header';
import Landing from './pages/landing';
import SignUp from './pages/auth/signup';
import Login from './pages/auth/login';


export default function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/auth">
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};