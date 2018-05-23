import React, { Component } from 'react';
import Sunset from './sunset'


class Timezone extends Component {

  constructor(props){
    super(props);
    this.state = {
        user_timeZone: null,
        utc_offset: null,
        userlat:null,
        userlong: null,
        tempZip: null,
        hasCurrentzone: false,
        currentHour: null,
        currentMinute:null,
        };

this.getDate = this.getDate.bind(this);
this.zipToZone = this.zipToZone.bind(this);
this.changeTempNumber = this.changeTempNumber.bind(this);
this.handleClick = this.handleClick.bind(this);
this.reset = this.reset.bind(this);
this.resetButtonAppear = this.resetButtonAppear.bind(this);
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
  	currentHour: theDate.getHours(),
  	currentMinute: minutes
  })
}

handleClick(event){
  event.preventDefault();
  console.log("handle Click");
  this.zipToZone();
  this.refs.zip.value="";
}

changeTempNumber(event){
    this.setState({tempZip : event.target.value})
    }

zipToZone(){
  var URL =  'https://www.zipcodeapi.com/rest/js-Hl77BtUvoCMVIgyb7lK0u4cUWnkhEe9lzgsbKmH8Zu4HKDSRYDSsH5mDsHV7V5sv/info.json/'+ this.state.tempZip+'/degrees'
  fetch(URL).then((response) => response.json())
     .then(data => {
        console.log("hello - we have hit the api for zip to convert to timezone");
        console.log(data); 
        this.setState({
        	userlat : data.lat,
        	userlong: data.lng,
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
				<p> You entered {this.state.tempZip} and are currently located in {this.state.user_timeZone} </p>
				 <Sunset utc={this.state.utc_offset} hour= {this.state.currentHour} minute={this.state.currentMinute} lat = {this.state.userlat} long ={this.state.userlong} />
			</div>
			)
	}

}

resetButtonAppear(){
	this.setState({
		hasCurrentzone : false,
		tempZip: null,
	})

}

reset(){
		if(this.state.hasCurrentzone === true){
		return(

			<button className = "resetButton" onClick={this.resetButtonAppear}> Look up another timezone by zip code </button>

			)
	}
	}	

  render() {
    return (
       <div id="overallHeader">
      			<div className ="dateTimeCont">
      				<h2> The Time is <span> {this.state.currentHour} : {this.state.currentMinute} </span> </h2>
         	 </div>
          <div id="userZipForm">
        <form>
        	<label>
         		Please enter your zip code to find your time zone: 
            	<input ref ="zip" type='number' defaultValue = {this.state.tempZip}  onChange = {this.changeTempNumber}/>
            	</label>
            	<input type="submit" value="Submit Zip" onClick = {this.handleClick}/>
        </form>
		</div>

     		{this.updateTimezone()}
     		{this.reset()}
	</div>     		
			)
  }
}

export default Timezone;