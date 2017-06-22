import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles';


class HighScoreView extends React.Component {
    printMessage() {
        let { totalScore } = this.props;
        let text = '';

        if (totalScore === 0) {
            text = 'Oh no, you didn\'t get any questions right!';
        } else if (totalScore <= 2) {
            text = 'Oh no, you only got '+ totalScore +' questions';
        } else if (3 <= totalScore <= 5) {
            text = '3 - 5';
        } else if (6 <= totalScore <= 9) {
            text = '6 - 9'
        } else if (totalScore === 10) {
            text = '10';
        } else {
            text = 'error';
        }

        return text;
    }
    render() {
        let { width, totalScore, navigate } = this.props;

        return (
            <View style={[styles.container, {'width': width}]}>
                <Text>{ this.printMessage.bind(this)() }</Text>
                <Button 
                    title='Take another test' 
                    onPress={ () => navigate('Home') } 
                />
            </View>
        );
    }
}

export default HighScoreView;
