import { useEffect, useState } from "react";
import axios from 'axios'
function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState("cherkasy");

  const key = "fe294bed1253726bee131e464889685d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}&lang=ua`;

  // const [kiev,setKiev]=useState()
  useEffect(()=>{
    axios.get(url).then(response=>{
      setData(response.data);
      console.log(response.data)
  })
  },[])
  function searchWeather(event) {
    if (event.key === "Enter") {
      axios.get(url).then(response=>setData(response.data ))
      // fetch(url)
      //   .then((response) => response.json())
      //   .then((response) => {
      //     setData(response);
      //     console.log(response);
      //   });
      setTown("");
    }
  }
  return (
    <div className="app">
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
