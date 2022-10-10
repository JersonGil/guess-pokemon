import React from "react";

interface Props {
  pokeName: string;
  getPokemon: () => void;
}

export const PokemonShowMessage = ({pokeName, getPokemon}: Props) => {
  return (
    <>
      <h2>Perfecto, el pokemon es {pokeName}</h2>
      <button className="nes-btn is-primary mt-4 w-50" type="button" onClick={getPokemon}>
        Volver a Jugar
      </button>
    </>
  );
};
