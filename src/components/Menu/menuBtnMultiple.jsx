import React, { useState } from 'react'
import styles from './menuBtnMultiple.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip';
import { Popover } from 'react-tiny-popover'
import ChangeDifficulty from './changeDifficulty'

function MenuBtnMultiple({ text, mouseEnter, funcion, funcionPlay }) {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <div
      className={styles.MenuBtnMultiple}
      onMouseEnter={() => funcion(true)}
      onMouseLeave={() => funcion(false)}>
      {mouseEnter
        ? <><button data-tip="Play" className={styles.MenuBtnMultipleLeft} onClick={() => funcionPlay()}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
          <ReactTooltip place='bottom' />
          <Popover
            isOpen={isPopoverOpen}
            positions={['top', 'right']}
            align={'start'}
            reposition={true}
            content={
              <div className={styles.PopoverContainer}>
                <h1>CHANGE DIFFICULTY</h1>
                <ChangeDifficulty />
              </div>}
            onClickOutside={() => setIsPopoverOpen(false)}
          >
            <button data-tip="Settings" className={styles.MenuBtnMultipleRight} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
              <FontAwesomeIcon icon={faGear} />
            </button>
          </Popover>
          <ReactTooltip place='bottom' />
        </> : text}</div>
  )
}

export default MenuBtnMultiple