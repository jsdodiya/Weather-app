import axios from "axios";
import { useContext, createContext, useEffect, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Indore");
  const [thisLocation, setLocation] = useState("");

  // Fetch weather data from the API
  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: place,
        contentType: "json",
        unitGroup: "metric",
        shortColumnNames: 0,
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);

      // Debugging: Log the full response to understand its structure
      console.log("API Response:", response.data);

      // Extract the first location object
      const thisData = Object.values(response.data.locations)[0];

      // Check if values exist in the response
      if (thisData.values && thisData.values.length > 0) {
        setLocation(thisData.address); // Location name
        setValues(thisData.values); // Array of forecast values
        setWeather(thisData.values[0]); // Set weather using the first forecast value
      } else {
        console.warn("No weather values available in the API response");
        setValues([]);
        setWeather({});
      }
    } catch (e) {
      console.error("Error fetching weather data:", e);
      alert("This Place Does Not Exist");
    }
  };

  // Fetch weather data whenever the `place` changes
  useEffect(() => {
    fetchWeather();
  }, [place]);

  // Debugging: Log values when they change
  useEffect(() => {
    console.log("Updated values:", values);
  }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to access the context
export const useStateContext = () => useContext(StateContext);
