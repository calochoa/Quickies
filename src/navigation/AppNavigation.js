import React from 'react';
import { 
  View, 
  StyleSheet
} from 'react-native';
import { 
  StackNavigator, 
  DrawerNavigator,
  Header,
} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
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
      header: props => <GradientHeader {...props} />,
      headerStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
        fontFamily: 'Gill Sans',
        fontSize: 18,
      },
    },
  }
);

const GradientHeader = props => (
<View style={{ backgroundColor: '#eee' }}>
    <LinearGradient
      //colors={['#4c669f', '#3b5998', '#192f6a']} 
      colors={['#4c669f', '#0276c9', '#192f6a']} 
      style={[StyleSheet.absoluteFill, { height: Header.HEIGHT }]}
    >
      <Header {...props} />
    </LinearGradient>
  </View>
)

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
