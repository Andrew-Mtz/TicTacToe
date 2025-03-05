import React, { useContext } from "react";
import Switch from "react-switch";
import styles from "./changeDifficulty.module.scss";
import GameContext from "../../context/GameContext";

function ChangeDifficulty() {
  const { difficulty, setDifficulty } = useContext(GameContext);

  const handleChange = () => {
    setDifficulty(difficulty === "hard" ? "easy" : "hard");
  };

  return (
    <div className={styles.SwitchContainer}>
      <p
        style={
          difficulty === "hard" ? { color: "#97adb8" } : { color: "#31c4c0" }
        }
      >
        EASY
      </p>
      <Switch
        width={65}
        height={23}
        uncheckedIcon={false}
        checkedIcon={false}
        onColor={"#192a32"}
        offColor={"#192a32"}
        onHandleColor={"#f3b036"}
        offHandleColor={"#31c4c0"}
        onChange={handleChange}
        checked={difficulty === "hard"}
      />
      <p
        style={
          difficulty === "hard" ? { color: "#f3b036" } : { color: "#97adb8" }
        }
      >
        HARD
      </p>
    </div>
  );
}

export default ChangeDifficulty;
