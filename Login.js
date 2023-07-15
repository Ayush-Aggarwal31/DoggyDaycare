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

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      pin: '',
      userSignedIn: false,
    };
  }

  login = async (email, password, pin) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid);
        var pinCheck;
        firebase.database().ref("/users/"+userCredential.user.uid)
        .on("value",function(snapshot){
          pinCheck=snapshot.val().pin
        });
        if(pin===pinCheck){
          alert("Successfully logged in to Doggy Daycare.")
          this.props.navigation.replace("Home")
        } else{
          alert("Please try again.(Error code 101 : Pin is incorrect)")
        }
      })
      .catch((er) => {
        alert(er.message);
      });
  };

  render() {
    const { email, password, pin } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.appTitleText}>Doggy Daycare</Text>

        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ pin: text })}
          placeholder={'Enter Pin'}
          placeholderTextColor={'#FFFFFF'}
        
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ email: text })}
          placeholder={'Enter Email'}
          placeholderTextColor={'#FFFFFF'}
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder={'Enter Password'}
          placeholderTextColor={'#FFFFFF'}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => {
            this.login(email, password, pin);
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.replace('Verify')}>
          <Text style={styles.buttonTextNewUser}>New User?</Text>
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
    marginBottom: RFValue(100),
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
