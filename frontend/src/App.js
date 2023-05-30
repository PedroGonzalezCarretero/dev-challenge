import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL_WEATHER;

  async function fetchData() {
    try {
      const url = new URL(apiUrl);
      url.searchParams.append("latitude", latitude);
      url.searchParams.append("longitude", longitude);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        setData(responseData);
        console.log(weatherHistory);
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      throw error;
    }
  }

  const [weatherHistory, setWeatherHistory] = useState([]);

  useEffect(() => {
    fetchWeatherHistory();
  }, [data]);

  function handleHistoryClick(weather) {
    setData(weather);
  }

  async function fetchWeatherHistory() {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL_HISTORY, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const historyData = await response.json();
        setWeatherHistory(historyData);
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error fetching weather history:", error.message);
      throw error;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="latitude">Latitude:</label>
            <input
              id="latitude"
              type="text"
              value={latitude}
              onChange={(event) => setLatitude(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="longitude">Longitude:</label>
            <input
              id="longitude"
              type="text"
              value={longitude}
              onChange={(event) => setLongitude(event.target.value)}
            />
          </div>
          <button type="submit">Fetch Weather</button>
        </form>

        {data ? (
          <div>
            <div>
              <p>{data.city}</p>
              <p>{data.celsiusTemperature} °C</p>
              <img src={data.conditionIcon} alt={"conditionIcon"} />
            </div>

            <div>
              <p>{data.readingTimeAndDate}</p>
            </div>
          </div>
        ) : (
          <p>Input latitude and longitude to get weather info</p>
        )}

        {weatherHistory && (
          <div>
            <h2>Weather History</h2>
            <table>
              <thead>
                <tr>
                  <th>City</th>
                  <th>Temperature (°C)</th>
                  <th>Condition</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {weatherHistory.map((weather) => (
                  <tr
                    key={weather.id}
                    onClick={() => handleHistoryClick(weather)}
                  >
                    {" "}
                    <td>{weather.city}</td>
                    <td>{weather.celsiustemperature}</td>
                    <td>
                      <img
                        src={weather.conditionicon}
                        alt={weather.condition}
                      />
                    </td>
                    <td>{weather.dateandtime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
