import React from 'react';
import { View, ScrollView, Text, Button, Alert } from 'react-native';
import { styles } from '../styles';

/** 
 * Fetch all course data from CoreData.
 * Render course items with titles and button links.
 */
// TODO
// Remove default nav header

const data = [
    { 'grade': 1, 'name': 'foo 1' },
    { 'grade': 2, 'name': 'foo 2' },
    { 'grade': 3, 'name': 'foo 3' },
    { 'grade': 4, 'name': 'foo 4' },
    { 'grade': 5, 'name': 'foo 5' }
]

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
    // ,header: null
  };
  _onPressButton() {
    // Alert.alert('foo');
    const { navigate } = this.props.navigation;
    navigate('Quiz');
  }
  renderCourseItems() {
    const { navigate } = this.props.navigation;

    return data.map(function (object, i) {
      return (
        <View key={i}>
          <Text style={ [styles.h3] }>
            { object.name }
          </Text>
          <View style={ [styles.row] }>
            <Button 
              title='Take test'
              onPress={ () => navigate('Quiz', { data: object.grade }) }
            />
            <Button 
              title='Practice'
              onPress={ () => navigate('Practice', { data: object.grade }) }
            />
          </View>
        </View>
      );
    });
  }
  render() {
    return (
      <ScrollView contentContainerStyle={ [styles.container, styles.alignTop] }>
        { this.renderCourseItems() }
      </ScrollView>
    );
  }
}

export default HomeScreen;
