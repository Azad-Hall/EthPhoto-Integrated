import React, {Component, PropTypes} from "react";

export default class AppContainer extends Component {

  render () {
    const {children} = this.props;
    return (
      <div>{children}</div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.node.isRequired
};
