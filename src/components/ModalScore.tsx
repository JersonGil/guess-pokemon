import {useContext} from "react";

import {ScoreContext} from "../App";

interface Props {
  setShowModal: (data: boolean) => void;
}

export const ModalScore = ({setShowModal}: Props) => {
  const score = useContext(ScoreContext);

  return (
    <dialog className="nes-dialog" id="score-modal">
      <form method="dialog">
        <p className="title">Puntajes:</p>
        <div className="d-flex gap-3 justify-content-center">
          <p className="nes-text">
            aciertos: <span className="nes-text is-success">{score?.done}</span>
          </p>
          <p className="nes-text">
            fallos: <span className="nes-text is-error">{score?.fails}</span>
          </p>
        </div>
        <menu className="dialog-menu d-flex gap-5 justify-content-center">
          <button className="nes-btn is-primary w-100" onClick={() => setShowModal(false)}>
            Salir
          </button>
        </menu>
      </form>
    </dialog>
  );
};
