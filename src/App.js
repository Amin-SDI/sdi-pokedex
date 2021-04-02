// import './App.css';
import React, { useReducer, useState, useEffect, } from 'react';
import { render } from '@testing-library/react';
import ListView from './ListView';

//https://pokeapi.co/api/v2/pokedex/1/

const initialState = { //only ever used once in useReducer
  pokedex: [] // this will contain all pokemon by id#
}

function reducer(state, action){
  switch(action.type){
    case 'savePokedex':
      return {...state, pokedex: action.pokedex}
    default:
      return state
  }
}

function App() {
  //intent: get list of pokemon 1-151
    //solution: fetch request
    //solution: convert fetch results to readable format
  //intent: store data
    //solution: states

  const [state, dispatch] = useReducer(reducer, initialState); // state is for reading data, dispatch is for writing data
  
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => dispatch({type:'savePokedex', pokedex: data.results}))
  },[])//used second param of [] to load only once

  console.log(state.pokedex)
  
  return (
    <div className="App">
      <div className="pokemon-list">
        <h1>Pokemans</h1>
          < ListView props={state.pokedex} />
      </div>
    </div>
  );
}

export default App;