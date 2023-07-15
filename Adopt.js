import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  BackgroundImage,
  Header,
} from 'react-native';

import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

export default class Adopt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      dogPin: '',
    };
  }

  adoptDog = (email, password, dogPin) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response)=>{
        console.log(response)
        var dogref=firebase.database().ref("/dogs_available/"+dogPin)
        console.log(dogref)
        dogref.remove()
      })
      .catch((error)=>{alert(error.message)});
  };

  render() {
    const { email, password, dogPin } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.appTitleText}>Doggy Daycare</Text>

        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ email: text })}
          placeholder={'Enter Your Email'}
          placeholderTextColor={'#FFFFFF'}
          value={email}
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder={'Enter Your Password'}
          placeholderTextColor={'#FFFFFF'}
          secureTextEntry
          value={password}
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ dogPin: text })}
          placeholder={"Enter Dog's Pin"}
          placeholderTextColor={'#FFFFFF'}
          value={dogPin}
        />
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => {
            this.adoptDog(email, password, dogPin);
            alert("Congratulations! You have just adopted a dog who hopes that this will be their forever home.")
            this.props.navigation.replace('Home');
          }}>
          <Text style={styles.buttonText}>Adopt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.replace('Search')}>
          <Text style={styles.buttonTextNewUser}>Still looking for a dog?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2289dd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFValue(40),
    marginBottom: RFValue(80),
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(50),
    padding: RFValue(5),
    borderColor: '#FFFFFF',
    borderWidth: RFValue(5),
    borderRadius: RFValue(12.5),
    fontSize: RFValue(20),
    color: '#FFFFFF',
    backgroundColor: '#2289dd',
    marginBottom: RFValue(5),
    marginVertical: RFValue(10),
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
    marginBottom: RFValue(30),
  },
  buttonText: {
    fontSize: RFValue(24),
    color: '#15193c',
  },
  buttonTextNewUser: {
    fontSize: RFValue(20),
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    marginBottom: RFValue(200),
  },
});
