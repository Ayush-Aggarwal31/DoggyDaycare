import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      doggyDetails: [],
    };
  }
  componentDidMount() {
    this.getdoggyDetails();
  }
  getdoggyDetails = () => {
    var doggyData = [];
    firebase
      .database()
      .ref('/dogs_available/')
      .on('value', (snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val()) {
          Object.keys(snapshot.val()).forEach(function (key) {
            doggyData.push({
              key: key,
              value: snapshot.val()[key],
            });
          });
        }
        this.setState({
          doggyDetails: doggyData,
        });
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={()=>{
              this.props.navigation.replace('Home')
            }} >
            <Ionicons
              name={'arrow-back-outline'}
              size={RFValue(30)}
              color={'white'}
              style={{
                marginTop: 32.5,
                marginLeft: 10,
                justifyContent: 'center',
              }}
            />
            </TouchableOpacity>
            <Text
              style={[
                styles.appTitleText,
                {
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginLeft: 35,
                },
              ]}>
              Doggy Daycare
            </Text>
          </View>
          <FlatList
            data={this.state.doggyDetails}
            keyExtractor={(item, index) => {
              index.toString();
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  margin: 20,
                  borderWidth: 3,
                  borderRadius: 15,
                  padding: 10,
                }}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: item.value.dogimg }}
                />
                <View>
                  <Text style={styles.buttonText}>
                    Name: {item.value.dogname}
                  </Text>
                  <Text style={styles.buttonText}>
                    Breed: {item.value.breed}
                  </Text>
                  <Text style={styles.buttonText}>
                    Dog Pin: {item.value.dogID}
                  </Text>
                </View>
              </View>
            )}
          />
        </ScrollView>
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
    fontSize: RFValue(30),
    backgroundColor: '#2289dd',
    marginTop: RFValue(20),
    padding: RFValue(5),
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
    fontSize: RFValue(18),
    color: 'black',
    paddingLeft: 5,
    marginVertical: 8,
  },
  buttonTextNewUser: {
    fontSize: RFValue(20),
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    marginBottom: RFValue(200),
  },
});
