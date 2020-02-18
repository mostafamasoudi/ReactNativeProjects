import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { Title, TimeShower, ControlButton, WorkTimeLine, BreakTimeLine } from './MyComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.myClock = new Clock(25, 0);
    this.state = {
      IsWorkTime: true,
      Pause: true,
      myclock: this.myClock,
    }
  }

  render() {
    return (
      <View style={{ alignItems: 'center', marginTop: 150 }}>
        <Title isWorkTime={this.state.IsWorkTime} />
        
        <TimeShower Minute={this.state.myclock.Minute} Second={this.state.myclock.Second} />

        <ControlButton
          IsPuase={this.state.Pause}
          onLeftButClick={() => { this.Pause() }}
          onResetClick={() => { this.Reset() }}
        />

        <WorkTimeLine
          onChangeSecsText={(val) => this.setSecondValueWork(val)}
          onChangeMinsText={(val) => this.setMinuteValueWork(val)}
        />
        <BreakTimeLine
          onChangeSecsText={(val) => this.setSecondValueRest(val)}
          onChangeMinsText={(val) => this.setMinuteValueRest(val)}
        />
      </View>
    )
  }
  componentDidMount() {
    if (!this.state.Pause)
      this.Start();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  Start() {
    this.timer = setInterval(() => {
      this.setState(prevState => {
        this.DownCount();
        return ({
          myclock: this.state.myclock,
        })
      })
    }, 1000);
  }

  Pause() {
    if (this.state.Pause)
      this.Start();
    else
      clearInterval(this.timer);
    this.setState({ Pause: !this.state.Pause });
  }

  Reset() {
    if (this.state.IsWorkTime) {
      this.state.myclock.Second = this.state.myclock.defaultSecWork;
      this.state.myclock.Minute = this.state.myclock.defaultMinWork;
    }
    else {
      this.state.myclock.Second = this.state.myclock.defaultSecRest;
      this.state.myclock.Minute = this.state.myclock.defaultMinRest;
    }
    this.setState({
      myclock: this.state.myclock,
    })
  }

  setSecondValueRest(value) {
    if (value > 59)
      return;
    if (!this.state.IsWorkTime)
      this.state.myclock.Second = value;
    this.state.myclock.defaultSecRest = value;
    this.setState({
      myclock: this.state.myclock,
    })
  }
  setMinuteValueRest(value) {
    if (value > 59)
      return;
    if (!this.state.IsWorkTime)
      this.state.myclock.Minute = value;
    this.state.myclock.defaultMinRest = value;
    this.setState({
      myclock: this.state.myclock,
    })
  }

  setSecondValueWork(value) {
    if (value > 59)
      return;
    if (this.state.IsWorkTime)
      this.state.myclock.Second = value;
    this.state.myclock.defaultSecWork = value;
    this.setState({
      myclock: this.state.myclock,
    })
  }

  setMinuteValueWork(value) {
    if (value > 59)
      return;
    if (this.state.IsWorkTime)
      this.state.myclock.Minute = value;
    this.state.myclock.defaultMinWork = value;
    this.setState({
      myclock: this.state.myclock,
    })
  }

  DownCount() {
    if (this.state.myclock.Second == 0) {
      this.state.myclock.Second = 59;
      if (this.state.myclock.Minute > 0)
        this.state.myclock.Minute--;
      else {
        this.ChangeMode();
      }
    }
    else
      this.state.myclock.Second--;
  }

  ChangeMode() {
    if (!this.state.IsWorkTime) {
      this.state.myclock.Second = this.state.myclock.defaultSecWork;
      this.state.myclock.Minute = this.state.myclock.defaultMinWork;
    }
    else {
      this.state.myclock.Second = this.state.myclock.defaultSecRest;
      this.state.myclock.Minute = this.state.myclock.defaultMinRest;
    }

    this.setState(prevstate => ({
      IsWorkTime: !prevstate.IsWorkTime,
      myclock: this.state.myclock,
    }));

  }
}

class Clock {
  constructor(Min, Sec) {
    this.Minute = Min;
    this.Second = Sec;
    this.defaultMinWork = 25;
    this.defaultSecWork = 0;
    this.defaultMinRest = 5;
    this.defaultSecRest = 0;
  }
}