import React from 'react';
import classes from './SingleDay.css'


const SingleDay = (props) => {
	return (
		<div className={classes.SingleDay}>
		<h3>{props.weather.weekday}</h3>
		<img src={props.weather.weather.icon} />
		<h4>
			{props.weather.weather.desc}
		</h4>
		<p>Day : {Math.floor(props.weather.temp.day)}</p> 
		<p>Night : {Math.floor(props.weather.temp.evening)}</p> 

		</div>
	)
}

export default SingleDay