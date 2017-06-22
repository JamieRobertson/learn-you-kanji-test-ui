import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { styles, colors } from '../styles';


class Choice extends React.Component {
  handleOnPress() {
    let { onPress, choiceIndex } = this.props;
    onPress && onPress(choiceIndex);
  }
  render() {
    let { isActive, title } = this.props;
    let k = this.props.k || false;
    let buttonStyle = isActive ? [styles.choiceItem, styles.choiceItem_active] : [styles.choiceItem];
    let textStyle = isActive ? [{'color': 'white'}] : [];

    return (
      <TouchableHighlight        
        style={ buttonStyle }
        onPress={ this.handleOnPress.bind(this) }
        underlayColor={ colors.blue }
      >
        <Text style={textStyle}>
          { title }
        </Text>
      </TouchableHighlight>
    );
  }
}

export default Choice;
