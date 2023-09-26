import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {

    const [cities, setCities] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    const BASE_URL = "http://localhost:9000";

    useEffect(function () {
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

    async function getCity(id) {
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            alert('Error');
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();

            setCities((cities) => [...cities, data]);
        } catch {
            alert('Error');
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        try {
            setIsLoading(true);
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE"
            });

            setCities((cities) => cities.filter((city) => city.id != id));
        } catch {
            alert('Error');
        } finally {
            setIsLoading(false);
        }
    }

    return (<CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity,deleteCity}}>
        {children}
    </CitiesContext.Provider>)
}

function useCities() {
    const contexts = useContext(CitiesContext);
    if (contexts === undefined)
        throw new Error('cities was not provided outside the CitiesProvider');
    return contexts
}

export { CitiesProvider, useCities };