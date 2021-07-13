import React, {Component} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Rating} from 'react-native-ratings';
import {placePhotosUrl} from './../services/Service';
import PropTypes from 'prop-types';
class customRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.data) {
      return <View></View>;
    }
    return (
      <View style={styles.row}>
        <Image
          source={
            this.props.data.photos
              ? {uri: placePhotosUrl(this.props.data.photos[0].photo_reference)}
              : require('./../assets/image/no_image.png')
          }
          style={styles.firstImage}
        />
        <View style={styles.contain}>
          <View style={styles.firstBlock}>
            <Text style={styles.title}>
              {this.props.data.name.length > 25
                ? this.props.data.name.match(/(.*?\s){3}/g) !== null &&
                  this.props.data.name.match(/(.*?\s){3}/g).length > 0
                  ? this.props.data.name.match(/(.*?\s){3}/g)[0]
                  : this.props.data.name.match(/(.*?\s){3}/g)
                : this.props.data.name}
            </Text>
            <Image source={{uri: this.props.data.icon}} style={styles.photo} />
          </View>
          <View>
            <Text style={styles.description}>
              {this.props.data.formatted_address
                ? this.props.data.formatted_address
                : this.props.data.vicinity}
            </Text>
          </View>
        </View>
        <View style={styles.rating}>
          {this.props.data.rating ? (
            <Rating
              type="star"
              ratingColor="#FDCC0D"
              ratingBackgroundColor="transparent"
              ratingCount={5}
              imageSize={20}
              style={styles.ratingClass}
              startingValue={this.props.data.rating || 0}
            />
          ) : (
            <Text> N/A</Text>
          )}
          {this.props.data.opening_hours ? (
            this.props.data.opening_hours.open_now ? (
              <Text
                style={{
                  color: 'green',
                  position: 'absolute',
                  right: 20,
                  top: 8,
                  fontSize: 16,
                }}>
                open
              </Text>
            ) : (
              <Text
                style={{
                  color: 'red',
                  position: 'absolute',
                  right: 20,
                  top: 8,
                  fontSize: 16,
                }}>
                close
              </Text>
            )
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  firstImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    shadowColor: '#fff',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  title: {
    fontSize: 22,
    fontFamily: 'helvetica',
    position: 'absolute',
    left: '1%',
    top: '5%',
    width: '80%',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    paddingTop: 20,
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  photo: {
    height: 30,
    width: 30,
    position: 'absolute',
    right: 0,
  },
  row: {
    width: '100%',
    height: 'auto',
    maxHeight: 400,
    backgroundColor: '#fff',
    borderBottomColor: 'black',
    paddingTop: 1,
    marginBottom: 5,
    elevation: 10,
    borderRadius: 7,
    shadowColor: '#fff',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  contain: {
    padding: 5,
  },
  firstBlock: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  types: {
    marginBottom: 0,
    fontSize: 16,
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    marginTop: 0,
    fontStyle: 'italic',
  },
  ratingClass: {
    paddingVertical: 10,
    position: 'relative',
    top: -10,
  },
});

export default customRow;
