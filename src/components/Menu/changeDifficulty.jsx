import React, { useEffect, useState } from 'react'
import Switch from "react-switch";
import styles from './changeDifficulty.module.scss'

function ChangeDifficulty() {

  const [hard, setHard] = useState(false)

  const handleChange = () => {
    setHard(!hard)
  }

  useEffect(() => {
    if (hard) {
      window.sessionStorage.setItem("difficulty", 'hard');
    } else {
      window.sessionStorage.setItem("difficulty", 'easy');
    }
  }, [hard])

  return (
    <div className={styles.SwitchContainer} >
      <p  style={ hard ? {  color: '#97adb8'} : {  color: '#31c4c0'}} >MEDIUM</p>
      <Switch
        width={65}
        height={23}
        uncheckedIcon={false}
        checkedIcon={false}
        onColor={'#192a32'}
        offColor={'#192a32'}
        onHandleColor={'#f3b036'}
        offHandleColor={'#31c4c0'}
        onChange={handleChange}
        checked={hard} />
      <p style={ hard ? {  color: '#f3b036'} : {  color: '#97adb8'}} >HARD</p>
    </div>
  )
}

export default ChangeDifficulty