
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
         
      </div>

     
    </div>
  )
}

export default Home
