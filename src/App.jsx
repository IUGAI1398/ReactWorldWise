import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Product from './Pages/Product'
import Pricing from './Pages/Pricing'
import PageNotFound from './Pages/PageNotFound'
import PageNav from './components/PageNav'
import AppLayout from './Pages/AppLayout'
import Login from './Pages/Login'
import CityList from './components/CityList'
import { useEffect, useState } from 'react'
import CountryList from './components/CountriesList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContext'
import MapSuccess from './Pages/MapSuccess'
export default function App() {


  return (
    <div>
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='app' element={<AppLayout />} >
            <Route index element={<Navigate to="cities" />} />
            <Route path='cities' element={<CityList />} />
            <Route path='countries' element={<CountryList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='product' element={<Product />} />
          <Route path='map' element={<MapSuccess/>} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      </CitiesProvider>
    </div>
  )
}
