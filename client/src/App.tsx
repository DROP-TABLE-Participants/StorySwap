import './App.css'
import { JoinSessionPage } from './pages/JoinSessionPage'
import { GameSessionPage } from './pages/GameSessionPage'
import { GameProfilePage } from './pages/GameProfilePage'
import { GameLobby } from './pages/GameLobbyPage'
import { GameRound } from './pages/GameRoundPage'
import { Routes, Route, Outlet, Link, BrowserRouter,  } from "react-router-dom";
import { Page404 } from './pages/404'



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" index element={<JoinSessionPage/>} />
          <Route path="/game/:gamePin" element={<GameProfilePage />} />
          <Route path="/game/:gamePin/lobby" element={<GameLobby />} />
          <Route path="/game/:gamePin/round" element={<GameRound />} />
          <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

function NoMatch()
{
  return (
    <Page404 />
  );
}

export default App
