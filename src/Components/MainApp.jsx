import React from "react";
import Box from "./Box";

export default class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.diamondMatrix = [
      [1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0]
    ];
    this.unOpenedDiamondMatrix = JSON.parse(JSON.stringify(this.diamondMatrix));
  }

  getNearestDiamondDirection = index => {
    debugger;
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

  diamondOpened = index => {
    const [rowIndex, columnIndex] = index;
    this.unOpenedDiamondMatrix[rowIndex][columnIndex] = 0;
  };

  render() {
    return (
      <div>
        {this.diamondMatrix.map((row, rowIndex) => {
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              {row.map((isDiamondPresent, columnIndex) => {
                return (
                  <Box
                    isDiamondPresent={isDiamondPresent}
                    index={[rowIndex, columnIndex]}
                    getNearestDiamondDirection={this.getNearestDiamondDirection}
                    diamondOpened={this.diamondOpened}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
