interface PokemonProps {
  pokeName?: string;
}

export const Pokemons = ({pokeName}: PokemonProps) => {
  return (
    <section className="icon-list">
      {pokeName && <i className={`nes-${pokeName.toLowerCase()}`} />}
    </section>
  );
};
