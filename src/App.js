// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './Pages/Login';
import Home from './Pages/Home';
import MovieList from './Pages/MovieList';
import MovieDetail from './Pages/MovieDetail';
import MovieImageComponent from './Pages/MovieImageComponent';

const App = () => {
    const token = Cookies.get('token'); // Get the token from cookies

    return (
        <Router>
            <Routes>
                {/* Redirect to Home if token exists, else to Login */}
                <Route path="/" element={<Navigate to={token ? '/home' : '/login'} replace />} />
                
                {/* Protected routes */}
                <Route path="/home" element={token ? <Home /> : <Navigate to="/login" replace />} />
                <Route path="/movies" element={token ? <MovieList token={token} /> : <Navigate to="/login" replace />} />
                <Route path="/movies/:id" element={token ? <MovieDetail token={token} /> : <Navigate to="/login" replace />} />
                <Route path="/movieImages/:imageId" element={token ? <MovieImageComponent /> : <Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;