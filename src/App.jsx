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

export default function App() {

  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = "http://localhost:9000";

  console.log(cities); useEffect(function () {
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert('Error');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='app' element={<AppLayout />} >
            <Route index element={<Navigate to="cities" />} />
            <Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
            <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading} />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
