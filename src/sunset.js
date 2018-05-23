import React, { Component } from 'react';


class Sunset extends Component {

  constructor(props){
    super(props);
    this.state = {
        sunsetTime: "12:15:26 AM", //THIS SHOULD BE NULL WHEN BACK.
        hasSunset: true, //this should be false when back
        sunSetHour: null,
        sunSetMinute : null,
        currentHourTime: null,
        currentMinuteTime: null,
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

updateRemaining(hoursLeft, minutesleft, hours, minutes, currentHour, currentMinute){

    if (this.state.count === 1 && this.state.hasSunset === true){
        this.setState({
            remainingHours : hoursLeft,
            remainingMinutes : minutesleft,
            sunSetHour : hours,
            sunSetMinute : minutes,
            currentHourTime: currentHour,
            currentMinuteTime: currentMinute,
            count: 2,
            })

    }
}

calculateRemaining(){
    if (this.state.hasSunset === true) {
    var secondsToHours = this.props.utc/3600; // if 18000, this is is -5.
    var sunsetArr = this.state.sunsetTime.split(":"); // starts converting string to int
    var sunSetHour = parseInt(sunsetArr[0]); //12
    var sunSetMinute = parseInt(sunsetArr[1]);
    var sunSetUserTimeHour = Math.abs(sunSetHour + secondsToHours); //creates sunset in user timezone // 7
    var sunSetUserTimeMinute = sunSetMinute; // creates sunset in user timezone   

    var armyTimeHour = 24 - (12 - sunSetUserTimeHour); // converts hours to army time // this should be 19
 

    var realHoursLeft = armyTimeHour - this.props.hour // with chicago, it should be 18000 utc //19 - 10 or 9
    var currentHour = this.props.hour

    if (this.props.utc != -14400) { //-14400 is EST
        var timeDifference = Math.abs((this.props.utc - -14400) / 3600) // should be 1
        realHoursLeft = realHoursLeft + timeDifference + 1 //9 - 1 or 8
        console.log("creating a timeDifference")
        currentHour = currentHour - timeDifference;
        sunSetUserTimeHour = sunSetUserTimeHour + timeDifference;
    }

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
    console.log(sunSetUserTimeHour + "sunset in user time");
    console.log(armyTimeHour + "sunset in army time in user time");
    console.log(timeDifference + " time difference")
    console.log(realHoursLeft + "hours left should be");

   
   this.updateRemaining(realHoursLeft, minutesleft, sunSetUserTimeHour, sunSetUserTimeMinute, currentHour, this.props.minute)

    }

}

//{this.fetchSunset()} TO NOT OVERUSE MY API CALLS

render(){
    return(
        <div>
        <p> we are in the sunset - TO BE REMOVED </p>
            
            
            {this.calculateRemaining()}
        <p> current time in the location is {this.state.currentHourTime} : {this.state.currentMinuteTime} </p>
        <p> sunset: {this.state.sunSetHour} : {this.state.sunSetMinute} pm </p> 
        <p> sunset: {this.state.sunsetTime} - to be removed </p>
        <p> you have {this.state.remainingHours} hours and {this.state.remainingMinutes} minutes to sunset - get moving! </p>
       
        </div>
        )
}


}
export default Sunset;