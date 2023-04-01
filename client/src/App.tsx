import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { JoinSessionPage } from './pages/JoinSessionPage'
import { GameSessionPage } from './pages/GameSessionPage'
import { GameProfilePage } from './pages/GameProfilePage'
import { GameLobby } from './pages/GameLobbyPage'
import { Routes, Route, Outlet, Link, BrowserRouter,  } from "react-router-dom";
import { Page404 } from './pages/404'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" index element={<JoinSessionPage />} />
          <Route path="/game/:gamePin" index element={<GameProfilePage />} />
          <Route path="/game/:gamePin/lobby" index element={<GameLobby />} />
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
