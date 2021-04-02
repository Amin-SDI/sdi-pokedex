import styles from './ListView.modules.css';
import {BrowserRouter as Router, Link, Route, Switch,} from 'react-router-dom';
import DetailView from './DetailView';

//Imports all the files  in pokemon-sprites in order from 1-151.png
function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}
//call "images[`${number}.png`].default" to display images
const images = importAll(require.context('./pokemon-sprites', false, /\.png$/));


const ListView = ({props}) => {  
  return (
    <div className="list-view">
      {props.pokedex.map((pokemon, index) => {
        return (
      <div key={pokemon.name}>
        <Link to={`/pokemon/${pokemon.name}` }>
          <div className="pokemon">
            <h3 className='pokemon-name'>{pokemon.name}</h3>
            <img src={images[`${index+1}.png`].default}alt={pokemon.name}/>
          </div>
        </Link>
      </div>
        )}
        
      )}
    </div>
  );
};
export default ListView

// className={`pokemon ${selected && "selected"}`}