import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { HomeScreen, QuizScreen, PracticeScreen } from './screens';


const TestUI = StackNavigator({
  Home: { screen: HomeScreen },
  Practice: { screen: PracticeScreen },
  Quiz: { screen: QuizScreen }
});

AppRegistry.registerComponent('TestUI', () => TestUI);


// Quiz: { 
//   screen: QuizScreen, 
//   navigationOptions: ({navigation}) => ({
//     headerMode: 'none'
//   })
// }
