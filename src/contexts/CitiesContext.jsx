import { useContext, useReducer } from "react";
import { createContext, useState, useEffect } from "react";

const CitiesContext = createContext();

const initalState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ''
}

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true }
        case 'cities/loaded':
            return {
                ...state, isLoading: false, cities: action.payload
            }
        case 'city/loaded':
            return {
                ...state, isLoading: false, currentCity: action.payload
            }

        case 'cities/created':
            return {
                ...state, isLoading: false, cities: [...state.cities, action.payload],
                currentCity: action.payload,
            }
        case 'cities/deleted':
             return {
                ...state, 
                isLoading: false,
                cities: state.cities.filter((city) => city.id != action.payload),
                currentCity: action.payload,
             }
        case 'rejected':
            return {
                ...state, isLoading: false, error: action.payload
            }

        default: throw new Error('Unknow action type');

    }
}

function CitiesProvider({ children }) {

    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initalState)

    // const [cities, setCities] = useState({});
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});

    const BASE_URL = "http://localhost:9000";

    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: "loading" });
            try {

                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: 'cities/loaded', payload: data })
            } catch {
                dispatch({ type: 'rejected', payload: "There was an error loading data..." })
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {

        if (Number(id) === currentCity.id) return ;
        dispatch({ type: "loading" });
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: 'city/loaded', payload: data })
        } catch {
            dispatch({ type: 'rejected', payload: "There was an error loading data..." })
        }
    }

    async function createCity(newCity) {
        dispatch({ type: "loading" });
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();

            dispatch({ type: 'cities/created' ,payload:  data })
        } catch {
            dispatch({ type: 'rejected', payload: "There was an error loading data..." })
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE"
            });

        dispatch({type: 'cities/deleted' , payload: id})
        } catch {
            dispatch({ type: 'rejected', payload: "There was an error loading data..." })
        }
    }

    return (<CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
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