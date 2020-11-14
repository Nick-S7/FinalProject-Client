import React, { Component } from 'react'
import axios from 'axios'

export default class index extends Component {
    state = {
        concerts : [],
    }

    componentDidMount(){
        console.log(this.props)
        axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=CRaZgOHhS0iRjYSFURNt0YrDZs6z0nVR`
        )
        .then(( data ) => {
          this.setState({
            concerts: data.data._embedded.events,
          });
          console.log(this.state.concerts)
        });
    }


    render() {
        const mappedConcerts = this.state.concerts.map(r => (

            <div className="single-category" key={r.id} onClick={() =>{
              this.props.handleSelectedEvent(r.id)
              this.props.history.push(`/events/${r.id}`)
          }} >
                <img src={r.images[0].url} alt="img"/>
                <div className="single-cat-head">
                <h2>{r.name}</h2>  
                <h4>{r.classifications[0].genre.name}</h4>
                </div>
            </div>
        
        
          ))
        return (
            <div className="concerts">
            <div className="concert-page">
                {mappedConcerts}
            </div>
            </div>
        )
    }
}
