import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from './menuBtn.module.scss'

function MenuBtn({ text, color, colorShadow, link, funcion }) {

  let navigate = useNavigate();

  return (
    <button
      style={{ backgroundColor: color, boxShadow: '0px 3px ' + colorShadow }}
      className={styles.BtnMenu}
      onClick={() => {funcion(); navigate(link)}} >
      {text}
    </button>
  )
}

export default MenuBtn