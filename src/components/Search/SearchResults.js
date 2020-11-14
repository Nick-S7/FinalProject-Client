import React from 'react'

const SearchResults = (props) => {

  console.log(props)
  const options = props.results.map(r => (

    <div className="single-attraction" key={r.id} onClick={() =>{
      props.handleSelectedEvent(r.id)
      props.history.push(`/events/${r.id}`)
  }} >
        <img src={r.images[0].url} alt="img"/>
        <div className="single-attraction-text">
        <h2>{r.name}</h2>  
        <h4>{r.classifications[0].genre.name}</h4>
        </div>
    </div>


  ))

  return <>{options}</>
}

export default SearchResults
