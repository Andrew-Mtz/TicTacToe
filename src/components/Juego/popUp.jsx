import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import stylesIcons from "./casillas.module.scss";
import styles from "./popUp.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faO } from "@fortawesome/free-solid-svg-icons";
import GameContext from "../../context/GameContext";

function PopUp({ winner, open, resetValues }) {
  const { playerMark, playerTwoMark, cpu } = useContext(GameContext);

  let navigate = useNavigate();
  const [handleChange, setHandleChange] = useState(open);
  const [whoWins, setWhoWins] = useState(winner);

  useEffect(() => {
    setHandleChange(open);
    setWhoWins(winner);
  }, [open, winner]);

  return handleChange ? (
    <div className={styles.Container}>
      <h3 className={styles.Result}>
        {cpu.selected === true
          ? whoWins === playerMark
            ? "PLAYER 1 WON!"
            : whoWins === cpu.mark
            ? "CPU WON!"
            : "TIE"
          : whoWins === playerMark
          ? "PLAYER 1 WON!"
          : whoWins === playerTwoMark
          ? "PLAYER 2 WON!"
          : "TIE"}
      </h3>
      <div className={styles.WinnerContainer}>
        {whoWins === "x" ? (
          <FontAwesomeIcon icon={faXmark} className={stylesIcons.xIcon} />
        ) : whoWins === "o" ? (
          <FontAwesomeIcon icon={faO} className={stylesIcons.oIcon} />
        ) : (
          <>
            <FontAwesomeIcon icon={faXmark} className={stylesIcons.xIcon} />
            <FontAwesomeIcon icon={faO} className={stylesIcons.oIcon} />
          </>
        )}
        <h1
          style={{
            color:
              whoWins === "x"
                ? "#31c4c0"
                : whoWins === "o"
                ? "#f3b036"
                : "#a8bec9",
          }}
        >
          TAKES THE ROUND
        </h1>
      </div>
      <button className={styles.BtnQuit} onClick={() => navigate("/TicTacToe")}>
        QUIT
      </button>
      <button className={styles.BtnNext} onClick={() => resetValues()}>
        NEXT ROUND
      </button>
    </div>
  ) : (
    <></>
  );
}

export default PopUp;
