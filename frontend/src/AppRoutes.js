import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import FoodPage from './pages/Food/FoodPage'
import Cart from './pages/Cart/Cart'
import LoginPage from './pages/Login/LoginPage'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/search/:searchTerm' element={<Home/>}></Route>
        <Route path='/tag/:tag' element={<Home/>}></Route>
        <Route path='/food/:id' element={<FoodPage/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
    </Routes>
  )
}
