import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Home from '../ui/Home'
import Movie from '../ui/Movie'
import MovieDetail from '../ui/MovieDetail'
import Tv from '../ui/Tv'
import Trending from '../ui/Trending'
import TvDetail from '../ui/TvDetail'
import Testing from '../ui/Testing'
import Login from '../ui/Login'

function Main() {
  return (
    <div>
      <BrowserRouter>
     <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/moviedetail/:id' element={<MovieDetail/>} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/tv' element={<Tv/>}/>
          <Route path='/tvdetail/:id' element={<TvDetail/>}/>
          <Route path='/trending' element ={<Trending/>}/>
          <Route path='/trending/:id' element={<Testing/>}/>
          <Route path='/tvdetail/more/:id' element={<Testing/>}/>
          <Route path='/Login' element={<Login/>}/>

          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Main