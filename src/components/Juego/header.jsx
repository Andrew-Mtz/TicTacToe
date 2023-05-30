import React, { useEffect } from 'react'
import styles from './header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faO } from '@fortawesome/free-solid-svg-icons'

function Header({ turn, funcion }) {

  const reiniciar = () => {
    funcion()
  }

  return (
    <>
      <p className={styles.LogoHeader} ><FontAwesomeIcon className={styles.LogoXHeader} icon={faXmark} /><FontAwesomeIcon className={styles.LogoCircleHeader} icon={faO} /></p>
      <p className={styles.TurnHeader} >{turn ? <FontAwesomeIcon className={styles.IconTurn} icon={faXmark} /> : <FontAwesomeIcon className={styles.IconTurn} icon={faO} />}TURN</p>
      <button className={styles.ButtonHeader} onClick={reiniciar} ><FontAwesomeIcon icon={faArrowRotateRight} /></button>
    </>
  )
}

export default Header