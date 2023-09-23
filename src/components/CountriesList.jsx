import React from 'react'
import styles from "./CountryList.module.css"
import Spinner from "./Spinner"
import CityItem from './CityItem'
import CountryItem from './CountryItem'

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  )
}
