import React from 'react'

const SearchResults = (props) => {

  console.log(props)
  const options = props.results.map(r => (

    <div className="single-nav-result" key={r.idMeal} onClick={() =>{
      props.handleSelectedEvent(r.id)
      props.history.push(`/events/${r.id}`)
  }} >
        <img src={r.images[0].url} alt="img"/>
        <h2>{r.name}</h2>  

    </div>


  ))

  return <div className="nav-search-results">{options}</div>
}

export default SearchResults

