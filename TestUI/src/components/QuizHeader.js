import React from 'react';
import { View, ProgressViewIOS, Text, Button } from 'react-native';
import { styles, colors } from '../styles';

// TODO:
// Add close button - will call alert then go home

class QuizHeader extends React.Component {
  getProgress() {
    let { progress } = this.props;
    progress && progress();
  }
  render() {
    let { progress } = this.props;

    return (
      <View style={[styles.row, {paddingVertical: 20}]}>
        <Text>quit</Text>
        <ProgressViewIOS 
          style={{'width': '100%'}}
          progress={ progress && progress() }
          progressTintColor={ colors.green }
        />
      </View>
    );
  }
}

export default QuizHeader;
