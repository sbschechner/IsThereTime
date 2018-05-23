import React, { Component } from 'react';


class Sunset extends Component {

  constructor(props){
    super(props);
    this.state = {
        sunsetTime: null,
        hasSunset: false,
        remainingHours: null,
        remainingMinutes: null,
        };

this.getSunset = this.getSunset.bind(this);
this.calculateRemaining = this.calculateRemaining.bind(this);
}

getSunset(){
  var URL =  'https://api.sunrise-sunset.org/json?lat='+ this.props.lat+'&lng='+this.props.long
  fetch(URL).then((response) => response.json())
     .then(data => {
        console.log("hello - we have hit the sunset API ");
        console.log(data); 
        this.setState({
            sunsetTime: data.results.sunset,
            hasSunset : true,
        })  
    }
  )
}

fetchSunset(){
    if(this.state.hasSunset === false){
        this.getSunset();
    }
    else{
        console.log("the sunset time is already updated");
        console.log(this.state);
    }
}

calculateRemaining(){
    var secondsToHours = this.props.utc/3600;
    var sunsetArr = this.state.sunsetTime.split(":");
    var sunSetHour = parseInt(sunsetArr[0],8);
    var sunSetMinute = parseInt(sunsetArr[1],8);
    var sunSetUserTimeHour = sunSetHour + secondsToHours;
    var sunSetUserTimeMinute = sunSetMinute;

console.log(sunSetHour + "hour")
console.log(sunSetMinute + " minute")
console.log(sunSetUserTimeHour + "math hour")

    if (this.state.hasSunset === true) {
        this.setState({
        remainingHours : sunSetUserTimeHour
    }
    
    this.setState({
        hasSunset : false
    })
}



render(){
    return(
        <div>
        <p> we are in the sunset - TO BE REMOVED </p>
            
            {this.fetchSunset()}
            {this.calculateRemaining()}
        <p> sunset: {this.state.sunsetTime} - to be removed </p>
        <p> you have {this.state.remainingHours} hours and {this.state.remainingMinutes} minutes to sunset - get moving! </p>
       
        </div>
        )
}


}
export default Sunset;