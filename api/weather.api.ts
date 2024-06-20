import axios from "axios";

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

export const getCurrentWeather = async (lat: number, long: number) => {
    const params = new URLSearchParams();
    // lat={lat}&lon={lon}
    // &units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}
    params.set('units', 'metric')
    params.set('appid', process.env.NEXT_PUBLIC_WEATHER_KEY || '')
    params.set('lat', String(lat))
    params.set('lon', String(long))
    let weather = await axios.get(`${BASE_URL}?${params.toString()}`)
    let data = await weather.data
    return weather.data
}


export const getWeatherByNameOrCode = async (nameOrCode: string | number) => {
    const params = new URLSearchParams();
    params.set('units', 'metric')
    params.set('appid', process.env.NEXT_PUBLIC_WEATHER_KEY || '')
    params.set('q', String(nameOrCode))
    let weather = await axios.get(`${BASE_URL}?${params.toString()}`)
    let data = await weather.data
    return weather.data

}