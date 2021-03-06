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
import {getGradientColor} from '../utils/GradientColor';
import HomeScreen from '../screens/HomeScreen';
import QuickieOptionsScreen from '../screens/QuickieOptionsScreen';
import QuickieLevelsScreen from '../screens/QuickieLevelsScreen';
import QuickieTypesScreen from '../screens/QuickieTypesScreen';
import QuickieModesScreen from '../screens/QuickieModesScreen';
import QuickiesScreen from '../screens/QuickiesScreen';
import MultipleModesQuickiesScreen from '../screens/MultipleModesQuickiesScreen';
import QuickieScreen from '../screens/QuickieScreen';
import QuickieOfTheDayScreen from '../screens/QuickieOfTheDayScreen';
import ExercisesScreen from '../screens/ExercisesScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import WorkoutOfTheDayScreen from '../screens/WorkoutOfTheDayScreen';
import WeeklyChallengeScreen from '../screens/WeeklyChallengeScreen';
import FaqScreen from '../screens/FaqScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import SideMenu from '../components/SideMenu';


const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    QuickieOptions: {
      screen: QuickieOptionsScreen,
    },
    QuickieLevels: {
      screen: QuickieLevelsScreen,
    },
    QuickieTypes: {
      screen: QuickieTypesScreen,
    },
    QuickieModes: {
      screen: QuickieModesScreen,
    },
    Quickies: {
      screen: QuickiesScreen,
    },
    MultipleModesQuickies: {
      screen: MultipleModesQuickiesScreen,
    },
    Quickie: {
      screen: QuickieScreen,
    },
    QuickieOfTheDay: {
      screen: QuickieOfTheDayScreen,
    },
    Exercises: {
      screen: ExercisesScreen,
    },
    Exercise: {
      screen: ExerciseScreen,
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
    WeeklyChallenge: {
      screen: WeeklyChallengeScreen,
    },
    FAQ: {
      screen: FaqScreen,
    },
    MyProfile: {
      screen: MyProfileScreen,
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
      colors={getGradientColor('Header')} 
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
    QuickieOptions: {
      screen: QuickieOptionsScreen,
    },
    QuickieOfTheDay: {
      screen: QuickieOfTheDayScreen,
    },
    WorkoutOfTheDay: {
      screen: WorkoutOfTheDayScreen,
    },
    WeeklyChallenge: {
      screen: WeeklyChallengeScreen,
    },
    Exercises: {
      screen: ExercisesScreen,
    },
    FAQ: {
      screen: FaqScreen,
    },
    MyProfile: {
      screen: MyProfileScreen,
    },
  },
  {
    contentComponent: SideMenu,
    mode: 'modal',
    headerMode: 'none',
    drawerPosition: 'right',
  }
);


export default RootStack;
