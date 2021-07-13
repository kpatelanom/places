import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Row from './Row';
import {
  getGeoLocation,
  getNextPageResult,
  getQuerySearch,
  getTextSerch,
} from './../action/Action';
import {SearchBar} from 'react-native-elements';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {PermissionsAndroid} from 'react-native';
import PropTypes from 'prop-types';

class Home extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      title: 'Find Place',
      headerStyle: {backgroundColor: '#21a1a6'},
      headerTitleStyle: {color: '#fff'},
      headerRight: () => (
        <TouchableOpacity onPress={navigation.toggleDrawer}>
          <Image
            source={require('./../assets/image/menu.png')}
            style={{height: 30, width: 30, marginRight: 15}}
          />
        </TouchableOpacity>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      spinner: true,
      search: '',
      showDialog: false,
    };
  }
  componentDidMount() {
    this.requestLocationPermission();
  }

  requestLocationPermission = async () => {
    console.log('Calling the permission');
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted) {
        this.props.getGeoLocation();
        setTimeout(() => {
          this.setState({spinner: false});
        }, 2000);
      } else {
        // this.requestLocationPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  pressedRow = index => {
    this.props.navigation.navigate('Details', {index: index, id: 0});
  };
  updateSearch = search => {
    this.setState({search: search}, () => {
      if (this.state.search.length > 2) {
        this.props.getQuerySearch(search);
      }
    });
  };
  callNextPage = () => {
    this.props.getNextPageResult(this.props.next_page_token);
  };
  predictionsClicked = des => {
    this.setState({search: des}, () => {
      this.props.getTextSerch(des);
      this.props.navigation.navigate('Search');
      this.setState({search: ''});
    });
  };
  submitSearch = () => {
    this.props.getTextSerch(this.state.search);
    this.props.navigation.navigate('Search');
    this.setState({search: ''});
  };
  render() {
    console.log(this.props);
    if (!this.props.placeData) {
      return (
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      );
    }
    return (
      <View style={styles.root}>
        <SearchBar
          placeholder="Search places..."
          onChangeText={this.updateSearch}
          value={this.state.search}
          onSubmitEditing={this.submitSearch}
        />
        {this.props.predictions && this.state.search.length > 2 ? (
          <View style={styles.searchResult}>
            <FlatList
              data={this.props.predictions}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => this.predictionsClicked(item.description)}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#ededed',
                      minHeight: 30,
                      height: 'auto',
                      maxHeight: 80,
                    }}>
                    <Text
                      style={{
                        paddingTop: 2,
                        paddingLeft: 10,
                        color: '#000',
                        fontSize: 16,
                      }}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : null}
        <FlatList
          data={this.props.placeData ? this.props.placeData : null}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => this.pressedRow(index)}>
              <Row data={item} />
            </TouchableOpacity>
          )}
          refreshing={this.props.isLoading}
          onRefresh={this.props.getGeoLocation}
          ListFooterComponent={() => (
            <ActivityIndicator animating size="large" />
          )}
          onEndReached={this.callNextPage}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  bottom: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#31de7d',
  },
  textInput: {
    position: 'relative',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Verdana san-serif',
    //backgroundColor:'#c641e0'
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  searchResult: {
    position: 'absolute',
    top: 65,
    zIndex: 99,
    maxHeight: 700,
    height: 'auto',
    width: '100%',
    backgroundColor: '#fff',
  },
});

const mapStateToPros = state => {
  return {
    placeData: state.reducer.placeData,
    isLoading: state.reducer.isLoading,
    next_page_token: state.reducer.next_page_token,
    predictions: state.reducer.predictions,
    textSerchResult: state.reducer.textSerchResult,
  };
};

export default connect(mapStateToPros, {
  getGeoLocation,
  getNextPageResult,
  getQuerySearch,
  getTextSerch,
})(Home);
