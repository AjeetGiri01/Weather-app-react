import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";


export default function SearchBox({updateInfo}) {
    const [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL = import.meta.env.VITE_WEATHER_API_URL;
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const getWeatherInfo = async (city) => {
        try {
            const response = await fetch(
                `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
            );

            const jsonResponse = await response.json();

            if (!response.ok) {
                throw new Error(jsonResponse.message || "City not found");
            }

            // console.log("Weather Data:", jsonResponse);

            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };

            console.log(result); 
            return result;

        } catch (err) {
            throw err;
            // console.error("Failed to fetch weather:", error);
        }
    };

    const handleChange = (evt) => {
        setCity(evt.target.value);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (!city.trim()) {
            return;
        }

        try {
            setError(false);

            const newInfo = await getWeatherInfo(city.trim());

            updateInfo(newInfo);
            setCity("");
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />

                <br />
                <br />

                <Button variant="contained" type="submit">
                    Search
                </Button>
                {error && <div className='err-div'><Stack sx={{ width: '100%' }} spacing={2} style={{alignItems: 'center'}}><Alert severity="error"  >Can't find info of this place!</Alert></Stack></div>}
            </form>
        </div>
    );
}