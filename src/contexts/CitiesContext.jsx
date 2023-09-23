import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

const CitiesContext = createContext();

function CitiesProvider({children}) {

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
    return (<CitiesContext.Provider value={{cities, isLoading}}>
        {children}
    </CitiesContext.Provider>)
}

function useCities() {
    const contexts = useContext(CitiesContext);
    if (contexts === undefined)
    throw new Error('cities was not provided outside the CitiesProvider');
    return contexts
}

export {CitiesProvider, useCities};