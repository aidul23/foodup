import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import FoodPage from './pages/Food/FoodPage'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/search/:searchTerm' element={<Home/>}></Route>
        <Route path='/tag/:tag' element={<Home/>}></Route>
        <Route path='/food/:id' element={<FoodPage/>}></Route>
    </Routes>
  )
}
