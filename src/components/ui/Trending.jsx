import React, { useEffect, useState } from 'react'

function Trending() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const take = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=aacdbe83dedab8fc913bd72adf3fdbad');
      const result = await take.json();
      setData(result.results); // results is the array
    };

    fetchApi();
  }, []);

  return (
    <div className="bg-gradient-to-r bg-white min-h-screen flex flex-col justify-center items-center text-white p-6">
      
      {/* Header */}
      <section className="text-center space-y-6 mb-16">
        <h1 className="text-5xl font-bold text-black animate-bounce">Trending Movies</h1>
        <p className="text-xl text-black animate-pulse">Discover the top picks of the week!</p>
      </section>

      {/* Movies Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center w-full max-w-6xl">
        {data.map(movie => (
          <div
            key={movie.id}
            className=" bg-gray-900 text-white bg-opacity-20 p-6 rounded-lg transform transition-transform hover:scale-105"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{movie.original_title}</h2>
            <p className="mb-1">{movie.overview}</p>
            <p>Released: {movie.release_date}</p>
            <a
              href="#"
              className="inline-block bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg mt-4 transform transition-transform hover:scale-110"
            >
              Watch Now
            </a>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Trending;
