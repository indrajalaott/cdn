import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageTopFive.css'; // Custom CSS

const ManageTopFive = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedMovies, setAddedMovies] = useState([]); // Track added movies
  const [topFiveMovies, setTopFiveMovies] = useState([]); // State for top 5 movies

  // Fetching all available movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.indrajala.in/api/admin/showallmovies', {
          headers: {
            'x-access-protected': token
          }
        });
        setMovies(response.data); // Set the fetched movies
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [token]);

  // Fetching top 5 movies
  useEffect(() => {
    const fetchTopFiveMovies = async () => {
      try {
        const response = await axios.get('https://api.indrajala.in/api/admin/ViewTop5Movies');
        console.log('Top 5 Movies:', response.data); // Log the response data to the console
        setTopFiveMovies(response.data.movies); // Save the top 5 movies in state
      } catch (error) {
        console.error('Failed to fetch top 5 movies:', error);
      }
    };

    fetchTopFiveMovies();
  }, []);

  // Function to handle adding movie to the top five list
  const addToList = async (movieID) => {
    try {
      const response = await axios.post(
        'https://api.indrajala.in/api/admin/AddtoList',
        {
          movieID,
          cat: 1 // cat set to 1 for top five movies
        },
        {
          headers: {
            'x-access-protected': token
          }
        }
      );

      if (response.status === 201) {
        setAddedMovies((prevAddedMovies) => [...prevAddedMovies, movieID]);
      } else {
        setError('Failed to add movie to the list');
      }
    } catch (error) {
      setError('Failed to add movie to the list');
    }
  };

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="manage-container">
      <h1>Manage Top Five Movies</h1>
      <div className="split-page">
        <div className="available-movies">
          <h2>Available Movies</h2>
          <div className="movie-list">
            {movies.map(movie => (
              <div key={movie._id} className="movie-item">
                <div className="movie-image">
                  <img
                    src={`https://api.indrajala.in/public${movie.movieMobileImage}`}
                    alt={movie.movieName}
                  />
                </div>
                <div className="movie-details">
                  <h3>{movie.movieName}</h3>
                  <p>{movie.description}</p>
                  <span className="movie-category">{movie.category.join(', ')}</span>
                  <button
                    className="add-button"
                    onClick={() => addToList(movie._id)}
                    disabled={addedMovies.includes(movie._id)} // Disable button if already added
                  >
                    {addedMovies.includes(movie._id) ? 'Added to List' : 'Add to List'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="top-five-section">
          <h2>Top Five Movies</h2>
          <div className="top-five-list">
            {topFiveMovies.length > 0 ? (
              topFiveMovies.map(movie => (
                <div key={movie._id} className="movie-item">
                  <div className="movie-image">
                    <img
                      src={`https://api.indrajala.in/public${movie.movieMobileImage}`}
                      alt={movie.movieName}
                    />
                  </div>
                  <div className="movie-details">
                    <h3>{movie.movieName}</h3>
                    <p>{movie.description}</p>
                    <span className="movie-category">{movie.category.join(', ')}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No movies in the top 5 list</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTopFive;
