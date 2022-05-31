import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import stylesIcons from './casillas.module.scss'
import styles from './popUp.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faO } from '@fortawesome/free-solid-svg-icons'

function PopUp({ Winner, Open, resetValues }) {

  let navigate = useNavigate();
  const [open, setOpen] = useState(Open)
  const [winner, setWinner] = useState(Winner)

  const player1 = window.sessionStorage.getItem("player1");
  const player2 = JSON.parse(window.sessionStorage.getItem("player2"));
  const cpu = JSON.parse(window.sessionStorage.getItem("cpu"));

  useEffect(() => {
    setOpen(Open)
    setWinner(Winner)
  }, [Open, Winner])

  return (
    open ?
      <div className={styles.Container}>
        <h3 className={styles.Result}>{
          cpu.selected === true 
          ? winner === player1 ? "PLAYER 1 WON!" : winner === cpu.mark ? "CPU WON!" : "TIE"  
          : winner === player1 ? "PLAYER 1 WON!" : winner === player2.mark ? "PLAYER 2 WON!" : "TIE" }</h3>
        <div className={styles.WinnerContainer}>
          {winner === "x" ? <FontAwesomeIcon icon={faXmark} className={stylesIcons.xIcon} />
            : winner === "o" ? <FontAwesomeIcon icon={faO} className={stylesIcons.oIcon} />
              : <>
                <FontAwesomeIcon icon={faXmark} className={stylesIcons.xIcon} />
                <FontAwesomeIcon icon={faO} className={stylesIcons.oIcon} />
              </>}<h1 style={{ color: winner === "x" ? "#31c4c0" : winner === "o" ? "#f3b036" : "#a8bec9" }}>TAKES THE ROUND</h1></div>
        <button className={styles.BtnQuit} onClick={() => navigate("/TicTacToe")} >QUIT</button>
        <button className={styles.BtnNext} onClick={() => resetValues()} >NEXT ROUND</button>
      </div>
      :
      <>
      </>
  )
}

export default PopUp