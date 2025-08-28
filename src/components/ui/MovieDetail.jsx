import React, { useEffect, useState } from 'react'

function MovieDetail() {
    const [data ,setdata]= useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US'`,{
              method: "GET",
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGQzMzlhMzM2N2VlZjUyMjcwMjIxYWMyN2VkZjY1MSIsIm5iZiI6MTczNjQzNTkyNy40MDk5OTk4LCJzdWIiOiI2NzdmZThkNzM4ODE3NDM3ZTJiYWYxNjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vonhWcG5Af6bEdhOCEEGuHsQdqBC1iyuyCl6_18bbmY'
              }
            });
            const result = await res.json();
            setdata(result);
            
            
        }
        fetchApi();
    }, [id]);
    
  return (
    <div>

        {
            data.map((item)=>{
                <article className="max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-0">
{/* Poster */}
<div className="relative md:col-span-1 h-72 md:h-auto">
<img
src={item.backdrop_path}
className="w-full h-full object-cover"
/>


{/* rating chip */}
{rating !== null && (
<div className="absolute top-3 left-3 bg-black/75 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
⭐ {item.vote_average}
</div>
)}
</div>


{/* Details */}
<div className="p-6 md:col-span-2 flex flex-col justify-between">
<header>
<h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-1">
{item.original_title}
</h2>


<div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300 mb-4">
<span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">Release: {formatDate(releaseDate)}</span>
<span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">Length: {formatRuntime(runtime)}</span>


{/* genres */}
{genres && genres.length > 0 && (
<div className="flex gap-2">
{genres.slice(0, 4).map((g) => (
<span key={g} className="px-2 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-medium">
{g}
</span>
))}
</div>
)}
</div>
</header>


<section className="text-sm text-slate-700 dark:text-slate-200 mb-6 line-clamp-4">
{overview}
</section>


<footer className="flex items-center justify-between gap-4">
<div className="flex items-center gap-3">
<button
className="px-4 py-2 rounded-2xl bg-rose-600 text-white font-semibold shadow hover:scale-105 transform transition"
aria-label={`Watch trailer for ${title}`}>
▶ Watch Trailer
</button>


<button
className="px-4 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
aria-label={`More details about ${title}`}>
More details
</button>
</div>


<div className="text-xs text-slate-500 dark:text-slate-400">
<div>Data from your movie API • Designed with care</div>
</div>
</footer>
</div>
</article>
            })
        }
      
    </div>
  )
}

export default MovieDetail
