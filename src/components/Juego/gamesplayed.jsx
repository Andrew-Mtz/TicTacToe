import React, { useContext } from "react";
import Games from "./games";
import styles from "./gamesplayed.module.scss";
import GameContext from "../../context/GameContext";

function Gamesplayed({ countX, countO, tries }) {
  const { playerMark, cpu } = useContext(GameContext);

  return (
    <div className={styles.GamesContainer}>
      {cpu.selected === true ? (
        <>
          <Games
            text={playerMark === "x" ? "X (P1)" : "X (CPU)"}
            countGames={countX}
            color={"#31c4c0"}
          />
          <Games text={"Ties"} countGames={tries} color={"#a8bec9"} />
          <Games
            text={playerMark === "x" ? "O (CPU)" : "O (P1)"}
            countGames={countO}
            color={"#f3b036"}
          />
        </>
      ) : (
        <>
          <Games text="X (P1)" countGames={countX} color={"#31c4c0"} />
          <Games text={"Ties"} countGames={tries} color={"#a8bec9"} />
          <Games text="O (P2)" countGames={countO} color={"#f3b036"} />
        </>
      )}
    </div>
  );
}

export default Gamesplayed;
