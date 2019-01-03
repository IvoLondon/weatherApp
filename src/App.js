import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import SingleDay from './components/SingleDay/SingleDay'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherLocation : null,
      weekDays : null,
    }
  }

  componentDidMount() {
    axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=London,uk&units=metric&cnt=7&APPID=9c3d96c3b408d9a49408b71e7c131587')
      .then(response => {

        const weatherDays = response.data.list.map(day => {
          return {
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
          weatherLocation : response.data.city.name,
          weekDays : weatherDays,
        })

      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        
         
          {this.state.weatherLocation ? <h3>{this.state.weatherLocation}</h3> : null }
          {this.state.weekDays ?
            <ul>
              {
               this.state.weekDays.map(info => {
                console.log(info);
                  return (
                    <li>
                      <SingleDay weather={info} />
                    </li>
                  )
               })
                  
                
              }
            </ul>
          : null }
         
        
        </header>
      </div>
    );
  }
}

export default App;
