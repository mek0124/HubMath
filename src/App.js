import { Routes, Route } from "react-router-dom";

import Header from './components/header';
import Landing from './pages/landing';


export default function App() {
  return (
    <div className="flex flex-col item-center justify-center w-full h-[100vh]">
      <Header />
      
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
};
