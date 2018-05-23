import React, { Component } from 'react';


class Sunset extends Component {

  constructor(props){
    super(props);
    this.state = {
        sunsetTime: null,
        hasSunset: false,
        sunSetHour: null,
        sunSetMinute : null,
        remainingHours: null,
        remainingMinutes: null,
        count : 1,
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

updateRemaining(hoursLeft, minutesleft, hours, minutes){

    if (this.state.count === 1 && this.state.hasSunset === true){
        this.setState({
            remainingHours : hoursLeft,
            remainingMinutes : minutesleft,
            sunSetHour : hours,
            sunSetMinute : minutes,
            count: 2,
            })

    }
}

calculateRemaining(){
    if (this.state.hasSunset === true) {
    var secondsToHours = this.props.utc/3600;
    var sunsetArr = this.state.sunsetTime.split(":"); // starts converting string to int
    var sunSetHour = parseInt(sunsetArr[0]);
    var sunSetMinute = parseInt(sunsetArr[1]);
    var sunSetUserTimeHour = Math.abs(sunSetHour + secondsToHours); //creates sunset in user timezone
    var sunSetUserTimeMinute = sunSetMinute; // creates sunset in user timezone   

    var armyTimeHour = 24 - (12 - sunSetUserTimeHour); // converts hours to army time
 
    var realHoursLeft = armyTimeHour - (sunSetUserTimeHour)

    var minutesleft = sunSetUserTimeMinute - this.props.minute
    if (minutesleft<0){  //prevents negative numbers 
       realHoursLeft = realHoursLeft - 1
        
        if (realHoursLeft < 0){ // prevents negative numbers
            realHoursLeft = 0
        }

        minutesleft = 60 + minutesleft
    } 

    // adjust for daylight saving time
    console.log("the sunset occurs at"+ (sunSetUserTimeHour)+ "and" + sunSetUserTimeMinute)
  //  console.log(timeDifference +" this is the time difference");
    console.log(sunSetUserTimeHour + "sunset in user time");
    console.log(armyTimeHour + "sunset in army time in user time");
    console.log(realHoursLeft + "hours left should be subtracted from army time +1 for savings");
   
   this.updateRemaining(realHoursLeft, minutesleft, sunSetUserTimeHour, sunSetUserTimeMinute)

    }

}



render(){
    return(
        <div>
        <p> we are in the sunset - TO BE REMOVED </p>
            
            {this.fetchSunset()}
            {this.calculateRemaining()}
        <p> sunset: {this.state.sunSetHour} : {this.state.sunSetMinute} </p> 
        <p> sunset: {this.state.sunsetTime} - to be removed </p>
        <p> you have {this.state.remainingHours} hours and {this.state.remainingMinutes} minutes to sunset - get moving! </p>
       
        </div>
        )
}


}
export default Sunset;