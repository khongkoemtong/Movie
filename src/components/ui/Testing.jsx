import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Testing() {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // store clicked video

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d8d339a3367eef52270221ac27edf651`
        );
        const data = await response.json();
        setVideos(data.results || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [id]);

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🎬 Movie Videos</h2>

      {videos.length === 0 ? (
        <p className="text-center text-gray-400">No videos found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)} // when clicked
              className="cursor-pointer bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="aspect-video">
                {video.site === "YouTube" && (
                  <iframe
                    className="w-full h-full pointer-events-none" // prevent play in card
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-lg font-semibold truncate">
                  {video.name}
                </h3>
                <p className="text-sm text-gray-400">Source: {video.site}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for selected video */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-4 max-w-4xl w-full relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setSelectedVideo(null)}
            >
              ✖
            </button>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
                title={selectedVideo.name}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="mt-3 text-lg font-semibold">
              {selectedVideo.name}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Testing;
