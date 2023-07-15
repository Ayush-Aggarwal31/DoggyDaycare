import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Welcome from "./screens/Welcome"
import Login from "./screens/Login"
import SignUp from "./screens/SignUp"
import Home from "./screens/Home"
import Search from "./screens/Search"
import Adopt from "./screens/Adopt"
import DogCard from "./screens/DogCard"
import Verify from "./screens/Verify"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";
import {firebaseConfig} from "./config"

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
} else{
  firebase.app()
}

const Stack = createStackNavigator();

const StackNav = () => {
  return(
  <Stack.Navigator initialRouteName="Welcome"  screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="Adopt" component={Adopt} />
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Search" component={Search} />
    <Stack.Screen name="DogCard" component={DogCard} />
    <Stack.Screen name="Verify" component={Verify} />
  </Stack.Navigator>)
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>)

}

const styles = StyleSheet.create({});