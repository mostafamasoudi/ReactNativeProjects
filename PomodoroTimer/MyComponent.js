import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { styles } from './styles';

export const ControlButton = (props) => {
    var buttonTitle = "";
    if (props.IsPuase)
        buttonTitle = "START";
    else
        buttonTitle = "PAUSE";
    return (<View style={{ flexDirection: 'row', margin: 10 }}>
        <Button title={buttonTitle} onPress={props.onLeftButClick} style={{ flex: 1 }} />
        <Button title="RESET" onPress={props.onResetClick} style={{ flex: 1 }} />
    </View>);
};

export const TimeShower = (props) => (<Text style={styles.clock}>{props.Minute}:{props.Second}</Text>);

export const Title = (props) => {
    var maintitle = '';
    if (props.isWorkTime)
        maintitle = "Work Timer";
    else
        maintitle = "Rest Timer";
    return (<Text style={styles.bigtitle}>{maintitle}</Text>);
};

export const WorkTimeLine = (props) => (
    <View style={{ flexDirection: 'row',marginTop:80 }}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Work Times:</Text>
        <Text style={styles.text}>Mins:</Text>
        <TextInput onChangeText={props.onChangeMinsText} defaultValue='25' style={styles.textinput} />
        <Text style={styles.text}>Secs:</Text>
        <TextInput onChangeText={props.onChangeSecsText} defaultValue='0' style={styles.textinput} />
    </View>
);

export const BreakTimeLine = (props) => (
    <View style={{ flexDirection: 'row' ,marginTop:15}}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Break Times:</Text>
        <Text style={styles.text}>Mins:</Text>
        <TextInput onChangeText={props.onChangeMinsText} defaultValue='5' style={styles.textinput} />
        <Text style={styles.text}>Secs:</Text>
        <TextInput onChangeText={props.onChangeSecsText} defaultValue='0' style={styles.textinput} />
    </View>
);
