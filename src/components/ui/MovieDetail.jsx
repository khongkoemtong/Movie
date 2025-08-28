import React, { useEffect, useState } from 'react'

function MovieDetail({ id }) { // Added id as prop
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return; // Don't fetch if no id provided

        const fetchApi = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, { // Fixed URL syntax
                    method: "GET",
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGQzMzlhMzM2N2VlZjUyMjcwMjIxYWMyN2VkZjY1MSIsIm5iZiI6MTczNjQzNTkyNy40MDk5OTk4LCJzdWIiOiI2NzdmZThkNzM4ODE3NDM3ZTJiYWYxNjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vonhWcG5Af6bEdhOCEEGuHsQdqBC1iyuyCl6_18bbmY'
                    }
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const result = await res.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchApi();
    }, [id]);

    // Helper functions
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatRuntime = (minutes) => {
        if (!minutes) return 'Unknown';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="text-lg">Loading movie details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="text-red-600">Error: {error}</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center min-h-96">
                <div className="text-gray-600">No movie data available</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <article className="max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-0">
                {/* Poster */}
                <div className="relative md:col-span-1 h-72 md:h-auto">
                    <img
                        src={data.backdrop_path ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}` : '/placeholder-movie.jpg'}
                        alt={data.original_title}
                        className="w-full h-full object-cover"
                    />

                    {/* Rating chip */}
                    {data.vote_average && (
                        <div className="absolute top-3 left-3 bg-black/75 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                            ⭐ {data.vote_average.toFixed(1)}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="p-6 md:col-span-2 flex flex-col justify-between">
                    <header>
                        <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-1">
                            {data.original_title || data.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300 mb-4">
                            <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                                Release: {formatDate(data.release_date)}
                            </span>
                            <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                                Length: {formatRuntime(data.runtime)}
                            </span>

                            {/* Genres */}
                            {data.genres && data.genres.length > 0 && (
                                <div className="flex gap-2">
                                    {data.genres.slice(0, 4).map((genre) => (
                                        <span 
                                            key={genre.id} 
                                            className="px-2 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-medium"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </header>

                    <section className="text-sm text-slate-700 dark:text-slate-200 mb-6 line-clamp-4">
                        {data.overview || 'No overview available.'}
                    </section>

                    <footer className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <button
                                className="px-4 py-2 rounded-2xl bg-rose-600 text-white font-semibold shadow hover:scale-105 transform transition"
                                aria-label={`Watch trailer for ${data.title || data.original_title}`}
                                onClick={() => {
                                    // Add trailer functionality here
                                    console.log('Watch trailer clicked');
                                }}
                            >
                                ▶ Watch Trailer
                            </button>

                            <button
                                className="px-4 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                                aria-label={`More details about ${data.title || data.original_title}`}
                                onClick={() => {
                                    // Add more details functionality here
                                    console.log('More details clicked');
                                }}
                            >
                                More details
                            </button>
                        </div>

                        <div className="text-xs text-slate-500 dark:text-slate-400">
                            <div>Data from TMDB • Designed with care</div>
                        </div>
                    </footer>
                </div>
            </article>
        </div>
    )
}

export default MovieDetail