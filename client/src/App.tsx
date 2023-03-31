import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { JoinSessionPage } from './pages/JoinSessionPage'
import { GameSessionPage } from './pages/GameSessionPage'
import { Routes, Route, Outlet, Link, BrowserRouter,  } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" index element={<JoinSessionPage />} />
          <Route path="/game/:gamePin" index element={<GameSessionPage />} />
          <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

function NoMatch()
{
  return (
    <div>
      <h1>No such route :(</h1>
    </div>
  );
}

export default App
