
import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from '../hooks/useUrlPosition';
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [emoji, setemoji] = useState();
  const [mapLat, mapLng] = useUrlPosition();
  const [geocodingerror, setgeocodingerror] = useState();



  useEffect(function () {
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)
        setgeocodingerror("");
        const res = await fetch(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`);
        const data = await res.json();
        console.log(data);

        if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else")
        setCityName(data.city || data.locality || "")
        setCountry(data.countryName);
        setemoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setgeocodingerror(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [mapLat, mapLng])

if (isLoadingGeocoding) return <Spinner/>
 
if (geocodingerror) return <Message message={geocodingerror}/>

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
