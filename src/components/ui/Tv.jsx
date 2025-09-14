import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Tv() {
  const [data, setData] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const apitake = async () => {
      try {
        const take = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=aacdbe83dedab8fc913bd72adf3fdbad');
        const result = await take.json();
        setData(result.results || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    }
    
    apitake();
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % Math.min(data.length, 5));
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [data.length])

  // Show loading state if no data
  if (data.length === 0) {
    return (
      <div className="bg-gray-950 min-h-screen text-white flex items-center justify-center">
        <div className="text-xl">Loading TV shows...</div>
      </div>
    );
  }

  // Get the current show for the banner
  const featuredShow = data[currentBannerIndex];

  // Handle manual banner navigation
  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % Math.min(data.length, 10));
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + Math.min(data.length, 10)) % Math.min(data.length, 10));
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.2s both;
        }
        
        /* Floating animation for the entire banner */
        .floating-banner {
          animation: floating 6s ease-in-out infinite;
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        /* Parallax effect */
        .parallax-bg {
          animation: parallax 20s linear infinite;
        }
        
        @keyframes parallax {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50px); }
        }
      `}</style>
      
      {/* Banner with Animation */}
      <section className="relative h-[80vh] overflow-hidden rounded-b-2xl shadow-xl">
        {/* Background Images with Smooth Transition */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${featuredShow?.backdrop_path || featuredShow?.poster_path})`,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Content */}
        <div className="relative h-full flex items-end p-10">
          <div className="bg-black/50 p-6 rounded-xl backdrop-blur-sm transform transition-all duration-700 ease-out">
            <h2 className="text-4xl font-bold mb-2 animate-fade-in">
              Featured: {featuredShow?.name}
            </h2>
            <p className="max-w-lg mt-2 text-gray-200 animate-slide-up">
              {featuredShow?.overview}
            </p>
            <div className="flex gap-4 mt-6">
              <Link 
                to={`/tvdetail/${featuredShow?.id}`}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                ▶ Watch Now
              </Link>
              <Link 
                to={`/tvdetail/${featuredShow?.id}`}
                className="px-6 py-2 bg-gray-800/70 hover:bg-gray-700/70 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                ℹ More Info
              </Link>
            </div>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevBanner}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
        >
          ❮
        </button>
        <button 
          onClick={nextBanner}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
        >
          ❯
        </button>
        
        {/* Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {data.slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBannerIndex 
                  ? 'bg-red-600 scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* TV Shows Grid */}
      <main className="px-8 py-10">
        <h3 className="text-2xl font-semibold mb-6">Popular TV Shows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6">
          {data.map((show) => (
            <Link 
              key={show.id}
              to={`/tvdetail/${show.id}`}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer block"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className="w-full h-72 object-cover"
              />
              <div className="p-3">
                <h4 className="text-lg font-bold">{show.name}</h4>
                <p className="text-gray-400 text-sm">⭐ {show.vote_average?.toFixed(1)}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Tv