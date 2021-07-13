import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Slideshow from 'react-native-slideshow';
import {Rating} from 'react-native-ratings';
import {getPlaceDetails} from './../action/Action';
import {placePhotosUrl} from './../services/Service';
import PropTypes from 'prop-types';

class Details extends Component {
  static navigationOptions = {
    title: 'Details',
    headerTintColor: '#fff',
    headerStyle: {backgroundColor: '#21a1a6'},
    headerTitleStyle: {color: '#fff'},
  };

  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      index: this.props.navigation.state.params.index,
      currentData: {},
    };
  }
  componentDidMount() {
    if (this.props.navigation.state.params.id === 0) {
      this.setState(
        {currentData: this.props.placeData[this.state.index]},
        () => {
          this.props.getPlaceDetails(this.state.currentData.place_id);
        },
      );
    } else {
      this.setState(
        {currentData: this.props.textSerchResult.results[this.state.index]},
        () => {
          this.props.getPlaceDetails(this.state.currentData.place_id);
        },
      );
    }

    setTimeout(() => {
      this.setState({spinner: false});
    }, 2000);
  }

  onSwipeLeft = gestureState => {
    return;
    if (this.state.index < this.props.placeData.length) {
      this.setState({index: this.state.index + 1});
    }
    this.setState({
      currentData: this.props.placeData[this.state.index + 1],
    });
  };

  onSwipeRight = gestureState => {
    return;
    if (this.state.index > 0) {
      this.setState({index: this.state.index - 1});
    }
    this.setState({
      currentData: this.props.placeData[this.state.index - 1],
    });
  };
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    let dataSource = [];
    console.log(this.props);
    if (this.props.PlacePhotos) {
      console.log(this.props);
      this.props.PlacePhotos.map(a => {
        console.log('callling map');
        console.log(a);
        dataSource.push({url: placePhotosUrl(a.photo_reference)});
      });
    }
    console.log(dataSource);
    if (!this.state.currentData.types) {
      return (
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      );
    }
    return (
      <View>
        {this.state.spinner && dataSource.length > 0 ? (
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        ) : (
          <ScrollView style={{backgroundColor: '#fff'}}>
            <Slideshow dataSource={dataSource} height={400} arrowSize={0} />
            <GestureRecognizer
              onSwipeLeft={this.onSwipeLeft}
              onSwipeRight={this.onSwipeRight}
              config={config}
              style={{
                flex: 1,
              }}>
              <View style={styles.view}>
                <Text style={styles.title}>{this.state.currentData.name}</Text>
                <View>
                  <Text style={styles.description}>
                    <Text style={{fontSize: 18, fontWeight: '500'}}>
                      Address:{' '}
                    </Text>{' '}
                    {this.state.currentData.formatted_address
                      ? this.state.currentData.formatted_address
                      : this.state.currentData.vicinity}
                  </Text>
                  <Text style={{fontSize: 18, fontWeight: '500'}}>
                    Contact:{' '}
                    {this.props.formatted_phone_number ? (
                      <Text
                        onPress={() => {
                          Linking.openURL(
                            `tel:${this.props.actual_phone_number}`,
                          );
                        }}>
                        {this.props.formatted_phone_number}
                      </Text>
                    ) : (
                      <Text>N/A</Text>
                    )}
                  </Text>
                  <Text style={styles.types}>
                    <Text style={{fontSize: 18, fontWeight: '500'}}>
                      Type:{' '}
                    </Text>{' '}
                    {this.state.currentData.types.map(a => (
                      <Text key={a}>{a} </Text>
                    ))}
                  </Text>
                </View>
                <View style={styles.rating}>
                  <Text>Rating: </Text>
                  {this.state.currentData.rating ? (
                    <Rating
                      type="star"
                      ratingColor="#FDCC0D"
                      ratingBackgroundColor="transparent"
                      ratingCount={5}
                      imageSize={20}
                      style={styles.ratingClass}
                      startingValue={this.state.currentData.rating || 0}
                    />
                  ) : (
                    <Text> N/A</Text>
                  )}
                  {this.state.currentData.user_ratings_total ? (
                    <Text style={{paddingLeft: 5}}>
                      ({this.state.currentData.user_ratings_total})
                    </Text>
                  ) : (
                    <Text></Text>
                  )}
                  <Text style={styles.openhour}>
                    Status:{' '}
                    {this.state.currentData.opening_hours ? (
                      this.state.currentData.opening_hours.open_now ? (
                        <Text style={{color: 'green'}}>open</Text>
                      ) : (
                        <Text style={{color: 'red'}}>close</Text>
                      )
                    ) : (
                      <Text>N/A</Text>
                    )}
                  </Text>
                </View>
                <View style={styles.review}>
                  <Text>Review</Text>
                  <View style={styles.container}>
                    <FlatList
                      data={
                        this.props.placeReviews ? this.props.placeReviews : null
                      }
                      renderItem={({item}) => (
                        <View style={styles.container}>
                          <Image
                            source={{uri: item.profile_photo_url}}
                            style={styles.author_photo}
                          />
                          <View style={styles.container_text}>
                            <Text style={styles.text}>{item.text}</Text>
                            <Text style={styles.author_name}>
                              {item.author_name}
                            </Text>
                          </View>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </View>
            </GestureRecognizer>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 10,
    margin: 5,
    fontFamily: 'helvetica',
  },
  photo: {
    height: 300,
    width: '100%',
    position: 'absolute',
    right: 0,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  title: {
    fontSize: 22,
    fontFamily: 'helvetica',
    width: '90%',
  },
  description: {
    paddingTop: 20,
    fontSize: 16,
    marginBottom: 15,
    marginTop: 10,
  },
  types: {
    marginBottom: 0,
    fontSize: 16,
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    fontStyle: 'italic',
  },
  ratingClass: {
    paddingVertical: 10,
    position: 'relative',
    top: -10,
    paddingLeft: 3,
  },
  openhour: {
    position: 'absolute',
    right: '2%',
    paddingLeft: 10,
  },
  open: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  author_name: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  author_photo: {
    height: 50,
    width: 50,
  },
});

const mapStateToProps = state => {
  return {
    placeData: state.reducer.placeData,
    PlacePhotos: state.reducer.PlacePhotos,
    placeReviews: state.reducer.placeReviews,
    formatted_phone_number: state.reducer.formatted_phone_number,
    actual_phone_number: state.reducer.actual_phone_number,
    textSerchResult: state.reducer.textSerchResult,
  };
};

export default connect(mapStateToProps, {getPlaceDetails})(Details);
