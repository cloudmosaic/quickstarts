import React from "react";

class VanillaChildren extends React.Component {
  render() {
    // @ts-ignore
    return <div ref={(ref) => ref.appendChild(this.props.children)}></div>;
    // return <iframe src={window.location.href} width="100%" height="100%" />;
  }
}

export default VanillaChildren;
