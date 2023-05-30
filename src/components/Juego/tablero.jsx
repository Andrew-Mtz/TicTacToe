/* eslint-disable default-case */
import React, { useEffect, useState } from 'react'
import Casillas from './casillas'
import Gamesplayed from './gamesplayed'
import Header from './header'
import PopUp from './popUp'
import styles from './tablero.module.scss'
import Board from "../../classes/board.js";
import Player from "../../classes/player.js";
import toast, { Toaster } from 'react-hot-toast';

function Tablero({ casillas }) {

  const [open, setOpen] = useState(false)
  const [winner, setWinner] = useState()
  const [countX, setCountX] = useState(0)
  const [tries, setTries] = useState(0)
  const [countO, setCountO] = useState(0)
  const [jugar, setJugar] = useState(1)
  const [valores, setValores] = useState(["", "", "", "", "", "", "", "", ""])
  const [turn, setTurn] = useState(!JSON.parse(window.sessionStorage.getItem("cpu")).turn)
  const [turnX, setTurnX] = useState(true)
  const [cpu, setCpu] = useState(JSON.parse(window.sessionStorage.getItem("cpu")))
  const [difficulty, setDifficulty] = useState(window.sessionStorage.getItem("difficulty"))

  const openModal = (winner) => {
    setWinner(winner)
    setOpen(!open)
  }

  const notify = (text) => toast(text, {
    icon: 'ℹ',
  });

  //this function get Best Move and mark on there
  const cpuMark = () => {
    const newValue = cpu.mark;
    let valuesAvaibles = []
    valores.map((value, index) => {
      if (value === "") {
        valuesAvaibles.push(index)
      }
    });
    const board = new Board(valores);
    const p = new Player();
    let bestMove = null;
    switch (cpu.mark) {
      case "x":
        if (difficulty === "easy") {
          bestMove = parseInt(p.getBestMove(board, false));//false for minimizing turn
        } else {
          bestMove = parseInt(p.getBestMove(board, true));//true for maximizing turn
        }
        break;
      case "o":
        if (difficulty === "easy") {
          bestMove = parseInt(p.getBestMove(board, true));//true for maximizing turn
        } else {
          bestMove = parseInt(p.getBestMove(board, false));//false for minimizing turn
        }
        break;
    }
    const valoresUpdated = valores.map((value, index) => {
      if (index === bestMove && value === "") {
        return newValue;
      }
      return value;
    });
    setValores(valoresUpdated);
    setCpu({ ...cpu, turn: !cpu.turn })
    setTurn(!turn)
    setTurnX(!turnX)
  }

  //check if cpu is selected and if it's your turn
  if (jugar === 1 && cpu.selected === true) {
    if (cpu.turn === true) {
      setTimeout(() => {
        cpuMark()
      }, 500);
    }
  }

  //1 player moves
  const marcar1 = (valor, turn, id) => {
    if (jugar === 1) {
      if (valor !== "") {
        notify('box not available')
        return
      }
      if (turn === false) {
        notify('wait for your turn')
        return
      }
      setTurnX(!turnX)
      setTurn(!turn)
      setCpu({ ...cpu, turn: !cpu.turn })
      const idToUpdate = id;
      const newValue = window.sessionStorage.getItem("player1");
      const valoresUpdated = valores.map((value, index) => {
        if (index === idToUpdate) {
          return newValue;
        }
        return value;
      });
      setValores(valoresUpdated)
    }
  }

  //2players moves
  const marcar2V2 = (valor, turn, id) => {
    if (jugar === 1) {
      if (valor === "" && turn === true) {
        setTurn(false)
        setTurnX(!turnX)
        const idToUpdate = id;
        const newValue = "x";
        const valoresUpdated = valores.map((value, index) => {
          if (index === idToUpdate) {
            return newValue;
          }
          return value;
        });
        setValores(valoresUpdated)
      } else if (valor === "" && turn === false) {
        setTurn(true)
        setTurnX(!turnX)
        const idToUpdate = id;
        const newValue = "o";
        const valoresUpdated = valores.map((value, index) => {
          if (index === idToUpdate) {
            return newValue;
          }
          return value;
        });
        setValores(valoresUpdated)
      } else {
        return notify('box not available')
      }
    }
  }

  //reset all
  const reiniciar = () => {
    setJugar(1)
    setValores(["", "", "", "", "", "", "", "", ""])
    setTurn(!JSON.parse(window.sessionStorage.getItem("cpu")).turn)
    setOpen(false)
    setWinner()
    setCpu(JSON.parse(window.sessionStorage.getItem("cpu")))
  }

  //check after each move if there is a winner or a tie
  useEffect(() => {
    if (jugar === 1) {
      if (
        // Horizontal
        (valores[0] === "x" && valores[1] === "x" && valores[2] === "x") || (valores[3] === "x" && valores[4] === "x" && valores[5] === "x") || (valores[6] === "x" && valores[7] === "x" && valores[8] === "x")
        // Vertical
        || (valores[0] === "x" && valores[3] === "x" && valores[6] === "x") || (valores[1] === "x" && valores[4] === "x" && valores[7] === "x") || (valores[2] === "x" && valores[5] === "x" && valores[8] === "x")
        // Diagonal
        || (valores[0] === "x" && valores[4] === "x" && valores[8] === "x") || (valores[2] === "x" && valores[4] === "x" && valores[6] === "x")) {
        openModal("x")
        setJugar(0)
        setCountX(countX + 1)
      } else if
        // Horizontal
        ((valores[0] === "o" && valores[1] === "o" && valores[2] === "o") || (valores[3] === "o" && valores[4] === "o" && valores[5] === "o") || (valores[6] === "o" && valores[7] === "o" && valores[8] === "o")
        // Vertical
        || (valores[0] === "o" && valores[3] === "o" && valores[6] === "o") || (valores[1] === "o" && valores[4] === "o" && valores[7] === "o") || (valores[2] === "o" && valores[5] === "o" && valores[8] === "o")
        // Diagonal
        || (valores[0] === "o" && valores[4] === "o" && valores[8] === "o") || (valores[2] === "o" && valores[4] === "o" && valores[6] === "o")) {
        openModal("o")
        setJugar(0)
        setCountO(countO + 1)
      } else if (valores[0] !== "" && valores[1] !== "" && valores[2] !== "" && valores[3] !== "" && valores[4] !== "" && valores[5] !== "" && valores[6] !== "" && valores[7] !== "" && valores[8] !== "") {
        openModal("Ties")
        setJugar(0)
        setTries(tries + 1)
      }
    }
  }, [valores])

  return (
    <div className={styles.Tablero} >
      <Toaster toastOptions={{
        duration: 2500,
        style: {
          background: '#1f3540',
          color: '#fff',
        }
      }} />
      <Header turn={turnX} funcion={reiniciar} />
      {casillas.map((casilla, i) => {
        return <Casillas key={i} id={i} valor={valores[i]} turn={turn} funcion={cpu.selected === false ? marcar2V2 : marcar1} />
      })
      }
      <Gamesplayed countX={countX} tries={tries} countO={countO} />
      <PopUp Open={open} Winner={winner} resetValues={reiniciar} />
    </div>
  )
}

export default Tablero