interface PokemonProps {
  pokeName?: string;
  pokeUrl?: string;
  showPokemon: boolean;
}

export const Pokemons = ({pokeName, pokeUrl, showPokemon}: PokemonProps) => {
  return (
    <section className="icon-list">
      {pokeUrl && (
        <img
          alt={pokeName ? pokeName : "pokemon"}
          className={`poke-img ${showPokemon && "show"}`}
          src={pokeUrl.toLowerCase()}
        />
      )}
    </section>
  );
};
