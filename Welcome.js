import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';


export default class Welcome extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loginClicked:false,
      signupClicked:false
    }
  }
  
  render() {

    return (
      <View style={{ flex: 1, backgroundColor:"#2289dd" }}>
        <Text style={styles.appTitleText}>Doggy Daycare</Text>
        <ImageBackground
          source={require('../assets/ddc.png')}
          style={styles.bgStyle}>
          <Text style={styles.welcomeTextStyle}>
            Hello! Welcome to the Doggy Daycare App. In this app, you can adopt
            a dog that is in need of a loving household. Our team hopes that you
            will get the dog you've always wanted.
          </Text>
          <TouchableOpacity
            style={[styles.button, { marginTop: 100 }]}
            onPress={()=>{
              this.props.navigation.replace("Login")
              this.setState({loginClicked:"true"})
              }}            
          >
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.button, { marginTop: 25 }]}
            onPress={()=>{
              this.props.navigation.replace("Verify")
              this.setState({signupClicked:"true"})
              }}     
          >
            <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgStyle: {
    flex: 1,
    resizeMode: 'contain',
  },
  welcomeTextStyle: {
    borderWidth: 2,
    marginHorizontal: 50,
    marginTop: 80,
    padding: 10,
    textAlign: 'center',
    fontSize:20,
    backgroundColor:"#2289dd",
    color:"white"
  },
  button: {
    width: 250,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginLeft: 75,
    flex:0.35,
    backgroundColor:"#2289dd",
    marginBottom:10
  },
  buttonText: {
    fontSize:35,
    color: "white",
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    backgroundColor:"#2289dd",
    marginTop:RFValue(20),
    padding:RFValue(10)
  },
});
