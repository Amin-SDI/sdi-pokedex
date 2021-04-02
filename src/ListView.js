
//Imports all the files  in pokemon-sprites in order from 1-151.png
function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('./pokemon-sprites', false, /\.png$/));
console.log(images)

const ListView = ({props}) => {  
  return (
    <div className="list-view">
      {props.map((pokemon, index) => {
        return (
      <div key={pokemon.name}>
          <h3>{pokemon.name}</h3>
        <img src={images[`${index+1}.png`].default}alt={pokemon.name}/>
      </div>
      )})}
    </div>
  );
};
export default ListView
