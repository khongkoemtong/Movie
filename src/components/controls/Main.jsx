import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from '../ui/Home'
import Movie from '../ui/Movie'
import MovieDetail from '../ui/MovieDetail'
import Tv from '../ui/Tv'
import Trending from '../ui/Trending'

function Main() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/moviedetail/:id' element={<MovieDetail/>} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/tv' element={<Tv/>}/>
          <Route path='/tvdetail/:id' element={<MovieDetail/>}/>
          <Route path='/trending' element ={<Trending/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Main