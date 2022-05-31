import React from 'react'
import styles from './games.module.scss'

function Games({countGames, text, color}) {
  return (
    <div style={{backgroundColor: color}} className={styles.Games} >
      <p>{text}</p>
      <p>{countGames}</p>
    </div>
  )
}

export default Games