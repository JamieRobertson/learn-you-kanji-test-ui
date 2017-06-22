import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Flipper, H1 } from '../components';
import Dimensions from 'Dimensions';
import { styles } from '../styles';

/**
 * Simple practice screen.
 * Load all questions and answers (shuffled) for course.
 * Swipe back and forth to next/previous question.
 */

const {width, height} = Dimensions.get('window');
// const listItemWidth = (width * 0.75);
const data = [
  {'id': 1, 'question': '鑑', 'answer': 'a'},
  {'id': 2, 'question': 'B', 'answer': 'b'},
  {'id': 3, 'question': 'C', 'answer': 'c'}
]


class PracticeScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Flashcards'
  };

  renderItem = ({item}) => (
    <View style={[styles.container, styles.alignTop, {'width': width}]}>
      <Flipper 
        id={item.id}
      >
        <H1 
          title={item.question} 
          style={[styles.flipperFront]}
        />
        <Text style={[styles.flipperBack]}>
          { item.answer }
        </Text>
      </Flipper>
    </View>
  );

  render() {
    const { params } = this.props.navigation.state;
    
    return (  
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={this.renderItem}
        horizontal={true}
        pagingEnabled={true}
        initialNumToRender={1}
        style={[styles.row]}
        snapToAlignment={'center'}
        snapToInterval={1}
      />
    );
  }
}

export default PracticeScreen;

// let { currentQuestion } = this.state;

// let isNextVisible = currentQuestion < data.length ? true : false;
// let isPreviousVisible = currentQuestion > 0 ? true : false;

// <View style={ [styles.container] }></View>

// <View>
//   <Button
//     title='Previous'
//     onPress={ this.showPreviousQuestion }
//   />
//   <Button
//     title='Next'
//     onPress={ this.showNextQuestion }
//   />
// </View>
