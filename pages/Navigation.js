import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import {createDrawerNavigator} from 'react-navigation-drawer';
import MenuButton from './MenuButton';
import HomeScreen from './Home';
import DetailsScreen from './Details';
import SearchResult from './SearchResult';
import PropTypes from 'prop-types';

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Search: SearchResult,
  },
  {
    initialRouteName: 'Home',
  },
);

// const HomeNavigator = createStackNavigator({
//   Home: {screen: HomeScreen},
// });

// const DetailsNavigator = createStackNavigator({
//   Details: {screen: DetailsScreen},
// });

// const SearchNavigator = createStackNavigator({
//   Search: {screen: SearchResult},
// });

// const drawerNavigator = createDrawerNavigator(
//   {
//     // Home: HomeNavigator,
//     // Search: SearchNavigator,
//     // Details: DetailsNavigator
//     Home: {screen: MainNavigator},
//   },
//   {
//     drawerPosition: 'right',
//   },
// );

// const Navigation = createAppContainer(drawerNavigator);
export default createAppContainer(MainNavigator);
