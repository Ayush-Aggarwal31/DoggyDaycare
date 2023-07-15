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

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.route.params.email,
      name: '',
      age: 0,
      password: this.props.route.params.password,
      confirmPassword: '',
    };
  }

  componentDidMount(){
    var email=this.props.route.params.email
    var password=this.props.route.params.password
    console.log(email,password)    
  }

  register = (email, name, age, password, confirmPassword) => {
    if (age >= 15) {
      if (password === confirmPassword) {
        let uc = 0;
        firebase
          .database()
          .ref('/')
          .on('value', function (snapshot) {
            uc = snapshot.val().userCount + 1;
          });
        console.log(uc);
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            
            pin = 'P' + uc;
            firebase
              .database()
              .ref('/users/' + userCredential.user.uid)
              .set({
                name: name,
                email: email,
                age: age,
                password: password,
                pin: pin,
              });
            firebase.database().ref('/').update({ userCount: uc });
            alert(
              'User has been successfully registered to Doggy Daycare. Your pin is ' +
                pin
            );
            this.props.navigation.replace('Login');
          })
          .catch((er) => {
            alert(er.message);
          });
      } else {
        alert('The passwords are not matching');
      }
    } else {
      alert('You are too young to access this app');
    }
  };

  render() {
    const { email, name, age, password, confirmPassword } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.appTitleText}>Doggy Daycare</Text>
        <TextInput
          style={styles.textinput}
          placeholder={'Enter Email'}
          placeholderTextColor={'#FFFFFF'}
          value={this.state.email}
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ name: text })}
          placeholder={'Enter Full Name'}
          placeholderTextColor={'#FFFFFF'}
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ age: text })}
          placeholder={'Enter Age'}
          placeholderTextColor={'#FFFFFF'}
        />
        <TextInput
          style={styles.textinput}
          placeholder={'Enter Password'}
          placeholderTextColor={'#FFFFFF'}
          secureTextEntry
          value={this.state.password}
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
          placeholder={'Confirm Password'}
          placeholderTextColor={'#FFFFFF'}
          secureTextEntry
        />
        <TouchableOpacity
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => {
            this.register(email, name, age, password, confirmPassword);
          }}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
