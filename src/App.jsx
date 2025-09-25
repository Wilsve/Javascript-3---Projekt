import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Countries from './pages/Countries/Countries';
import CountryDetail from './pages/Countries/CountryDetail';
import Collection from './pages/Collection/Collection';
import Quiz from './pages/Quiz/Quiz';
import Leaderboard from './pages/Leaderboard/Leaderboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:countryName" element={<CountryDetail />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;