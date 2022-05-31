import React, { useEffect, useState } from 'react'
import styles from './casillas.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faO } from '@fortawesome/free-solid-svg-icons'


function Casillas({ valor, funcion, turn, id }) {

  const marcar = () => {
    funcion(valor, turn, id)
  }

  const [icon, setIcon] = useState()
  useEffect(() => {
    if (valor === "x") {
      setIcon(<FontAwesomeIcon icon={faXmark} className={styles.xIcon} />)
    } else if (valor === "o") {
      setIcon(<FontAwesomeIcon icon={faO} className={styles.oIcon} />)
    } else if(valor === "") {
      setIcon("")
    }
  }, [valor])

  return (
    <div id={id} className={styles.Casillas} onClick={marcar}>{icon}</div>
  )
}

export default Casillas