import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  TouchableHighlight, 
  ListView, 
} from 'react-native';
import TimeFormatter from 'minutes-seconds-milliseconds';


let ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
});

class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      laps: [],
      lapCount: 0,
      dataSource: ds.cloneWithRows([]),
      isRunning: false,
      mainTimer: null,
      lapTimer: null,
      mainTimerStart: null,
      lapTimerStart: null,
    }
  }

  _renderTitle() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Stopwatch</Text>
      </View>
    );
  }

  _renderTimers() {
    return (
      <View style={styles.timerWrapper}>
        <View style={styles.timerWrapperInner}>
          <Text style={styles.lapTimer}>
            { TimeFormatter(this.state.lapTimer) }
          </Text>
          <Text style={styles.mainTimer}>
            { TimeFormatter(this.state.mainTimer) }
          </Text>
        </View>
      </View>
    );
  }

  handleLapReset() {
    let {
      isRunning, mainTimerStart, laps, lapTimer, lapCount
    } = this.state;

    // case 1: reset button clicked
    if (mainTimerStart && !isRunning) {
      this.setState({
        laps: [],
        dataSource: ds.cloneWithRows([]),
        lapCount: 0,
        mainTimerStart: null,
        lapTimerStart: null,
        mainTimer: 0,
        lapTimer: 0,
      });
    }

    // case 2: lap button clicked
    if (mainTimerStart && isRunning) {
      laps.unshift(lapTimer);

      this.setState({
        laps: laps,
        dataSource: ds.cloneWithRows(laps),
        lapCount: 1 + lapCount,
        lapTimer: 0,
      });
    }
  }

  handleStartStop() {
    let { 
      isRunning, firstTime, mainTimer, lapTimer
    } = this.state;

    // case 1: stop button clicked
    if (isRunning) {
      clearInterval(this.interval);
      this.setState({
        isRunning: false,
      });
      return ;
    }

    // case 2: start button clicked
    this.setState({
      mainTimerStart: new Date(),
      lapTimerStart: new Date(),
      isRunning: true,
    });

    this.interval = setInterval(() => {
      this.setState({
        mainTimer: new Date() - this.state.mainTimerStart + mainTimer, 
        lapTimer: new Date() - this.state.lapTimerStart + lapTimer, 
      });
    }, 30);
  }

  _renderButtons() {
    let { isRunning, mainTimerStart } = this.state;

    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight 
          underlayColor='#DDD' 
          style={styles.button} 
          onPress={this.handleLapReset.bind(this)}>
          <Text>
            { (mainTimerStart && !isRunning) ? 'Reset' : 'Lap' }
          </Text>
        </TouchableHighlight>
        <TouchableHighlight 
          underlayColor='#DDD' 
          style={styles.button} 
          onPress={this.handleStartStop.bind(this)}>
          <Text style={[styles.startBtn, isRunning && styles.stopBtn]}>
            {isRunning ? 'Stop' : 'Start'}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  _renderLap(rowData, sectionID, rowID) {
    let { lapCount } = this.state;

    return (
      <View style={styles.lapRow}>
        <Text style={styles.lapNumber}>Lap {lapCount - rowID}</Text>
        <Text style={styles.lapTime}>{TimeFormatter(rowData)}</Text>
      </View>
    );
  }

  _renderLaps() {
    let { dataSource } = this.state;

    return (
      <View style={styles.lapsWrapper}>
        <ListView
          enableEmptySections={true} 
          dataSource={dataSource} 
          renderRow={this._renderLap.bind(this)} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {this._renderTitle()}
          {this._renderTimers()}
        </View>
        <View style={styles.bottom}>
          {this._renderButtons()}
          {this._renderLaps()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // backgroundColor: '#0276c9',
    // padding: 10,
    // paddingBottom: 30,
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 2,
    backgroundColor: '#F0EFF5',    
  },
  header: {
    borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#F9F9F9',
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
  },
  timerWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  timerWrapperInner: {
    borderWidth: 0.5,
    alignSelf: 'center',
  },
  lapTimer: {
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  mainTimer: {
    fontSize: 60,
    fontWeight: '100',
    alignSelf: 'flex-end',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 30,
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtn: {
    color: '#00CC00',
  },
  stopBtn: {
    color: 'red',
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    paddingTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDD',
  },
  lapNumber: {
    fontSize: 16,
    color: '#777',
  },
  lapTime: {
    fontSize: 20,
    fontWeight: '300',
    color: '#000',
  },
  footer: {
    // color: '#fff',
    // textAlign: 'center',
    // fontSize: 20,
  },
});

export default Stopwatch;
