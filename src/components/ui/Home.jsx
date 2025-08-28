import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div>
      <div 
        className="relative h-[100vh] flex flex-col  items-center justify-center bg-cover bg-center "  
        style={{ backgroundImage: "url('https://i.pinimg.com/1200x/49/d6/8f/49d68fc983b66770f629ff9dad146d04.jpg')" }}
      >

        <div className='inset-0 absolute bg-black opacity-40'></div>
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome to MovieApp</h1>
          <p className="text-lg text-gray-300 mb-6">
            Watch the latest movies and TV shows online, anytime, anywhere.
          </p>
         <Link to='/movie'>
          <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
            Watch Now
          </button>
         </Link>
        </div>
         <section className="px-6 py-16">
        <h2 className="text-2xl font-bold text-white mb-6">Popular Movies</h2>
        <div className="grid grid-cols-2 -z-50 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
            <div className="p-3 hover:scale-105">
              <h3 className="text-lg font-semibold text-white ">Movie Title</h3>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg  transition">
            <div className="p-3">
              <h3 className="text-lg font-semibold text-white ">Another Movie</h3>
            </div>
          </div>
        </div>
      </section>
      </div>

     
    </div>
  )
}

export default Home
