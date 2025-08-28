import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Movie() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const takeApi = async () => {
      try {
        const api = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing',
          {
            method: "GET",
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGQzMzlhMzM2N2VlZjUyMjcwMjIxYWMyN2VkZjY1MSIsIm5iZiI6MTczNjQzNTkyNy40MDk5OTk4LCJzdWIiOiI2NzdmZThkNzM4ODE3NDM3ZTJiYWYxNjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vonhWcG5Af6bEdhOCEEGuHsQdqBC1iyuyCl6_18bbmY'
            }
          }
        );
        const jsonData = await api.json();
        setdata(jsonData.results); 
      } catch (e) {
        console.log(e);
      }
    };
    takeApi();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item) => (
          <Link 
            key={item.id} 
            to={`/moviedetail/${item.id}`}
            className="block"
          >
            <div className="relative bg-gray-900 rounded-2xl bg-center bg-cover bg-no-repeat overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer h-80">
              <div 
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/w500${item.backdrop_path}')`,
                }}
              ></div>
              
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              
              <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                <h3 className="text-lg font-semibold mb-2 text-white drop-shadow-lg">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-medium">
                    ⭐ {item.vote_average.toFixed(1)}/10
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition flex items-center justify-center text-white text-center p-4">
                <p className="text-xl font-semibold">Watch Now</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Movie;