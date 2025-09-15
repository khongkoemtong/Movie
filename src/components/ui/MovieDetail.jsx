import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function MovieDetail() {
    const { id } = useParams(); // Extract id from URL parameters
    const [data, setData] = useState(null);
    
    
    useEffect(() => {
        const takeapi = async () => {
            try {
                // Fixed template literal syntax and endpoint
                const take = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=aacdbe83dedab8fc913bd72adf3fdbad`)
                const result = await take.json(); // Added await
                setData(result); // Single movie object, not an array
            }
            catch(e) {
                console.log(e)
            }
        }
        
        if (id) { // Only fetch if id exists
            takeapi();
        }
    }, [id])

    // Loading state
    if (!data) {
        return <div className="text-white p-8">Loading...</div>
    }

    return (
        <div className="p-[10px] pb-[200px] flex lg:m-[20px] lg:h-[100vh]    lg:flex justify-center items-center">
            {/* Removed map() since data is a single object, not an array */}
            <div className="w-[100%] h-[100%]   bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg hover:scale-[102%] transform transition duration-300 cursor-pointer lg:flex ">
                <img
                    className=" h-[50%] w-[100%] lg:h-[100%] lg:w-[100%] object-cover"
                    src={
                        data.backdrop_path
                            ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                            : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={data.title}
                />

                <div className="ps-[50px] pt-[50px] flex pb-[100px] justify-center  flex-col   w-[100%] lg:w-[50%] lg:-mt-[100px]   ">
                    <h2 className="text-xl font-bold mb-2">{data.title}</h2>
                    <p className="text-sm text-gray-300 mb-2">
                        Release Date: {data.release_date || "Unknown"}
                    </p>
                    <p className="text-sm text-yellow-400 mb-2">
                        Rating:  {data.vote_average || "N/A"}
                        ⭐
                    </p>
                    <p className="text-gray-400 text-sm line-clamp-4">
                        {data.overview || "No description available."}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail