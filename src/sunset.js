import React, { Component } from 'react';


class Sunset extends Component {

  constructor(props){
    super(props);
    this.state = {
        user_timeZone: null,
        utc_offset: null,
        tempZip: null,
        hasCurrentzone: false,
        currentHour: null,
        currentMinute:null,
        };

this.getDate = this.getDate.bind(this);
this.zipToZone = this.zipToZone.bind(this);
}

WRITE METHODS

}
export default Sunset;