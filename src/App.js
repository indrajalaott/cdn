// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Make sure you have this package installed
import Login from './Pages/Login';
import Home from './Pages/Home';
import MovieList from './Pages/MovieList';  // Import MovieList
import MovieDetail from './Pages/MovieDetail'; // Import MovieDetail
import ImageDisplay from './Pages/ImageDisplay'; // Import ImageDisplay component

const App = () => {
    const token = Cookies.get('token'); // Get the token from cookies

    return (
        <Router>
            <Routes>
                {/* If no token, route to Login page */}
                <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
                {/* If token is present, route to Home */}
                <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
                {/* Protected routes */}
                <Route path="/movies" element={token ? <MovieList token={token} /> : <Navigate to="/" />} />  {/* Route for Movie List */}
                <Route path="/movies/:id" element={token ? <MovieDetail token={token} /> : <Navigate to="/" />} /> {/* Route for Movie Detail */}
                {/* Route for displaying images */}
                <Route path="/movieImages/:imageName" element={<ImageDisplay />} /> {/* New route for image display */}
            </Routes>
        </Router>
    );
};

export default App;
