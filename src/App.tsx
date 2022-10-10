import {ChangeEvent, useEffect, useState, useCallback, createContext} from "react";

import api from "./apis/api";
import {Pokemons, PokemonShowMessage, ModalScore} from "./components";
import {Pokemon} from "./types";

interface Score {
  fails: number;
  done: number;
}

const initialValue: Score = {
  fails: 0,
  done: 0,
};

const scoreLocal = localStorage.getItem("score");
let score: Score = initialValue;

if (scoreLocal !== null) score = JSON.parse(scoreLocal);

export const ScoreContext = createContext<Score>(score);

function App() {
  const [pokemons, setPokemons] = useState<Pokemon>();
  const [pokemon, setPokemon] = useState("");
  const [showPokemon, setShowPokemon] = useState(false);
  const [scoreData, setScoreData] = useState(initialValue);

  const getPokemon = useCallback(() => {
    api.random().then((data) => setPokemons(data));
    setPokemon("");
    setShowPokemon(false);
  }, []);

  useEffect(() => {
    getPokemon();
  }, []);

  const onShowPokemon = (e: ChangeEvent<HTMLInputElement>) => {
    const pokemon = e.target.value;

    if (pokemon !== "") {
      setPokemon(pokemon.trim().toLowerCase());
    }
  };

  const onCheckPokemon = () => {
    if (pokemon !== "" && pokemon === pokemons?.name) {
      scoreData.done = 1 + scoreData.done;
      localStorage.setItem("score", JSON.stringify(scoreData));
      setShowPokemon(true);
      setScoreData(scoreData);
    } else {
      scoreData.fails = 1 + scoreData.fails;
      localStorage.setItem("score", JSON.stringify(scoreData));
      getPokemon();
      setPokemon("");
      setScoreData(scoreData);
    }
  };

  return (
    <ScoreContext.Provider value={score}>
      <main className="row-container">
        <div className="container-pokemon">
          <div className="container-img">
            <Pokemons
              pokeName={pokemons?.name}
              pokeUrl={pokemons?.image}
              showPokemon={showPokemon}
            />
          </div>
          <div className="nes-field d-flex flex-column align-items-center w-75">
            {showPokemon ? (
              <PokemonShowMessage getPokemon={getPokemon} pokeName={pokemon} />
            ) : (
              <>
                <h5 className="nes-text">Adivina el pokemon</h5>
                <input
                  className="nes-input"
                  id="name_field"
                  type="text"
                  value={pokemon}
                  onChange={onShowPokemon}
                />
                <div className="d-flex gap-5">
                  <button
                    className="nes-btn is-success mt-4 w-50"
                    type="button"
                    onClick={() => {
                      (document?.getElementById("score-modal") as HTMLDialogElement).showModal();
                    }}
                  >
                    Puntajes
                  </button>
                  <button
                    className="nes-btn is-primary mt-4 w-50"
                    type="button"
                    onClick={onCheckPokemon}
                  >
                    Adivinar
                  </button>
                </div>
              </>
            )}
          </div>
          <ModalScore />
        </div>
      </main>
    </ScoreContext.Provider>
  );
}

export default App;
