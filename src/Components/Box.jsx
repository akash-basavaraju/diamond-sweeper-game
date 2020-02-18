import React from "react";

const Images = {
  question:
    "https://imageog.flaticon.com/icons/png/512/36/36601.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF",
  diamond:
    "https://pbs.twimg.com/profile_images/519190980965052416/ezCoKF1G.jpeg",
  left:
    "https://cdn0.iconfinder.com/data/icons/large-black-icons/512/Left_arrow_back_move_right.png",
  right:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Right_arrow.svg/434px-Right_arrow.svg.png",
  top: "http://www.clipartbest.com/cliparts/bcy/LRM/bcyLRMbBi.gif",
  bottom: "http://www.clipartbest.com/cliparts/Rid/gq8/Ridgq8g6T.jpeg"
};

const ImageProps = {
  height: "50px",
  width: "50px",

};

export default class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpened: false };
  }

  componentDidUpdate() {
    const {
      isDiamondPresent,
      getNearestDiamondDirection,
      index,
      diamondOpened
    } = this.props;
    const { nearestDirection, isOpened } = this.state;

    if (isOpened && isDiamondPresent) {
      diamondOpened(index);
    }

    if (!isDiamondPresent && !nearestDirection) {
      const diresction = getNearestDiamondDirection(index);
      if (diresction) {
        this.setState({ nearestDirection: diresction });
      }
    }
  }

  render() {
    const { isDiamondPresent } = this.props;
    const { nearestDirection, isOpened } = this.state;

    return (
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "1px solid black",
          margin: "5px"
        }}
      >
        {!isOpened ? (
          <img
            src={Images.question}
            {...ImageProps}
            onClick={() => {
              this.setState({ isOpened: true });
            }}
          />
        ) : isDiamondPresent ? (
          <img src={Images.diamond} {...ImageProps} />
        ) : nearestDirection ? (
          <img src={Images[nearestDirection]} {...ImageProps} />
        ) : null}
      </div>
    );
  }
}
