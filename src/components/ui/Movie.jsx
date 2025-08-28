import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Movie() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const takeApi = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = 'https://api.themoviedb.org/3/movie/now_playing';
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGQzMzlhMzM2N2VlZjUyMjcwMjIxYWMyN2VkZjY1MSIsIm5iZiI6MTczNjQzNTkyNy40MDk5OTk4LCJzdWIiOiI2NzdmZThkNzM4ODE3NDM3ZTJiYWYxNjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vonhWcG5Af6bEdhOCEEGuHsQdqBC1iyuyCl6_18bbmY'
          }
        };

        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData.results || []); 
      } catch (e) {
        console.error('Error fetching movies:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    takeApi();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-lg text-gray-600">Loading movies...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">
            Error loading movies: {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600 text-lg">
          No movies found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Now Playing Movies
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item) => (
          <Link 
            key={item.id} 
            to={`/moviedetail/${item.id}`}
            className="block group"
          >
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-300 cursor-pointer h-80 group-hover:scale-105">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
               style={{
  backgroundImage: item.backdrop_path 
    ? `url('https://image.tmdb.org/t/p/w500${item.poster_path}')`
    : `url('https://via.placeholder.com/500x750/374151/ffffff?text=${encodeURIComponent(item.title || 'No Image')}')`,
}}

              >
                {/* Fallback for broken images */}
                <img 
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-0"
                 
                />
              </div>
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              
              {/* Content */}
              <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                <h3 className="text-lg font-semibold mb-2 text-white drop-shadow-lg line-clamp-2">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-medium text-sm">
                      ⭐ {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}/10
                    </span>
                  </div>
                  
                  {item.release_date && (
                    <span className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
                      {new Date(item.release_date).getFullYear()}
                    </span>
                  )}
                </div>
                
                {/* Adult content indicator */}
                {item.backdrop_path && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    18+
                  </div>
                )}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-center p-4">
                <div>
                  <p className="text-xl font-semibold mb-2">View Details</p>
                  {item.overview && (
                    <p className="text-sm line-clamp-3 opacity-90">
                      {item.overview}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Footer info */}
      <div className="text-center mt-8 text-sm text-gray-500">
        Showing {data.length} movies • Data provided by TMDB
      </div>
    </div>
  );
}

export default Movie;