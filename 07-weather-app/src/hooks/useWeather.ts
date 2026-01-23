import axios from 'axios';
import { z } from 'zod';
import type { Search } from '../types';
import { useMemo, useState } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather)
//     && typeof weather === 'object'
//     && typeof (weather as Weather).name === 'string'
//     && typeof (weather as Weather).main.temp === 'number'
//     && typeof (weather as Weather).main.temp_max === 'number'
//     && typeof (weather as Weather).main.temp_min === 'number'
//   )
// }

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number()
  })
})

export type Weather = z.infer<typeof Weather>;

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0
  }
}

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>(initialState)

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchGeo = async (search: Search) => {
    setNotFound(false);
    setLoading(true);
    setWeather(initialState);

    try {
      // Fetch Geolocation
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${API_KEY}`;

      const { data } = await axios(geoUrl);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const fetchWeather = async (search: Search) => {
    try {
      const [geo] = await fetchGeo(search);

      if (!geo) {
        setNotFound(true);
        return
      }

      // Fetch weather
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lon}&appid=${API_KEY}`;

      const { data } = await axios(weatherUrl)
      const result = Weather.safeParse(data);

      if (result.success) {
        setWeather(data)
      }

      return data;
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData
  }
}