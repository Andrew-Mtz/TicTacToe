import React from 'react'
import styles from './menuBtn.module.scss'

function MenuBtn({ text, color, colorShadow, funcion }) {

  return (
    <button
      style={{ backgroundColor: color, boxShadow: '0px 3px ' + colorShadow }}
      className={styles.BtnMenu}
      onClick={() => funcion()} >
      {text}
    </button>
  )
}

export default MenuBtn