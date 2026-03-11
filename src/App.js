import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState("");

  const key = "fe294bed1253726bee131e464889685d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}&lang=ua`;
  const defaultTown = "cherkasy";
  const [classes, setClasses] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${defaultTown}&units=metric&appid=${key}&lang=ua`,
      )
      .then((response) => {
        setData(response.data);
        // console.log(response.data)
        setBackground(response.data)
      });
  }, []);

  function searchWeather(event) {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        setBackground(response.data);
        console.log(response.data);
        console.log(classes);
      });
      setTown("");
    }
  }

  function setBackground(data) {
    console.log(1);
    // console.log(data.weather[0].main)
    let newClass='default'
    switch (data.weather[0].main) {
      case "Clouds":
        newClass="clouds";
        break;
      case "Clear":
        
        newClass="clear"
        break;
      case "Rain":
       newClass="rain"
        break;
      default:
        newClass="default"
    }
    setClasses(newClass+' app')
  }
  return (
    <div className={classes}>
      <div className="input-field">
        <input
          type="text"
          name="town"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          placeholder="Enter the town"
          onKeyDown={searchWeather}
        ></input>
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
        </div>
        <div className="desc">
          {data.weather ? <p>{data.weather[0].description}</p> : null}
        </div>
        {data.name !== undefined && (
          <div className="footer">
            <div className="feels">
              Feels like
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} °C</p>
              ) : null}
            </div>
            <div className="humidity">
              humidity{data.main ? <p> {data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              wind{data.wind ? <p> {data.wind.speed} m/s</p> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
