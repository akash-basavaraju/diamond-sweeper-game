import React from "react";
import Box from "./Box";

export default class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.resetDiamondMatric();
    this.state = { nearestDirection: {} };
  }

  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(7));
  }

  componentDidUpdate() {
    const { diamondsOpened, gameOver } = this.state;
    if (diamondsOpened === 8 && !gameOver) {
      this.setState({ gameOver: true });
    }
  }

  resetDiamondMatric() {
    this.diamondMatrix = [];
    for (let i = 0; i < 8; i++) {
      this.diamondMatrix[i] = new Array(8).fill(0);
      this.diamondMatrix[i][this.getRandomInt()] = 1;
    }
    this.unOpenedDiamondMatrix = JSON.parse(JSON.stringify(this.diamondMatrix));
  }

  getNearestDiamondDirection = index => {
    const [rowIndex, columnIndex] = index;
    const distanceToDirection = {};
    for (let i = rowIndex; i < 8; i++) {
      if (this.unOpenedDiamondMatrix[i][columnIndex]) {
        const distance = Math.abs(rowIndex - i);
        distanceToDirection[distance] = "bottom";
        break;
      }
    }
    for (let i = columnIndex; i < 8; i++) {
      if (this.unOpenedDiamondMatrix[rowIndex][i]) {
        const distance = Math.abs(columnIndex - i);
        distanceToDirection[distance] = "right";
        break;
      }
    }
    for (let i = rowIndex; i >= 0; i--) {
      if (this.unOpenedDiamondMatrix[i][columnIndex]) {
        const distance = Math.abs(rowIndex - i);
        distanceToDirection[distance] = "top";
        break;
      }
    }
    for (let i = columnIndex; i >= 0; i--) {
      if (this.unOpenedDiamondMatrix[rowIndex][i]) {
        const distance = Math.abs(columnIndex - i);
        distanceToDirection[distance] = "left";
        break;
      }
    }
    const min = Math.min(...Object.keys(distanceToDirection));
    if (distanceToDirection[min]) {
      return distanceToDirection[min];
    }
    return null;
  };

  boxOpened = (index, isDiamondPresent = false) => {
    const [rowIndex, columnIndex] = index;
    if (isDiamondPresent) {
      this.unOpenedDiamondMatrix[rowIndex][columnIndex] = 0;
      this.setState({ diamondsOpened: (this.state.diamondsOpened || 0) + 1 });
    } else {
      const direction = this.getNearestDiamondDirection(index);
      this.setState({
        nearestDirection: { index, direction },
        unopenedBoxes: (this.state.unopenedBoxes || 64) - 1
      });
    }
  };

  render() {
    const {
      nearestDirection: {
        index: [nRow, nColumn] = [],
        direction: nearestDirection = ""
      },
      unopenedBoxes,
      gameOver = false
    } = this.state;

    return (
      <div style={{ padding: "10px", margin: "10px" }}>
        <div style={{ fontSize: "21px", marginBottom: "20px" }}>
          Diamond Sweeper Game
          <div style={{ fontSize: "16px" }}>Find 8 Diamond Boxes. Hint: You can follow the arrows.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ border: "1px solid black" }}>
            {this.diamondMatrix.map((row, rowIndex) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    opacity: gameOver ? 0.5 : 1
                  }}
                >
                  {row.map((isDiamondPresent, columnIndex) => {
                    return (
                      <Box
                        key={`${rowIndex}-${columnIndex}`}
                        isDiamondPresent={isDiamondPresent}
                        index={[rowIndex, columnIndex]}
                        nearestDirection={
                          nRow === rowIndex && nColumn === columnIndex
                            ? nearestDirection
                            : undefined
                        }
                        boxOpened={this.boxOpened}
                        gameOver={gameOver}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div
            style={{
              flex: 1,
              padding: "10px",
              margin: "10px",
              display: "absolute"
            }}
          >
            {gameOver ? (
              <div
                style={{
                  padding: "10px",
                  margin: "10px",
                  border: "1px solid black"
                }}
              >
                <span>Game Over. Your Score : {unopenedBoxes}</span>
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  RESTART GAME
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div
          style={{
            fontSize: "12px",
            position: "absolute",
            bottom: "5px",
            right: "10px"
          }}
          onClick={() => {
            window.open("https://github.com/akash-basavaraju");
          }}
        >
          By Akash
        </div>
      </div>
    );
  }
}
