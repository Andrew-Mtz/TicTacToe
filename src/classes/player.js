import Board from "./board.js";

export default class Player {
  constructor(maxDepth = -1) {
    this.maxDepth = maxDepth;
    this.nodesMap = new Map();
  }
  getBestMove(
    board,
    maximizing = true,
    callback = () => {},
    depth = 0,
    alpha = -Infinity,
    beta = Infinity
  ) {
    if (depth === 0) this.nodesMap.clear();

    if (board.isTerminal() || depth === this.maxDepth) {
      if (board.isTerminal().winner === "x") {
        return 100 - depth;
      } else if (board.isTerminal().winner === "o") {
        return -100 + depth;
      }
      return 0;
    }

    if (maximizing) {
      let best = -Infinity;
      board.getAvailableMoves().forEach(index => {
        const child = new Board([...board.state]);
        child.insert("x", index);
        const nodeValue = this.getBestMove(
          child,
          false,
          callback,
          depth + 1,
          alpha,
          beta
        );
        best = Math.max(best, nodeValue);
        alpha = Math.max(alpha, best);

        if (beta <= alpha) return best; // Poda

        if (depth === 0) {
          this.nodesMap.set(
            nodeValue,
            this.nodesMap.has(nodeValue)
              ? `${this.nodesMap.get(nodeValue)},${index}`
              : index
          );
        }
      });

      if (depth === 0) {
        let returnValue;
        if (typeof this.nodesMap.get(best) == "string") {
          const arr = this.nodesMap.get(best).split(",");
          returnValue = arr[Math.floor(Math.random() * arr.length)];
        } else {
          returnValue = this.nodesMap.get(best);
        }
        callback(returnValue);
        return returnValue;
      }

      return best;
    } else {
      let best = Infinity;
      board.getAvailableMoves().forEach(index => {
        const child = new Board([...board.state]);
        child.insert("o", index);
        const nodeValue = this.getBestMove(
          child,
          true,
          callback,
          depth + 1,
          alpha,
          beta
        );
        best = Math.min(best, nodeValue);
        beta = Math.min(beta, best);

        if (beta <= alpha) return best; // Poda

        if (depth === 0) {
          this.nodesMap.set(
            nodeValue,
            this.nodesMap.has(nodeValue)
              ? `${this.nodesMap.get(nodeValue)},${index}`
              : index
          );
        }
      });

      if (depth === 0) {
        let returnValue;
        if (typeof this.nodesMap.get(best) == "string") {
          const arr = this.nodesMap.get(best).split(",");
          returnValue = arr[Math.floor(Math.random() * arr.length)];
        } else {
          returnValue = this.nodesMap.get(best);
        }
        callback(returnValue);
        return returnValue;
      }

      return best;
    }
  }
}
