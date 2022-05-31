import React from 'react'
import styles from './headerMenu.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faO } from '@fortawesome/free-solid-svg-icons'

function HeaderMenu() {
  return (
    <p className={styles.LogoHeader} ><FontAwesomeIcon className={styles.LogoXHeader} icon={faXmark} /><FontAwesomeIcon className={styles.LogoCircleHeader} icon={faO} /></p>
  )
}

export default HeaderMenu