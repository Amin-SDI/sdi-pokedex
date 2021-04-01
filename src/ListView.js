const ListView = ({props}) => {
  return (
    <div className="list-view">
      {props.map(pokemon => {return <div key={pokemon.name}><h3>{pokemon.name}</h3></div>})}
    </div>
  );
};
export default ListView