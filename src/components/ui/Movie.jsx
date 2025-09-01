import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Movie() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const takeapi = async () => {
      const take = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=aacdbe83dedab8fc913bd72adf3fdbad"
      );
      const result = await take.json();
      setData(result.results); // <- note: 'results' contains the array
    };

    takeapi();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-4  gap-4 p-[30px]">
      {data.map((item) => (
        <div
          key={item.id}
          className=" bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-95 transform transition duration-300 cursor-pointer"
        >
          <div
            className="h-80 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
            }}
          ></div>

          <div className="p-4">
            <h2 className="text-white text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-400 text-sm mb-3">Action, Adventure</p>
            <div className="flex items-center justify-between">
              <span className="text-yellow-400 font-semibold">
                ⭐ {item.vote_average}
              </span>
              <Link to={`/moviedetail/${item.id}`}>
              <button className="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition">
                Watch
              </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Movie;
