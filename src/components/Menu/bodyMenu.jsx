import styles from './bodyMenu.module.scss'
import MarkPiker from './markPiker'

function BodyMenu() {

  const chooseUser = (mark, mark2) => {
    window.sessionStorage.setItem("player1", mark);
    window.sessionStorage.setItem("player2", JSON.stringify({ mark: mark2, turn: false, selected: false }));
    window.sessionStorage.setItem("cpu", JSON.stringify({ mark: mark2, turn: false, selected: false }));
  }

  return (
    <div className={styles.BodyMenuContainer}>
      <p className={styles.Title}>PICK PLAYER 1'S MARK</p>
      <div className={styles.MarkPikerContainer}>
        <MarkPiker funcion={chooseUser} />
      </div>
      <p className={styles.Info}>REMEMBER X GOES FIRST</p>
    </div>
  )
}

export default BodyMenu