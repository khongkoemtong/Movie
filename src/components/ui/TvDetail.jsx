import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function TvDetail() {
  const [data, setData] = useState([]);
  const {id}=useParams();

  useEffect(() => {
    const takedata = async () => {
      try {
        const take = await fetch(
          'https://api.themoviedb.org/3/tv/popular?api_key=aacdbe83dedab8fc913bd72adf3fdbad'
        );
        const result = await take.json();
        setData(result.results); // important
      } catch (e) {
        console.log(e);
      }
    };

    takedata();
  }, [id]);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {data
      .filter(item => item.id === parseInt(id))
      .map((item) => (
        <div key={item.id} className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt={item.name || item.original_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl">
                <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {item.original_name}
                </h1>

                <div className="flex items-center space-x-6 mb-6 text-gray-300">
                  <span className="text-white font-semibold">⭐ {item.vote_average}</span>
                  <span>{item.first_air_date}</span>
                  <span>6 Seasons</span>
                  <span className="px-2 py-1 bg-gray-800/50 rounded text-sm">TV-MA</span>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
                  {item.overview}
                </p>

                <div className="flex items-center space-x-4">
                  <Link to={`/tvdetail/more/${item.id}`}>
                  <button className="flex items-center px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105">
                    Play
                  </button>
                  </Link>
                  <button className="flex items-center px-6 py-3 bg-gray-700/50 text-white rounded-lg font-semibold hover:bg-gray-600/50 transition-all">
                    My List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TvDetail;
