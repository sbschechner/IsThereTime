import React, { Component } from 'react';
import './timezone.css';


class Timezone extends Component {

  constructor(props){
    super(props);
    this.state = {
        user_timeZone: null,
        utc_offset: null,
        hasCurrentzone: false,
        currentHour: null,
        currentDay: null,
        currentMinute:null,
        };

this.getDate = this.getDate.bind(this);
this.zipToZone = this.zipToZone.bind(this);
}

getDate(){
var dateTime = new Date();
return dateTime
}

componentDidMount(){ 
  var theDate = this.getDate();
  var minutes = theDate.getMinutes()
  if(minutes<10){
    minutes = "0"+ minutes
  }

  this.setState({
  	currentDay : days[theDate.getDay()],
  	currentHour: theDate.getHours(),
  	currentMinute: minutes
  })
}

handleClick(event){
  event.preventDefault();
  console.log("handle Click");
  this.zipToZone()
}

zipToZone(){
  var URL =  'https://www.zipcodeapi.com/rest/js-Hl77BtUvoCMVIgyb7lK0u4cUWnkhEe9lzgsbKmH8Zu4HKDSRYDSsH5mDsHV7V5sv/info.json/'+ this.state.tempZip+'/degrees'
  fetch(URL).then((response) => response.json())
     
     .then(data => {
        console.log("hello - we have hit the api for zip to convert to timezone");
        console.log(data); 
        this.setState({
            user_timeZone : data.timezone.timezone_identifier,
            utc_offset: data.timezone.utc_offset_sec,
            hasCurrentzone : true,
        })  
    }
  )
}


updateTimezone(){
	if (this.state.hasCurrentzone === true){
		return(
			<div>
				<Sunset timezone={this.state.user_timeZone}/>
			</div>
			)
	}

}

  render() {
    return (
       <div id="time">
            <h2 id="header"> The Time </h2>
      			<div className ="dateTimeCont">
      				<h2> The Time is <span> {this.state.currentHour} : {this.state.currentMinute} </span> </h2>
          </div>
          <userInput />
     		{this.updateTimezone()}
     		</div>
			)
  }
}

export default Timezone;