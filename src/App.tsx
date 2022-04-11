import {useEffect, useState} from "react";

import api from "./apis/api";
import {Pokemons} from "./components";
import {Pokemon} from "./types";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon>();

  useEffect(() => {
    api.random().then((data) => setPokemons(data));
  }, []);

  return (
    <main>
      Let&apos;s get this party started
      <Pokemons pokeName={pokemons?.name} />
    </main>
  );
}

export default App;
