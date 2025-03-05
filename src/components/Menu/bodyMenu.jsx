import styles from "./bodyMenu.module.scss";
import MarkPiker from "./markPiker";

function BodyMenu() {
  return (
    <div className={styles.BodyMenuContainer}>
      <p className={styles.Title}>PICK PLAYER 1'S MARK</p>
      <div className={styles.MarkPikerContainer}>
        <MarkPiker />
      </div>
      <p className={styles.Info}>REMEMBER X GOES FIRST</p>
    </div>
  );
}

export default BodyMenu;
