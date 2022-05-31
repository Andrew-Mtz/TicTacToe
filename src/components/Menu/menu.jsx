import React from 'react'
import styles from './menu.module.scss'
import HeaderMenu from './headerMenu'
import BodyMenu from './bodyMenu'
import MenuBtn from './menuBtn'

function Menu() {

  const setCpuPlayer = () => {
    let mark = JSON.parse(window.sessionStorage.getItem("cpu")).mark
    if (mark === "x") {
      window.sessionStorage.setItem("cpu", JSON.stringify({ mark: mark, turn: true, selected: true }));
    } else if (mark === "o") {
      window.sessionStorage.setItem("cpu", JSON.stringify({ mark: mark, turn: false, selected: true }));
    }
  }

  const setP2Player = () => {
    let mark = JSON.parse(window.sessionStorage.getItem("player2")).mark
    window.sessionStorage.setItem("player2", JSON.stringify({ mark: mark, selected: true }));
    if (mark === "x") {
      window.sessionStorage.setItem("cpu", JSON.stringify({ mark: mark, turn: true, selected: false }));
    } else if (mark === "o") {
      window.sessionStorage.setItem("cpu", JSON.stringify({ mark: mark, turn: false, selected: false }));
    }
  }

  return (
    <div className={styles.Menu} >
      <HeaderMenu />
      <BodyMenu />
      <MenuBtn text={"NEW GAME (VS CPU)"} link={"/gameVScpu"} funcion={setCpuPlayer} color="#f3b036" colorShadow={"#c58b1b"} />
      <MenuBtn text={"NEW GAME (VS PLAYER 2)"} link={"/gameVSp2"} funcion={setP2Player} color="#31c4c0" colorShadow={"#0e8c88"} />
    </div>
  )
}

export default Menu