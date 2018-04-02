import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import QuickieTypesScreen from '../screens/QuickieTypesScreen';
import QuickiesScreen from '../screens/QuickiesScreen';
import QuickieScreen from '../screens/QuickieScreen';
import QuickieOfTheDayScreen from '../screens/QuickieOfTheDayScreen';
import ExerciseTypesScreen from '../screens/ExerciseTypesScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import WorkoutTypesScreen from '../screens/WorkoutTypesScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import WorkoutOfTheDayScreen from '../screens/WorkoutOfTheDayScreen';
import FaqScreen from '../screens/FaqScreen';

import DetailsScreen from '../screens/DetailsScreen';
import ModalScreen from '../screens/ModalScreen';


const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    QuickieTypes: {
      screen: QuickieTypesScreen,
    },
    Quickies: {
      screen: QuickiesScreen,
    },
    Quickie: {
      screen: QuickieScreen,
    },
    QuickieOfTheDay: {
      screen: QuickieOfTheDayScreen,
    },
    ExerciseTypes: {
      screen: ExerciseTypesScreen,
    },
    Exercises: {
      screen: ExercisesScreen,
    },
    Exercise: {
      screen: ExerciseScreen,
    },
    WorkoutTypes: {
      screen: WorkoutTypesScreen,
    },
    Workouts: {
      screen: WorkoutsScreen,
    },
    Workout: {
      screen: WorkoutScreen,
    },
    WorkoutOfTheDay: {
      screen: WorkoutOfTheDayScreen,
    },

    FAQ: {
      screen: FaqScreen,
    },

    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#0276c9',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        //fontFamily: 'Cochin',
        fontSize: 20,
      },
    },
  }
);

const RootStack = DrawerNavigator(
  {
    Main: {
      screen: MainStack,
    },
    QuickieTypes: {
      screen: QuickieTypesScreen,
    },
    QuickieOfTheDay: {
      screen: QuickieOfTheDayScreen,
    },
    WorkoutTypes: {
      screen: WorkoutTypesScreen,
    },
    WorkoutOfTheDay: {
      screen: WorkoutOfTheDayScreen,
    },
    ExerciseTypes: {
      screen: ExerciseTypesScreen,
    },
    FAQ: {
      screen: FaqScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    drawerPosition: 'right',
  }
);


export default RootStack;
