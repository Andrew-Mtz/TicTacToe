import React, { useContext } from "react";
import styles from "./markPiker.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faO } from "@fortawesome/free-solid-svg-icons";
import GameContext from "../../context/GameContext";

function MarkPiker() {
  const { playerMark, setPlayerMark } = useContext(GameContext);

  return (
    <>
      <button
        className={
          playerMark === "x" ? styles.BtnPickerSelected : styles.BtnPicker
        }
        onClick={() => setPlayerMark("x")}
      >
        <FontAwesomeIcon icon={faXmark} className={styles.Icon} />
      </button>
      <button
        className={
          playerMark === "o" ? styles.BtnPickerSelected : styles.BtnPicker
        }
        onClick={() => setPlayerMark("o")}
      >
        <FontAwesomeIcon icon={faO} className={styles.Icon} />
      </button>
    </>
  );
}

export default MarkPiker;
