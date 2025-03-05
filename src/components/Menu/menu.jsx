import React, { useContext, useState } from "react";
import styles from "./menu.module.scss";
import HeaderMenu from "./headerMenu";
import BodyMenu from "./bodyMenu";
import MenuBtn from "./menuBtn";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MenuBtnMultiple from "./menuBtnMultiple";
import GameContext from "../../context/GameContext";

function Menu() {
  const { playerMark, setCpu } = useContext(GameContext);
  const [mouseEnter, setMouseEnter] = useState(false);

  let navigate = useNavigate();

  const notify = text =>
    toast(text, {
      icon: "ℹ",
    });

  const setCpuPlayer = () => {
    try {
      playerMark === "x"
        ? setCpu({ selected: true, mark: "o" })
        : setCpu({ selected: true, mark: "x" });
      navigate("/gameVScpu");
    } catch (error) {
      notify("You must choose one");
    }
  };

  const setP2Player = () => {
    setCpu({ selected: false, mark: "o" });
    navigate("/gameVSp2");
  };

  return (
    <div className={styles.Menu}>
      <Toaster
        toastOptions={{
          duration: 2500,
          style: {
            background: "#1f3540",
            color: "#fff",
          },
        }}
      />
      <HeaderMenu />
      <BodyMenu />
      <MenuBtnMultiple
        text={"NEW GAME (VS CPU)"}
        funcion={setMouseEnter}
        funcionPlay={setCpuPlayer}
        mouseEnter={mouseEnter}
      />
      <MenuBtn
        text={"NEW GAME (VS PLAYER 2)"}
        funcion={setP2Player}
        color="#31c4c0"
        colorShadow={"#0e8c88"}
      />
    </div>
  );
}

export default Menu;
