import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Trending() {
  const [data, setData] = useState([]);
  const {id}=useParams();
 

  useEffect(() => {
    const fetchApi = async () => {
      const take = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=aacdbe83dedab8fc913bd72adf3fdbad');
      const result = await take.json();
      setData(result.results); // results is the array
    };

    fetchApi();
  }, []);

  return (
    <div className="bg-gradient-to-r bg-black min-h-screen flex flex-col justify-center items-center text-white p-6">
      
      {/* Header */}
      <section className="text-center space-y-6 mb-16">
        <h1 className="text-5xl font-bold text-red-700 animate-bounce">Trending Movies</h1>
        <p className="text-xl text-red-700 animate-pulse">Discover the top picks of the week!</p>
      </section>

      {/* Movies Grid */}
      <section className=" md:grid md:grid-cols-2 xl:grid xl:grid-cols-4 gap-8 text-center w-full ">
        {data.map(movie => (
          <div
            key={movie.id}
            className=" bg-gray-900 text-white bg-opacity-20 p-6 rounded-lg transform transition-transform hover:scale-[102%]"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{movie.original_title}</h2>
            
            <p>Released: {movie.release_date}</p>
         
          <Link to={`/trending/${movie.id}`}>
            <a
              href="#"
              className="inline-block bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg mt-4 transform transition-transform hover:scale-110"
            >
              Watch Now
            </a>
          </Link>
          
          </div>
        ))}
      </section>
    </div>
  )
}

export default Trending;
