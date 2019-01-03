import React, { Component } from 'react';
import axios from 'axios';
import classes from './App.css';

import SingleDay from './components/SingleDay/SingleDay';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loader : true,
      volume : 6,
      weatherLocation : null,
      weekDays : null,
    }
  }
  componentDidUpdate() {
   this.getWeatherDataHandler();
  }
  componentDidMount() {
   this.getWeatherDataHandler();
  }

  getWeatherDataHandler = () => {
    axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=London,uk&units=metric&cnt='+ this.state.volume +'&APPID=9c3d96c3b408d9a49408b71e7c131587')
      .then(response => {

        const weatherDays = response.data.list.map(day => {
          return {
            id : day.dt,
            weekday : new Date(day.dt * 1000).toLocaleDateString('en-US',{weekday: 'long'}),
            temp : {
              day : day.temp.day,
              evening : day.temp.eve,
            },
            weather : {
              desc : day.weather[0].description,
              icon : "http://openweathermap.org/img/w/" + day.weather[0].icon + ".png",
            }
          }
        })

        this.setState({
          loader : null,
          weatherLocation : response.data.city.name,
          weekDays : weatherDays,
        })

      })
      .catch(err => {
        console.log(err);
      })
  }

  handleVolume = (val) => {
    console.log(val)
    this.setState({
      volume : val
    })
  } 

  render() {
    return (
      <div className={classes.App}>
        <header className={classes.AppHeader}>
        
         
          {this.state.weatherLocation ? <h3>{this.state.weatherLocation}</h3> : null }
          {this.state.weekDays ?
            <ul className={classes.WeatherList}>
              {
               this.state.weekDays.map(info => {
                  return (
                    <li key={info.id}>
                      <SingleDay weather={info} />
                    </li>
                  )
               })
                  
                
              }
            </ul>
          : null }
          {this.state.loader ? 
            <p>Loading...</p>
            :
            null
          }
        </header>
      </div>
    );
  }
}

export default App;
