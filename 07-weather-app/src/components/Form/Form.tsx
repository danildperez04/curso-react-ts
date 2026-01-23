import { useState } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css';
import type { Search } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (search: Search) => Promise<void>;
}

export default function Form({ fetchWeather }: FormProps) {
  const [search, setSearch] = useState<Search>({
    city: '',
    country: ''
  });

  const [alert, setAlert] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setSearch({
      ...search,
      [name]: value
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(search).includes('')) {
      setAlert('Todos los campos son obligatorios');
      return;
    }

    fetchWeather(search)
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="country">País:</label>
        <select
          id="country"
          name="country"
          value={search.country}
          onChange={handleChange}>
          <option value='' disabled>--Seleccione un país--</option>
          {
            countries.map(
              (country) => (
                <option
                  key={country.code}
                  value={country.code}
                >{country.name}</option>
              )
            )
          }
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Ingrese la ciudad"
          value={search.city}
          onChange={handleChange} />
      </div>
      <button className={styles.submit}>Consultar clima</button>
      {alert && <Alert>{alert}</Alert>}
    </form>
  )
}
