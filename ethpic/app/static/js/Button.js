const React = require("react");
const {
  Component,
  PropTypes
} = React;

const styles = {
  button: {
    position: 'absolute',
    right: '15vw',
    top: '25vh'
  }
};

class Button extends Component {

  constructor (props) {
    super(props);
    this.state = {
      pending: false
    };
  }

  onClick = e => {
    if (this.state.pending) return;
    const {onPress} = this.props;
    e.preventDefault();
    this.setState({ pending: true });
    Promise.resolve()
    .then(onPress)
    .catch(e => console.warn(e)) // eslint-disable-line no-console
    .then(() => this.setState({ pending: false }));
  };

  render () {
    const {children} = this.props;
    const {pending} = this.state;
    return <button
      style={{ ...styles.button, opacity: pending ? 0.3 : 1 }}
      className='waves-effect waves-light btn-large indigo'
      onClick={this.onClick}>
      {children}
    </button>;
  }
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
};

module.exports = Button;
