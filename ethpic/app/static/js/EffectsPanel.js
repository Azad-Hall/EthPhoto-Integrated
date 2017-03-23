import React, {Component, PropTypes} from "react";

const styles = {
  root: {
    minWidth: 400,
    width: '40vw',
    position: 'absolute',
    right: '2vw',
    top: '45vh',
    transform: 'translate( 0 , -50% )',
    zIndex: '15',
    height: '60vh',
    overflowX: 'hidden',
    overflowY: 'scroll',
    paddingRight: '10px'
  }
};

export default class EffectsPanel extends Component {

  render () {
    const {children} = this.props;
    return (
      <div style={styles.root} id="style-scrollbar">{children}</div>
    );
  }
}

EffectsPanel.propTypes = {
  children: PropTypes.node.isRequired
};
