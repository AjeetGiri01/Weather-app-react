import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox() {
    const [city, setCity] = useState("");

    const API_URL = import.meta.env.VITE_WEATHER_API_URL;
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const getWeatherInfo = async (city) => {
        try {
            const response = await fetch(
                `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
            );

            const jsonResponse = await response.json();

            if (!response.ok) {
                console.error("Weather API Error:", jsonResponse.message);
                return;
            }

            // console.log("Weather Data:", jsonResponse);

            let result = {
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };

            console.log(result); 

        } catch (error) {
            console.error("Failed to fetch weather:", error);
        }
    };

    const handleChange = (evt) => {
        setCity(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!city.trim()) {
            return;
        }

        getWeatherInfo(city.trim());
        setCity("");
    };

    return (
        <div className="SearchBox">
            <h3>Search for the weather</h3>

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
            </form>
        </div>
    );
}