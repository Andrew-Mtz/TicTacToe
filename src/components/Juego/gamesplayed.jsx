import React, { useState } from 'react'
import Games from './games'
import styles from './gamesplayed.module.scss'

function Gamesplayed({ countX, countO, tries }) {

  const player1 = window.sessionStorage.getItem("player1");
  const cpu = JSON.parse(window.sessionStorage.getItem("cpu"));

  return (
    <div className={styles.GamesContainer} >
      {cpu.selected === true ?
        <>
          <Games text={player1 === "x" ? "X (P1)" : "X (CPU)"} countGames={countX} color={"#31c4c0"} />
          <Games text={"Ties"} countGames={tries} color={"#a8bec9"} />
          <Games text={player1 === "x" ? "O (CPU)" : "O (P1)"} countGames={countO} color={"#f3b036"} />
        </> :
        <>
          <Games text={player1 === "x" ? "X (P1)" : "X (P2)"} countGames={countX} color={"#31c4c0"} />
          <Games text={"Ties"} countGames={tries} color={"#a8bec9"} />
          <Games text={player1 === "x" ? "O (P2)" : "O (P1)"} countGames={countO} color={"#f3b036"} />
        </>}
    </div>
  )
}

export default Gamesplayed