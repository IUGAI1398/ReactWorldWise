import React from 'react'

import styles from './CityItem.module.css'
import {Link} from 'react-router-dom'
import { useCities } from '../contexts/CitiesContext';

export default function CityItem({city}) {
  const {currentCity} = useCities();
  const {cityName, emoji, date,id,position}  = city;

  const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  return (
    <Link className={ `${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}  to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
    <li >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.cityName}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
    </li>
    </Link>
  )
}
