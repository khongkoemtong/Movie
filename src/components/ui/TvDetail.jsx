import React, { useState, useEffect } from 'react';
import { data } from 'react-router-dom';

function TvDetail() {
  // Mock data - in real app, this would come from API or props
  const [showData, setShowData] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  useEffect(() => {
    // Simulate API call
    const setShowData =async()=>{
      const take = await fetch(`https://api.themoviedb.org/3/tv/popular/${id}?api_key=aacdbe83dedab8fc913bd72adf3fdbad`);
      const result = await take.json();

     setShowData(result);
    }
    
    
  }, [id]);

  if (!showData) {
    return (
      <div className="bg-gray-950 min-h-screen text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const currentSeasonEpisodes = showData.episodes.filter(ep => ep.season_number === selectedSeason);

  return (
   <div>

    {

      data.map(()=>{
         <div className="bg-gray-950 min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${showData.backdrop_path})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
        
        {/* Content */}
        <div className="relative flex items-center h-full px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row items-start gap-8 max-w-7xl w-full">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img 
                src={`https://image.tmdb.org/t/p/w500${showData.poster_path}`}
                alt={showData.name}
                className="w-64 h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {showData.name}
                </h1>
                <div className="flex items-center gap-4 text-lg">
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded font-bold">
                    ⭐ {showData.vote_average}
                  </span>
                  <span>{new Date(showData.first_air_date).getFullYear()}</span>
                  <span className="bg-red-600 px-2 py-1 rounded text-sm">HD</span>
                  <span>{showData.number_of_seasons} Season{showData.number_of_seasons > 1 ? 's' : ''}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {showData.genres.map((genre, index) => (
                  <span key={index} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                {showData.overview}
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsTrailerPlaying(true)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  ▶ Play Trailer
                </button>
                <button className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700/80 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105">
                  + My List
                </button>
                <button className="flex items-center gap-2 bg-transparent border-2 border-gray-600 hover:border-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200">
                  ↓ Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-8 lg:px-16 py-12 space-y-16">
        
        {/* Episodes Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Episodes</h2>
            <select 
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-red-600 outline-none"
            >
              {showData.seasons.map((season) => (
                <option key={season.season_number} value={season.season_number}>
                  Season {season.season_number}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid gap-4">
            {currentSeasonEpisodes.map((episode, index) => (
              <div key={episode.id} className="bg-gray-900/50 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer group">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-2xl font-bold group-hover:bg-red-600 transition-colors">
                    {episode.episode_number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold group-hover:text-red-400 transition-colors">
                        {episode.name}
                      </h3>
                      <span className="text-gray-400">{episode.runtime}m</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      <span>{episode.air_date}</span>
                      <span>⭐ {episode.vote_average}</span>
                    </div>
                    <p className="text-gray-300">Episode {episode.episode_number} of Season {episode.season_number}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cast Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {showData.cast.map((actor, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-full h-48 bg-gray-800 rounded-xl mb-3 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl">
                    👤
                  </div>
                </div>
                <h3 className="font-semibold group-hover:text-red-400 transition-colors">
                  {actor.name}
                </h3>
                <p className="text-gray-400 text-sm">{actor.character}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Show Details */}
        <section className="bg-gray-900/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8">Show Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 font-medium">Created by: </span>
                <span>{showData.created_by.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium">Network: </span>
                <span>{showData.networks.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium">Status: </span>
                <span className="bg-green-600 px-2 py-1 rounded text-sm">{showData.status}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 font-medium">First Air Date: </span>
                <span>{new Date(showData.first_air_date).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium">Runtime: </span>
                <span>{showData.runtime[0]} minutes</span>
              </div>
              <div>
                <span className="text-gray-400 font-medium">Total Episodes: </span>
                <span>{showData.number_of_episodes}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Shows */}
        <section>
          <h2 className="text-3xl font-bold mb-8">More Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {showData.similar.map((similar) => (
              <div key={similar.id} className="group cursor-pointer">
                <div className="bg-gray-800 rounded-xl overflow-hidden mb-3 transform group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-6xl">📺</span>
                  </div>
                </div>
                <h3 className="font-semibold group-hover:text-red-400 transition-colors">
                  {similar.name}
                </h3>
                <p className="text-gray-400">⭐ {similar.vote_average}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Trailer Modal */}
      {isTrailerPlaying && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setIsTrailerPlaying(false)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-red-400 transition-colors"
            >
              ✕ Close
            </button>
            <div className="bg-black rounded-xl overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center text-xl">
                🎬 Trailer Player (Connect to YouTube API)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
      })
    }
   </div>
  );
}

export default TvDetail;