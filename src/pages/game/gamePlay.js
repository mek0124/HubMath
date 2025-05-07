import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../../hooks/api";


export default function GamePlay() {
  const [equation, setEquation] = useState('');
  const [solution, setSolution] = useState(null);

  const location = useLocation();
  const { gameInfo } = location.state || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (gameInfo === null) {
      return navigate("/game/menu");
    }
  }, [gameInfo, navigate]);
};
