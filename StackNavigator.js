import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome"
import Login from "../screens/Login"
import SignUp from "../screens/SignUp"
import Home from "../screens/Home"
import Search from "../screens/Search"
import Adopt from "../screens/Adopt"
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Adopt" component={Adopt} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
