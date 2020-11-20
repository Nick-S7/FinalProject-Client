import React, { Component } from 'react'
import axios from 'axios'
import AUTH_SERVICE from '../../services/AuthService'

export default class index extends Component {
    state = {
        sports : [],
    }

    componentDidMount(){
        console.log(this.props)
        AUTH_SERVICE.getAuthenticatedUser().then((res)=> console.log(res)).catch((err) => console.log(err));

        axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=sports&apikey=CRaZgOHhS0iRjYSFURNt0YrDZs6z0nVR`
        )
        .then(( data ) => {
          this.setState({
            sports: data.data._embedded.events,
          });
          console.log(this.state.sports)
        });
    }


    render() {
        const mappedSports = this.state.sports.map(r => (
          

            <div className="single-category" key={r.id} onClick={() =>{
              this.props.handleSelectedEvent(r.id)
              this.props.history.push(`/api/events/${r.id}`)
          }} >
                <img src={r.images[0].url} alt="img"/>
                <div className="single-cat-head">
                <h2>{r.name}</h2>  
                <p>@ {r._embedded.venues[0].name} - {r._embedded.venues[0].city.name}</p>
                <h4>{r.classifications[0].genre.name}</h4>
                </div>
                <div className="cat-dates">
                <p>Dates: {new Date(r.dates.start.localDate).toLocaleDateString()} to {new Date(r.dates.start.dateTime).toLocaleDateString()}</p>
                </div>
                <h3>Click For Details</h3>
            </div>
        
        
          ))
        return (
            <div className="sports">
            <div className="sports-page">
            <div className="sports-head">
                <h2>Popular Teams & Upcoming Sports Events</h2>
            </div>
            <div className="sports-list">
                {mappedSports}
                </div>
            </div>
            </div>
        )
    }
}
