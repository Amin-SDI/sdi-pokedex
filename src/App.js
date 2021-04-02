// import './App.css';
import React, { useReducer, useState, useEffect, } from 'react';
import { render } from '@testing-library/react';
import ListView from './ListView';
import DetailView from './DetailView'
import {BrowserRouter as Router, Link, Route, Switch,} from 'react-router-dom';

//https://pokeapi.co/api/v2/pokedex/1/

const initialState = { //only ever used once in useReducer
  pokedex: [], // this will contain all pokemon by id#

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


  
  
  return (
    <div className="App">
      <div className="pokemon-list">
        <h1 className="title">Pokedex</h1>
        <Router>
          <Switch>
            <Route exact path="/" render={()=> <ListView props={state} />}/>
            <Route path="/pokemon/:id" component={DetailView} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;

//go ahead and try
//kk
//I guess it was working because  <Route path="/bulbasaur" component={DetailView} /> was in there... 
//I was trying to make the routes in ListView
//works now :)