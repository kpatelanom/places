import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Row from './Row';
import {getQuerySearch, getTextSerch} from './../action/Action';
import {SearchBar} from 'react-native-elements';
import PropTypes from 'prop-types';
class SearchResult extends Component {
  static navigationOptions = {
    title: 'Search Results',
    headerStyle: {backgroundColor: '#21a1a6'},
    headerTitleStyle: {color: '#fff'},
    headerTintColor: '#fff',
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
  componentDidMount() {}

  pressedRow = index => {
    this.props.navigation.navigate('Details', {index: index, id: 1});
  };
  updateSearch = search => {
    this.setState({search: search}, () => {
      if (this.state.search.length > 2) {
        this.props.getQuerySearch(search);
      }
    });
  };
  predictionsClicked = des => {
    this.setState({search: des}, () => {
      this.props.getTextSerch(des);
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
    if (!this.props.textSerchResult) {
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
          data={
            this.props.textSerchResult
              ? this.props.textSerchResult.results
              : null
          }
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => this.pressedRow(index)}>
              <Row data={item} />
            </TouchableOpacity>
          )}
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
    predictions: state.reducer.predictions,
    textSerchResult: state.reducer.textSerchResult,
  };
};

export default connect(mapStateToPros, {getQuerySearch, getTextSerch})(
  SearchResult,
);
