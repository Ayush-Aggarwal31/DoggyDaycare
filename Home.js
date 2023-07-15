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


export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }
  
  render() {

    return (
      <View style={{ flex: 1, backgroundColor:"#2289dd" }}>
        <Text style={styles.appTitleText}>Doggy Daycare</Text>
          <TouchableOpacity
            style={[styles.button, { marginTop: 100 }]}
            onPress={()=>{
              this.props.navigation.replace("Search")
              }}            
          >
            <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.button, { marginTop: 25 }]}
            onPress={()=>{
              this.props.navigation.replace("Adopt")
              }}     
          >
            <Text style={styles.buttonText}>Adopt</Text>
            </TouchableOpacity>
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
    marginLeft: 50,
    flex:0.35,
    backgroundColor:"#2289dd",
    marginBottom:10,
    borderColor:"white",
    borderWidth:5
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
