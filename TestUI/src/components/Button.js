import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

// constructor(props) {
//   super();
// }
// should component update ?

class Btn extends React.Component {
  handleOnPress() {
    let { onPress } = this.props;
    onPress && onPress();
  }
  render() {
    let { title, disabled } = this.props;
    
    let textStyle = this.props.buttonStyle || [];
    let buttonStyle = this.props.buttonStyle || [];
    let k = this.props.k || false;
    // inherit styles
    textStyle = [styles.btnText].concat(textStyle);
    buttonStyle = [styles.btn].concat(buttonStyle);

    return (
      <TouchableOpacity
        key={ k }
        style={ buttonStyle }
        onPress={ this.handleOnPress.bind(this) }
        activeOpacity={0.5}
        disabled={disabled || false}
      >
        <Text 
          style={ textStyle }
        >
          { title }
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Btn;
