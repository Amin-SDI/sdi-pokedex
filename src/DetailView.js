import React, { useReducer, useState, useEffect, } from 'react';

//Imports all the files  in pokemon-sprites in order from 1-151.png
function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  //call "images[`${number}.png`].default" to display images
  const images = importAll(require.context('./pokemon-sprites', false, /\.png$/));


const initialState = { //only ever used once in useReducer
    name: 'Loading...',
    id: 'default',
    types: 'Loading...',
    abilities: 'Loading...',
    environment: 'Loading...'

}
  
function reducer(state, action){
    switch(action.type){
      case 'savePokemonData':
        console.log(action)
        return {...state,
        name: action.data.name,
        id: action.data.id,
        types: action.data.types.map(element=>element.type.name).join('/'),
        abilities: action.data.abilities.map(element=>element.ability.name).join('/'),
        environmentURL: action.data.location_area_encounters,
        environment: ''
    }
      case'savePokemonLocation':
            if(!action.data[0]){
                return {...state,
                environment: 'Unknown'
                }
            }
         return{
             ...state,
             environment: action.data.map(element=>element.location_area.name).join(', '),
         }
      default:
        return state
    }
  }


function DetailView({match}){
    
    const [state, dispatch] = useReducer(reducer, initialState); // state is for reading data, dispatch is for writing data

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${match.params.id}`)
          .then(res => res.json())
          .then(result => {
                dispatch({type:'savePokemonData', data: result})
                return result.location_area_encounters
            })
          .then(location=>{
              fetch(location)
                .then(res => res.json())
                .then(result=>dispatch({type:'savePokemonLocation', data: result}))
        })
      },[])//used second param of [] to load only once

    return (
        <div className="selected-list-view">
            <h3 className='pokemon-name'>name: {state.name}</h3>
            <img src={images[`${state.id}.png`].default}alt={state.name}/>
            <h3 className='pokemon-type'>type: {state.types}</h3>
            <h3 className='pokemon-abilities'>abilities: {state.abilities}</h3>
            <h3 className='pokemon-environment'>environment: {state.environment}</h3>
            <div />
        </div>
      );
}

export default DetailView