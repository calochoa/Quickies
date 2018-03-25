import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ListView,
  TouchableHighlight,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Videos from './dbstore/Videos.json';
import VideoTypes from './dbstore/VideoTypes.json';

const VideoTypesMap = new Map();
VideoTypes.map(element => {
  VideoTypesMap.set(element.vtName, element.vtId);
})

class VideosTemplate extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    let filteredData = []
    let videoTypeId = VideoTypesMap.get(this.props.headerTitle)
    Videos.map(element => {
      if (element.vtId === videoTypeId || this.props.headerTitle === 'All') {
        filteredData.push(element);
      }
    });

    filteredData = filteredData.sort((a,b) => {
      if (a.vName.toLowerCase() < b.vName.toLowerCase()) {
        return -1;
      }
      if (a.vName.toLowerCase() > b.vName.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    let headerTitle = this.props.headerTitle;
    if (headerTitle.endsWith('s')) {
      headerTitle = headerTitle.slice(0, -1);
    }

    this.state = {
      dataSource: ds.cloneWithRows(filteredData),
      headerTitle: headerTitle + ' Videos (' + filteredData.length + ')',
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(video) {
    let jumpTo = () => {
      this.props.navigator.push({
        id: 'Video',
        ytId: video.ytId,
      });
    };

    return (
      <TouchableHighlight style={styles.row} onPress={jumpTo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {video.vName}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { navigator } = this.props;
    const { headerTitle, dataSource } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} navigator={navigator} />
        <View style={styles.innerContainer}>
          <ListView 
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this)} />
        </View>
        <Footer navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  innerContainer: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: '#0276c9',
    padding: 5,
    marginLeft: 30,
    marginRight: 30,
    margin: 10,
    borderRadius: 15, 
    borderColor: '#4072b8',
  },
  nameContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 2,
    marginLeft: 10,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
  info: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Cochin',
  },
});

export default VideosTemplate;
