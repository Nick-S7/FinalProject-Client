import React from 'react'
import history from '../history'

const SearchResults = (props) => {

  console.log(props)
  const options = props.results.map(r => (

    <div className="single-nav-result" key={r.idMeal} onClick={() =>{
      console.log(props)
      props.handleSelectedEvent(r.id)
      props.clearSearch()
      history.push(`/api/events/${r.id}`)
      window.location.reload()
  }} >
        <img src={r.images[0].url} alt="img"/>
        <h2>{r.name}</h2>  

    </div>


  ))

  return <div className="nav-search-results">{options}</div>
}

export default SearchResults

