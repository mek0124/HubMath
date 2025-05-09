import { Routes, Route } from "react-router-dom";

import Header from './components/header';
import Landing from './pages/landing';
import SignUp from './pages/auth/signup';
import Login from './pages/auth/login';
import Forgot from "./pages/auth/forgot";
import GameMenu from "./pages/game/menu";
import GamePlay from "./pages/game/gamePlay";


export default function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/auth">
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot" element={<Forgot />} />
        </Route>

        <Route path="/game">
          <Route path="menu" element={<GameMenu />} />
          <Route path="play" element={<GamePlay />} />
        </Route>
      </Routes>
    </div>
  );
};