import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class Verify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  register = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user.sendEmailVerification();
        setTimeout(() => {
          console.log(userCredential.user.emailVerified);
          this.props.navigation.navigate('SignUp', {
            email: email,
            password: password,
          });
        }, 30000);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.appTitleText}>Doggy Daycare</Text>
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
            this.register(email, password);
            alert(
              'We have sent a verification email to you. Please verify and then return to the app.'
            );
          }}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.replace('Login')}>
          <Text style={styles.buttonTextNewUser}>Already Registered?</Text>
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
    marginBottom: RFValue(30),
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
    marginBottom: RFValue(10),
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
