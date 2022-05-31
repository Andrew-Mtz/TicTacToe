import React, { useState } from 'react'
import styles from './markPiker.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faO } from '@fortawesome/free-solid-svg-icons'

function MarkPiker({ funcion }) {

  const [player1, setPlayer1] = useState(window.sessionStorage.getItem("player1")) 

  return (
    <>
      <button className={player1 === "x" ? styles.BtnPickerSelected : styles.BtnPicker } onClick={() => {setPlayer1("x"); funcion("x", "o")}} ><FontAwesomeIcon icon={faXmark} className={styles.Icon} /></button>
      <button className={player1 === "o" ? styles.BtnPickerSelected : styles.BtnPicker } onClick={() => {setPlayer1("o"); funcion("o", "x")}} ><FontAwesomeIcon icon={faO} className={styles.Icon} /></button>
    </>
  )
}

export default MarkPiker