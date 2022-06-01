import React, { useEffect, useState } from 'react'
import styles from './menu.module.scss'
import HeaderMenu from './headerMenu'
import BodyMenu from './bodyMenu'
import MenuBtn from './menuBtn'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import MenuBtnMultiple from './menuBtnMultiple'

function Menu() {

  const [mouseEnter, setMouseEnter] = useState(false);

  let navigate = useNavigate();

  const notify = (text) => toast(text, {
    icon: 'ℹ',
  });

  const setCpuPlayer = () => {
    try {
      let mark = JSON.parse(window.sessionStorage.getItem("cpu")).mark
      if (mark === "x") {
        window.sessionStorage.setItem("cpu", JSON.stringify({ mark: mark, turn: true, selected: true }));
      } else if (mark === "o") {
        window.sessionStorage.setItem("cpu", JSON.stringify({ mark: mark, turn: false, selected: true }));
      }
      navigate('/gameVScpu')
    } catch (error) {
      notify('You must choose one')
    }

  }

  const setP2Player = () => {
    try {
      let mark = JSON.parse(window.sessionStorage.getItem("player2")).mark
      window.sessionStorage.setItem("player2", JSON.stringify({ mark: mark, selected: true }));
      window.sessionStorage.setItem("cpu", JSON.stringify({ mark: mark, turn: false, selected: false }));
      navigate('/gameVSp2')
    } catch (error) {
      notify('You must choose one')
    }
  }

  return (
    <div className={styles.Menu} >
      <Toaster toastOptions={{
        duration: 2500,
        style: {
          background: '#1f3540',
          color: '#fff',
        }
      }} />
      <HeaderMenu />
      <BodyMenu />
      <MenuBtnMultiple text={"NEW GAME (VS CPU)"} funcion={setMouseEnter} funcionPlay={setCpuPlayer} mouseEnter={mouseEnter} />
      <MenuBtn text={"NEW GAME (VS PLAYER 2)"} funcion={setP2Player} color="#31c4c0" colorShadow={"#0e8c88"} />
    </div>
  )
}

export default Menu